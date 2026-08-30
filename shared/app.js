import * as THREE from "three";

/* ============================================================
   Shared site engine. Each site defines `window.SITE` before
   loading this module:
   {
     name, spotName, email, lat, lon,
     fx: "streaks" | "particles" | "waves" | "aurora",
     fxColor: [r, g, b],
     egg: { sky:[hex,hex], water:hex, kite:hex, kiteStripe:hex, sun:hex }
   }
   ============================================================ */
const SITE = window.SITE;

/* ---------- Nav ---------- */
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
const burger = document.getElementById("burger");
const links = document.querySelector(".nav-links");
burger?.addEventListener("click", () => links.classList.toggle("open"));
links?.addEventListener("click", () => links.classList.remove("open"));

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Live wind (Open-Meteo, no key needed) ---------- */
const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
(async function loadWind() {
  const el = document.getElementById("wind-text");
  if (!el) return;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SITE.lat}&longitude=${SITE.lon}&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kn`;
    const r = await fetch(url);
    const d = await r.json();
    const c = d.current;
    const dir = COMPASS[Math.round(c.wind_direction_10m / 22.5) % 16];
    el.textContent = `En ce moment ${SITE.spotName} : ${Math.round(c.wind_speed_10m)} nds ${dir} · rafales ${Math.round(c.wind_gusts_10m)} nds`;
  } catch {
    el.textContent = `Vent en direct indisponible — mais ici, il souffle souvent.`;
  }
})();

/* ---------- Contact form → mailto ---------- */
document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name")?.value || "";
  const dates = document.getElementById("cf-dates")?.value || "";
  const level = document.getElementById("cf-level")?.value || "";
  const msg = document.getElementById("cf-msg")?.value || "";
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite réserver un cours / stage.\n\nNom : ${name}\nDates envisagées : ${dates}\nNiveau : ${level}\n\n${msg}\n\nMerci !`
  );
  location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Réservation — " + name)}&body=${body}`;
});

/* ============================================================
   Hero canvas FX — four modes sharing one loop
   ============================================================ */
