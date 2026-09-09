import * as THREE from 'three';
const root=import.meta.env.BASE_URL;
export async function initScene(host){
 let renderer,texture,material,geometry,mesh,frame=0,disposed=false,visible=true,paused=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 try{
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  host.append(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  texture=await new THREE.TextureLoader().loadAsync(`${root}images/${host.dataset.scene}.webp`);
  if(disposed){texture.dispose();return;}
  texture.colorSpace=THREE.SRGBColorSpace;
  const pointer=new THREE.Vector2(.5,.5),target=new THREE.Vector2(.5,.5);
  const uniforms={uTexture:{value:texture},uTime:{value:0},uPointer:{value:pointer},uAspect:{value:1},uImageAspect:{value:texture.image.width/texture.image.height},uActive:{value:reduced?0:1},uHover:{value:0},uFocus:{value:.5}};
  material=new THREE.ShaderMaterial({uniforms,depthWrite:false,depthTest:false,vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.);}`,fragmentShader:`
   uniform sampler2D uTexture;
   uniform float uTime,uAspect,uImageAspect,uActive,uHover,uFocus;
   uniform vec2 uPointer;
   varying vec2 vUv;
   void main(){
    vec2 uv=vUv;
    vec2 cover=vec2(min(uAspect/uImageAspect,1.0),min(uImageAspect/uAspect,1.0));
    vec2 q=(uv-.5)*cover+.5;
    q.x+=(uFocus-.5)*(1.-cover.x);
    vec2 delta=(uv-uPointer)*vec2(uAspect,1.);
    float dist=length(delta);
    float radial=sin(dist*31.-uTime*2.2)*exp(-dist*4.5)*.0025*uHover;
    float waterMask=smoothstep(.86,.2,uv.y);
    float slow=sin(q.y*34.+uTime*.55)*sin(q.x*25.-uTime*.35);
    vec2 shift=vec2(slow*.0015,sin(q.x*40.+uTime*.4)*.0008)*waterMask;
    q+=(shift+normalize(delta+vec2(.0001))*radial+(uPointer-.5)*.003)*uActive;
    q=clamp(q,vec2(.001),vec2(.999));
    gl_FragColor=texture2D(uTexture,q);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
   }`});
  geometry=new THREE.PlaneGeometry(2,2);mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
  const parent=host.parentElement;
  let width=0,height=0;
  function resize(){const r=host.getBoundingClientRect();width=r.width;height=r.height;if(!width||!height)return;renderer.setSize(width,height,false);uniforms.uAspect.value=width/height;const focus={kitepulsion:.80,skyfly:.73,coriolis:.77,addicted:.72,akila:.72,ksl:.73,osmose:.61};uniforms.uFocus.value=window.innerWidth<600?(focus[host.dataset.scene]||.5):.5;renderer.render(scene,camera);}
  const ro=new ResizeObserver(resize);ro.observe(host);
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();},{rootMargin:'100px'});io.observe(host);
  function move(e){const r=host.getBoundingClientRect();target.set((e.clientX-r.left)/r.width,1-(e.clientY-r.top)/r.height);uniforms.uHover.value=1;}
  function leave(){target.set(.5,.5);uniforms.uHover.value=0;}
  function tick(t){frame=0;if(disposed||!visible||paused||document.hidden)return;pointer.lerp(target,.035);uniforms.uTime.value=t*.001;renderer.render(scene,camera);frame=requestAnimationFrame(tick);}
  function start(){if(!frame&&!paused&&!document.hidden&&!disposed)frame=requestAnimationFrame(tick);}
  function setMotion(){paused=document.body.classList.contains('motion-off');uniforms.uActive.value=paused?0:1;if(paused){cancelAnimationFrame(frame);frame=0;renderer.render(scene,camera);}else start();}
  function onVisibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();}
  parent.addEventListener('pointermove',move,{passive:true});parent.addEventListener('pointerleave',leave);
  document.addEventListener('motionchange',setMotion);document.addEventListener('visibilitychange',onVisibility);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();host.classList.remove('loaded');cancelAnimationFrame(frame);frame=0;});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{host.classList.add('loaded');setMotion();});
  resize();setMotion();host.classList.add('loaded');host.dataset.rendered='true';
  addEventListener('pagehide',()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();parent.removeEventListener('pointermove',move);parent.removeEventListener('pointerleave',leave);document.removeEventListener('motionchange',setMotion);document.removeEventListener('visibilitychange',onVisibility);geometry.dispose();material.dispose();texture.dispose();renderer.dispose();},{once:true});
 }catch(error){console.warn('Using the still-image experience:',error.message);renderer?.dispose();host.remove();}
}
