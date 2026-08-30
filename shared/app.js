import * as THREE from "three";

/* ============================================================
   Shared site engine v2. Each site defines `window.SITE`:
   {
     name, spotName, email, phone ("+336..."), whatsapp (bool),
     lat, lon, zoom,
     kite: { main: hex, stripe: hex },   // hero 3D kite colors
     egg:  { sky:[hex,hex], water:hex, kite:hex, kiteStripe:hex, sun:hex }
   }
   ============================================================ */
const SITE = window.SITE;
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Nav ---------- */
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
const burger = document.getElementById("burger");
const links = document.querySelector(".nav-links");
burger?.addEventListener("click", () => links.classList.toggle("open"));
links?.addEventListener("click", () => links.classList.remove("open"));

/* ---------- Scroll reveal (text + image wipes) ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal, .reveal-img").forEach((el) => io.observe(el));

/* ---------- Hero parallax ---------- */
const heroBg = document.querySelector(".hero-bg");
if (heroBg && !REDUCED) {
  addEventListener(
    "scroll",
    () => {
      const y = Math.min(scrollY, innerHeight);
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    },
    { passive: true }
  );
}

/* ---------- Count-up stats ---------- */
const counters = document.querySelectorAll("[data-count]");
const cio = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}, { threshold: 0.6 });
counters.forEach((el) => cio.observe(el));

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

/* ---------- Leaflet map (loaded on demand) ---------- */
(function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(css);
  const js = document.createElement("script");
  js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  js.onload = () => {
    const map = L.map("map", { scrollWheelZoom: false }).setView([SITE.lat, SITE.lon], SITE.zoom || 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.circleMarker([SITE.lat, SITE.lon], {
      radius: 10,
      color: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#37e0ff",
      fillOpacity: 0.7,
      weight: 3,
    })
      .addTo(map)
      .bindPopup(`<b>${SITE.name}</b><br>${mapEl.dataset.label || "Le spot"}`);
  };
  document.head.appendChild(js);
})();

/* ---------- Contact form → mailto ---------- */
document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name")?.value || "";
  const dates = document.getElementById("cf-dates")?.value || "";
  const level = document.getElementById("cf-level")?.value || "";
  const msg = document.getElementById("cf-msg")?.value || "";
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite réserver un cours / stage.\n\nNom : ${name}\nDates envisagées : ${dates}\nFormule : ${level}\n\n${msg}\n\nMerci !`
  );
  location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Réservation — " + name)}&body=${body}`;
});

/* ============================================================
   Shared kite-builder (used by hero scene + easter egg)
   ============================================================ */
function buildKite(mainHex, stripeHex, SPAN = 7) {
  const CHORD = 2.2, BOW = 1.6, NU = 26, NV = 8;
  const geo = new THREE.BufferGeometry();
  const verts = [], cols = [], idx = [];
  const cKite = new THREE.Color(mainHex), cStripe = new THREE.Color(stripeHex);
  for (let i = 0; i <= NU; i++) {
    const u = (i / NU) * 2 - 1;
    for (let j = 0; j <= NV; j++) {
      const v = j / NV;
      verts.push(
        u * SPAN * 0.5,
        BOW * (1 - u * u) + 0.25 * Math.sin(v * Math.PI) * (1 - Math.abs(u)),
        -v * CHORD * (1 - 0.35 * Math.abs(u)) - 0.8 * u * u
      );
      const c = Math.floor(i / 4) % 2 === 0 ? cKite : cStripe;
      cols.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < NU; i++)
    for (let j = 0; j < NV; j++) {
      const a = i * (NV + 1) + j, b = a + NV + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  geo.setIndex(idx);
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
  geo.computeVertexNormals();
  return new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.55 })
  );
}

/* ============================================================
   VISIBLE hero 3D kite — flies over the hero photo,
   steered by mouse, lines running off toward the rider below.
   ============================================================ */