(function heroFx() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const [R, G, B] = SITE.fxColor;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let w, h, items;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    init();
  }

  function init() {
    if (SITE.fx === "streaks") {
      items = Array.from({ length: Math.min(90, (w * h) / 14000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        len: 30 + Math.random() * 90, speed: 1.2 + Math.random() * 2.6,
        drift: (Math.random() - 0.5) * 0.4, alpha: 0.05 + Math.random() * 0.12,
      }));
    } else if (SITE.fx === "particles") {
      items = Array.from({ length: Math.min(120, (w * h) / 10000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 1 + Math.random() * 2.6, vx: 0.15 + Math.random() * 0.5,
        vy: (Math.random() - 0.5) * 0.25, alpha: 0.08 + Math.random() * 0.25,
        ph: Math.random() * Math.PI * 2,
      }));
    } else if (SITE.fx === "waves") {
      items = Array.from({ length: 5 }, (_, i) => ({
        yBase: h * (0.55 + i * 0.09), amp: 14 + i * 9,
        freq: 0.004 + i * 0.0012, speed: 0.4 + i * 0.18, alpha: 0.05 + i * 0.035,
      }));
    } else {
      items = Array.from({ length: 4 }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h * 0.8,
        r: 180 + Math.random() * 240, sp: 0.12 + i * 0.05, ph: Math.random() * Math.PI * 2,
      }));
    }
  }

  let t = 0;
  function frame() {
    t += 0.008;
    ctx.clearRect(0, 0, w, h);
    if (SITE.fx === "streaks") {
      for (const s of items) {
        const wave = Math.sin(t * 2 + s.y * 0.01) * 8;
        ctx.strokeStyle = `rgba(${R},${G},${B},${s.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y + wave);
        ctx.quadraticCurveTo(s.x + s.len * 0.5, s.y + wave + s.drift * 20, s.x + s.len, s.y + wave);
        ctx.stroke();
        s.x += s.speed; s.y += s.drift;
        if (s.x > w + 100) { s.x = -s.len - 50; s.y = Math.random() * h; }
      }
    } else if (SITE.fx === "particles") {
      for (const p of items) {
        const tw = 0.6 + 0.4 * Math.sin(t * 3 + p.ph);
        ctx.fillStyle = `rgba(${R},${G},${B},${p.alpha * tw})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy + Math.sin(t + p.ph) * 0.08;
        if (p.x > w + 10) p.x = -10;
        if (p.y > h + 10) p.y = -10;
        if (p.y < -10) p.y = h + 10;
      }
    } else if (SITE.fx === "waves") {
      for (const l of items) {
        ctx.strokeStyle = `rgba(${R},${G},${B},${l.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = l.yBase + Math.sin(x * l.freq + t * l.speed * 6) * l.amp + Math.sin(x * l.freq * 2.7 + t * 2) * l.amp * 0.3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else {
      for (const a of items) {
        const x = a.x + Math.sin(t * a.sp * 4 + a.ph) * 120;
        const y = a.y + Math.cos(t * a.sp * 3 + a.ph) * 60;
        const g = ctx.createRadialGradient(x, y, 0, x, y, a.r);
        g.addColorStop(0, `rgba(${R},${G},${B},0.14)`);
        g.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    }
    requestAnimationFrame(frame);
  }
  addEventListener("resize", resize);
  resize();
  frame();
})();

/* ============================================================
   EASTER EGG — type "VENT" (or click the logo 5×)
   Full-screen Three.js kite session, themed per school.
   ============================================================ */
let eggActive = false;
let typed = "";
addEventListener("keydown", (e) => {
  if (eggActive) return;
  typed = (typed + e.key.toUpperCase()).slice(-4);
  if (typed === "VENT") startEgg();
});
let logoClicks = 0;
document.getElementById("logo")?.addEventListener("click", (e) => {
  if (++logoClicks >= 5 && !eggActive) { e.preventDefault(); startEgg(); }
  setTimeout(() => (logoClicks = 0), 3000);
});

function startEgg() {
  const overlay = document.getElementById("egg-overlay");
  const P = SITE.egg;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch {
    console.warn("WebGL indisponible — pas d'easter egg ici.");
    return;
  }
  eggActive = true;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  overlay.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(P.sky[1], 60, 260);

  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500);
  camera.position.set(0, 6, 26);

  /* Sky dome (gradient shader) */
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(300, 24, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        top: { value: new THREE.Color(P.sky[0]) },
        bottom: { value: new THREE.Color(P.sky[1]) },
      },
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 top; uniform vec3 bottom; varying vec3 vP;
        void main(){ float h = normalize(vP).y * 0.5 + 0.5; gl_FragColor = vec4(mix(bottom, top, pow(h, 0.8)), 1.0); }`,
    })
  );
  scene.add(sky);

  /* Lights */
  scene.add(new THREE.HemisphereLight(0xcfe8ff, 0x0a2233, 1.0));
  const sun = new THREE.DirectionalLight(P.sun, 2.2);
  sun.position.set(-40, 50, -30);
  scene.add(sun);

  /* Water */
  const WSEG = 110;
  const waterGeo = new THREE.PlaneGeometry(420, 420, WSEG, WSEG);
  waterGeo.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(
    waterGeo,
    new THREE.MeshStandardMaterial({ color: P.water, roughness: 0.55, metalness: 0.25, flatShading: true })
  );
  scene.add(water);
  const wPos = waterGeo.attributes.position;
  const wBase = wPos.array.slice();

  /* Kite canopy: bowed delta built as a parametric grid */
  const SPAN = 7, CHORD = 2.2, BOW = 1.6, NU = 26, NV = 8;
  const kiteGeo = new THREE.BufferGeometry();
  const verts = [], cols = [], idx = [];
  const cKite = new THREE.Color(P.kite), cStripe = new THREE.Color(P.kiteStripe);
  for (let i = 0; i <= NU; i++) {
    const u = (i / NU) * 2 - 1;
    for (let j = 0; j <= NV; j++) {
      const v = j / NV;
      const x = u * SPAN * 0.5;
      const y = BOW * (1 - u * u) + 0.25 * Math.sin(v * Math.PI) * (1 - Math.abs(u));
      const z = -v * CHORD * (1 - 0.35 * Math.abs(u)) - 0.8 * u * u;
      verts.push(x, y, z);
      const stripe = Math.floor(i / 4) % 2 === 0 ? cKite : cStripe;
      cols.push(stripe.r, stripe.g, stripe.b);
    }
  }
  for (let i = 0; i < NU; i++)
    for (let j = 0; j < NV; j++) {
      const a = i * (NV + 1) + j, b = a + NV + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  kiteGeo.setIndex(idx);
  kiteGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  kiteGeo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
  kiteGeo.computeVertexNormals();
  const kite = new THREE.Mesh(
    kiteGeo,
    new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.6 })
  );
  scene.add(kite);

  /* Rider: board + body on the water */
  const rider = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.08, 0.45),
    new THREE.MeshStandardMaterial({ color: 0x101820, roughness: 0.4 })
  );
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.16, 0.7, 4, 10),
    new THREE.MeshStandardMaterial({ color: 0x18242f, roughness: 0.7 })
  );
  body.position.y = 0.75;
  rider.add(board, body);
  rider.position.set(0, 0.4, 6);
  scene.add(rider);

  /* Kite lines */
  const lineMat = new THREE.LineBasicMaterial({ color: 0xd8e8f4, transparent: true, opacity: 0.6 });
  const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
  const kiteLines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(kiteLines);

  /* Spray particles behind the board */
  const NSPRAY = 240;
  const sprayGeo = new THREE.BufferGeometry();
  const sprayPos = new Float32Array(NSPRAY * 3);
  const sprayLife = new Float32Array(NSPRAY);
  sprayGeo.setAttribute("position", new THREE.BufferAttribute(sprayPos, 3));
  const spray = new THREE.Points(
    sprayGeo,
    new THREE.PointsMaterial({ color: 0xeaf6ff, size: 0.14, transparent: true, opacity: 0.8 })
  );
  scene.add(spray);
  let sprayI = 0;

  /* Mouse steering */
  const mouse = { x: 0, y: 0.4 };
  const onMove = (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = 1 - e.clientY / innerHeight;
  };
  addEventListener("mousemove", onMove);

  const onResize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  };
  addEventListener("resize", onResize);

  let raf, t = 0;
  const kitePos = new THREE.Vector3();
  const prevKite = new THREE.Vector3();

  function animate() {
    raf = requestAnimationFrame(animate);
    t += 0.016;

    /* Water waves */
    for (let i = 0; i < wPos.count; i++) {
      const x = wBase[i * 3], z = wBase[i * 3 + 2];
      wPos.array[i * 3 + 1] =
        Math.sin(x * 0.12 + t * 1.4) * 0.55 +
        Math.cos(z * 0.16 + t * 1.1) * 0.45 +
        Math.sin((x + z) * 0.07 + t * 0.7) * 0.5;
    }
    wPos.needsUpdate = true;
    waterGeo.computeVertexNormals();

    /* Kite: figure-eight in the wind window + mouse offset */
    const az = Math.sin(t * 0.6) * 0.9 + mouse.x * 1.1;
    const el = 0.55 + 0.28 * Math.sin(t * 1.2) + mouse.y * 0.45;
    const R = 16;
    prevKite.copy(kitePos);
    kitePos.set(
      rider.position.x + R * Math.sin(az) * Math.cos(el),
      Math.max(2.5, R * Math.sin(el)),
      rider.position.z - R * Math.cos(az) * Math.cos(el)
    );
    kite.position.lerp(kitePos, 0.08);

    const velocity = kitePos.clone().sub(prevKite);
    kite.rotation.z = THREE.MathUtils.lerp(kite.rotation.z, THREE.MathUtils.clamp(-velocity.x * 0.9, -0.9, 0.9), 0.06);
    kite.lookAt(rider.position.x, rider.position.y + 1, rider.position.z);
    kite.rotateX(-0.5);

    /* Rider carves gently, follows kite azimuth */
    rider.position.x = THREE.MathUtils.lerp(rider.position.x, kite.position.x * 0.25, 0.02);
    rider.position.y = 0.45 + Math.sin(t * 2.2) * 0.1;
    rider.rotation.z = THREE.MathUtils.lerp(rider.rotation.z, (kite.position.x - rider.position.x) * 0.02, 0.05);
    rider.rotation.y = -velocity.x * 0.15;

    /* Lines: kite tips → rider harness */
    const tips = [
      new THREE.Vector3(-SPAN * 0.5, 0, -0.8).applyMatrix4(kite.matrixWorld),
      new THREE.Vector3(SPAN * 0.5, 0, -0.8).applyMatrix4(kite.matrixWorld),
    ];
    const harness = rider.position.clone().add(new THREE.Vector3(0, 0.9, 0));
    lineGeo.setFromPoints([tips[0], harness, tips[1], harness]);

    /* Spray */
    for (let k = 0; k < 3; k++) {
      const i = sprayI++ % NSPRAY;
      sprayPos[i * 3] = rider.position.x - 0.8 + Math.random() * 0.4;
      sprayPos[i * 3 + 1] = 0.3 + Math.random() * 0.3;
      sprayPos[i * 3 + 2] = rider.position.z + 0.3 + Math.random() * 0.5;
      sprayLife[i] = 1;
    }
    for (let i = 0; i < NSPRAY; i++) {
      if (sprayLife[i] > 0) {
        sprayLife[i] -= 0.02;
        sprayPos[i * 3 + 1] += 0.05;
        sprayPos[i * 3 + 2] += 0.12;
      }
    }
    sprayGeo.attributes.position.needsUpdate = true;

    /* Camera drifts slowly */
    camera.position.x = Math.sin(t * 0.1) * 4;
    camera.lookAt(kite.position.clone().lerp(rider.position, 0.55));

    renderer.render(scene, camera);
  }
  animate();

  function stop(e) {
    if (e && e.key !== "Escape") return;
    cancelAnimationFrame(raf);
    removeEventListener("keydown", stop);
    removeEventListener("mousemove", onMove);
    removeEventListener("resize", onResize);
    renderer.dispose();
    renderer.domElement.remove();
    overlay.hidden = true;
    document.body.style.overflow = "";
    eggActive = false;
    typed = "";
  }
  addEventListener("keydown", stop);
}
