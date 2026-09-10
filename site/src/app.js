import {initBooking} from './booking.js';
const body=document.body;
let savedMotion=null;
try{savedMotion=localStorage.getItem('vent-motion');}catch{}
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let motionOff=savedMotion==='off'||(savedMotion===null&&motionQuery.matches);
function applyMotion(){body.classList.toggle('motion-off',motionOff);document.querySelectorAll('.motion-toggle').forEach(b=>{b.setAttribute('aria-pressed',String(motionOff));b.querySelector('span').textContent=motionOff?(b.dataset.off||'Off'):(b.dataset.on||'On');});document.dispatchEvent(new Event('motionchange'));}
applyMotion();
document.querySelectorAll('.motion-toggle').forEach(b=>b.addEventListener('click',()=>{motionOff=!motionOff;savedMotion=motionOff?'off':'on';try{localStorage.setItem('vent-motion',motionOff?'off':'on');}catch{}applyMotion();}));
motionQuery.addEventListener('change',e=>{if(savedMotion===null){motionOff=e.matches;applyMotion();}});
const menuButton=document.querySelector('.menu-toggle');
function closeMenu(){body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false');}
menuButton?.addEventListener('click',()=>{const open=body.classList.toggle('menu-open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-nav nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const reveals=document.querySelectorAll('.reveal');
if(!motionOff&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.06});reveals.forEach(e=>{e.classList.add('pre-reveal');io.observe(e);});}
let previousFocus=null;
function openDialog(dialog){closeMenu();previousFocus=document.activeElement;dialog.showModal();body.classList.add('dialog-open');}
function closeDialog(dialog){dialog.close();}
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>closeDialog(dialog));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});dialog.addEventListener('close',()=>{body.classList.remove('dialog-open');previousFocus?.focus();});});
const schoolData=document.querySelector('#school-data');
if(schoolData){
 const data=JSON.parse(schoolData.textContent),{courses,v}=data;
 const selectCourse=initBooking(data),dialog=document.querySelector('.course-dialog'),content=dialog.querySelector('.course-dialog-content');
 document.querySelectorAll('[data-select-course]').forEach(button=>button.addEventListener('click',()=>selectCourse(Number(button.dataset.selectCourse))));
 document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.course),c=courses[index];content.replaceChildren();
  const title=document.createElement('h2');title.textContent=c.name;title.id='course-heading';
  const price=document.createElement('p');price.className='dialog-price';price.textContent=c.price;
  const unit=document.createElement('p');unit.className='dialog-unit';unit.textContent=c.unit;
  const list=document.createElement('ul');c.features.forEach(f=>{const li=document.createElement('li');li.textContent=f;list.append(li);});
  const bookButton=document.createElement('button');bookButton.className='button button-dark';bookButton.type='button';bookButton.textContent=v.book+' ↗';
  bookButton.addEventListener('click',()=>{dialog.close();requestAnimationFrame(()=>selectCourse(index));});
  content.append(title,price,unit,list,bookButton);openDialog(dialog);
 }));
 const mobileBook=document.querySelector('.mobile-book');
 if(mobileBook){const io=new IntersectionObserver(([e])=>{mobileBook.style.visibility=e.isIntersecting?'hidden':'';},{threshold:.02});io.observe(document.querySelector('#reservation'));}
}
// Load the visual enhancement after the usable page is painted.
const scene=document.querySelector('[data-scene]');
if(scene){const load=()=>import('./scene.js').then(({initScene})=>initScene(scene)).catch(()=>{});if('requestIdleCallback'in window)requestIdleCallback(load,{timeout:1200});else setTimeout(load,200);}
// Resolve direct section links again once the display fonts have settled.
if(location.hash){document.fonts.ready.then(()=>{const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));target?.scrollIntoView({behavior:'instant',block:'start'});});}