(function heroKite() {
  const canvas = document.getElementById("hero-kite");
  if (!canvas || REDUCED || innerWidth < 821) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 0, 30);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 1.4));
  const sun = new THREE.DirectionalLight(0xfff2d8, 2.0);
  sun.position.set(-30, 40, 20);
  scene.add(sun);

  const kite = buildKite(SITE.kite?.main ?? 0x37e0ff, SITE.kite?.stripe ?? 0xffffff, 6);
  scene.add(kite);

  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
  ]);
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  const hero = canvas.closest(".hero");
  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  resize();

  const mouse = { x: 0.35, y: 0.25 };
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = 1 - (e.clientY - r.top) / r.height;
  });

  /* Anchor (invisible rider) sits below the bottom-right of the frame */
  const anchor = new THREE.Vector3(14, -26, -6);
  const pos = new THREE.Vector3(10, 6, 0);
  const target = new THREE.Vector3();
  const prev = new THREE.Vector3();
  let t = Math.random() * 10;
  let raf;

  function animate() {
    raf = requestAnimationFrame(animate);
    t += 0.011;
    /* Figure-eight drift + mouse influence, kept in the right half */
    target.set(
      9.5 + Math.sin(t * 0.9) * 4.5 + mouse.x * 2.5,
      4.5 + Math.sin(t * 1.8) * 2.4 + mouse.y * 3.2,
      Math.cos(t * 0.9) * 2.5
    );
    prev.copy(pos);
    pos.lerp(target, 0.045);
    kite.position.copy(pos);

    const vel = pos.clone().sub(prev);
    kite.lookAt(anchor);
    kite.rotateX(-0.55);
    kite.rotateZ(THREE.MathUtils.clamp(-vel.x * 2.2, -0.7, 0.7));

    const tips = [
      new THREE.Vector3(-3, 0, -0.8).applyMatrix4(kite.matrixWorld),
      new THREE.Vector3(3, 0, -0.8).applyMatrix4(kite.matrixWorld),
    ];
    lineGeo.setFromPoints([tips[0], anchor, tips[1], anchor]);

    renderer.render(scene, camera);
  }
  /* Only animate while hero is on screen */
  new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !raf) animate();
      else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
    });
  }).observe(hero);
})();

/* ============================================================
   EASTER EGG — type "VENT" (or click the logo 5×)
   Full-screen interactive kite session over animated water.
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

  scene.add(new THREE.HemisphereLight(0xcfe8ff, 0x0a2233, 1.0));
  const sun = new THREE.DirectionalLight(P.sun, 2.2);
  sun.position.set(-40, 50, -30);
  scene.add(sun);

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

  const SPAN = 7;
  const kite = buildKite(P.kite, P.kiteStripe, SPAN);
  scene.add(kite);

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

  const lineMat = new THREE.LineBasicMaterial({ color: 0xd8e8f4, transparent: true, opacity: 0.6 });
  const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  const NSPRAY = 240;
  const sprayGeo = new THREE.BufferGeometry();
  const sprayPos = new Float32Array(NSPRAY * 3);
  const sprayLife = new Float32Array(NSPRAY);
  sprayGeo.setAttribute("position", new THREE.BufferAttribute(sprayPos, 3));
  scene.add(new THREE.Points(sprayGeo, new THREE.PointsMaterial({ color: 0xeaf6ff, size: 0.14, transparent: true, opacity: 0.8 })));
  let sprayI = 0;

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

    for (let i = 0; i < wPos.count; i++) {
      const x = wBase[i * 3], z = wBase[i * 3 + 2];
      wPos.array[i * 3 + 1] =
        Math.sin(x * 0.12 + t * 1.4) * 0.55 +
        Math.cos(z * 0.16 + t * 1.1) * 0.45 +
        Math.sin((x + z) * 0.07 + t * 0.7) * 0.5;
    }
    wPos.needsUpdate = true;
    waterGeo.computeVertexNormals();

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
    kite.lookAt(rider.position.x, rider.position.y + 1, rider.position.z);
    kite.rotateX(-0.5);
    kite.rotateZ(THREE.MathUtils.clamp(-velocity.x * 0.9, -0.9, 0.9));

    rider.position.x = THREE.MathUtils.lerp(rider.position.x, kite.position.x * 0.25, 0.02);
    rider.position.y = 0.45 + Math.sin(t * 2.2) * 0.1;
    rider.rotation.z = THREE.MathUtils.lerp(rider.rotation.z, (kite.position.x - rider.position.x) * 0.02, 0.05);
    rider.rotation.y = -velocity.x * 0.15;

    const tips = [
      new THREE.Vector3(-SPAN * 0.5, 0, -0.8).applyMatrix4(kite.matrixWorld),
      new THREE.Vector3(SPAN * 0.5, 0, -0.8).applyMatrix4(kite.matrixWorld),
    ];
    const harness = rider.position.clone().add(new THREE.Vector3(0, 0.9, 0));
    lineGeo.setFromPoints([tips[0], harness, tips[1], harness]);

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
