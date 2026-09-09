import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./three-CP64oXgg.js";var l=`/kite-schools-showcase/`;async function u(u){let d,f,p,m,h,g=0,_=!1,v=!0,y=!1,b=matchMedia(`(prefers-reduced-motion: reduce)`).matches;try{d=new c({alpha:!0,antialias:!1,powerPreference:`low-power`}),d.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),d.outputColorSpace=e,u.append(d.domElement);let x=new a,S=new o(-1,1,1,-1,0,1);if(f=await new t().loadAsync(`${l}images/${u.dataset.scene}.webp`),_){f.dispose();return}f.colorSpace=e;let C=new r(.5,.5),w=new r(.5,.5),T={uTexture:{value:f},uTime:{value:0},uPointer:{value:C},uAspect:{value:1},uImageAspect:{value:f.image.width/f.image.height},uActive:{value:+!b},uHover:{value:0},uFocus:{value:.5}};p=new s({uniforms:T,depthWrite:!1,depthTest:!1,vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.);}`,fragmentShader:`
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
   }`}),m=new n(2,2),h=new i(m,p),x.add(h);let E=u.parentElement,D=0,O=0;function k(){let e=u.getBoundingClientRect();if(D=e.width,O=e.height,!D||!O)return;d.setSize(D,O,!1),T.uAspect.value=D/O;let t={kitepulsion:.8,skyfly:.73,coriolis:.77,addicted:.72,akila:.72,ksl:.73,osmose:.61};T.uFocus.value=window.innerWidth<600&&t[u.dataset.scene]||.5,d.render(x,S)}let A=new ResizeObserver(k);A.observe(u);let j=new IntersectionObserver(e=>{v=e[0].isIntersecting,v&&F()},{rootMargin:`100px`});j.observe(u);function M(e){let t=u.getBoundingClientRect();w.set((e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height),T.uHover.value=1}function N(){w.set(.5,.5),T.uHover.value=0}function P(e){g=0,!(_||!v||y||document.hidden)&&(C.lerp(w,.035),T.uTime.value=e*.001,d.render(x,S),g=requestAnimationFrame(P))}function F(){!g&&!y&&!document.hidden&&!_&&(g=requestAnimationFrame(P))}function I(){y=document.body.classList.contains(`motion-off`),T.uActive.value=+!y,y?(cancelAnimationFrame(g),g=0,d.render(x,S)):F()}function L(){document.hidden?(cancelAnimationFrame(g),g=0):F()}E.addEventListener(`pointermove`,M,{passive:!0}),E.addEventListener(`pointerleave`,N),document.addEventListener(`motionchange`,I),document.addEventListener(`visibilitychange`,L),d.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),u.classList.remove(`loaded`),cancelAnimationFrame(g),g=0}),d.domElement.addEventListener(`webglcontextrestored`,()=>{u.classList.add(`loaded`),I()}),k(),I(),u.classList.add(`loaded`),u.dataset.rendered=`true`,addEventListener(`pagehide`,()=>{_=!0,cancelAnimationFrame(g),A.disconnect(),j.disconnect(),E.removeEventListener(`pointermove`,M),E.removeEventListener(`pointerleave`,N),document.removeEventListener(`motionchange`,I),document.removeEventListener(`visibilitychange`,L),m.dispose(),p.dispose(),f.dispose(),d.dispose()},{once:!0})}catch(e){console.warn(`Using the still-image experience:`,e.message),d?.dispose(),u.remove()}}export{u as initScene};