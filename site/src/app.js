const root=import.meta.env.BASE_URL;
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
matchMedia('(min-width: 601px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const reveals=document.querySelectorAll('.reveal');
if(!motionOff&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.06});reveals.forEach(e=>{e.classList.add('pre-reveal');io.observe(e);});}
let previousFocus=null;
function openDialog(dialog){closeMenu();previousFocus=document.activeElement;dialog.showModal();body.classList.add('dialog-open');}
function closeDialog(dialog){dialog.close();}
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>closeDialog(dialog));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});dialog.addEventListener('close',()=>{body.classList.remove('dialog-open');previousFocus?.focus();});});
const collectionData=document.querySelector('#collection-data');
if(collectionData){
 const schools=JSON.parse(collectionData.textContent);
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;let count=0;document.querySelectorAll('.school-card').forEach(card=>{const show=filter==='all'||card.dataset.tags.split(' ').includes(filter);card.hidden=!show;if(show)count++;});document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelector('.filter-count').textContent=`${count} places to feel alive`;}));
 document.querySelectorAll('.map-pin').forEach(pin=>pin.addEventListener('click',()=>{const s=schools[Number(pin.dataset.school)];document.querySelectorAll('.map-pin').forEach(p=>{p.classList.toggle('active',p===pin);p.setAttribute('aria-pressed',String(p===pin));});document.querySelector('#map-location').textContent=`${s.place} / ${s.spot}`;document.querySelector('#map-name').textContent=s.name;document.querySelector('#map-description').textContent=s.short;document.querySelector('#map-link').href=`${root}${s.slug}/`;const image=document.querySelector('.map-school-photo img');image.src=`${root}images/${s.image}.webp`;image.srcset=`${root}images/${s.image}-sm.webp 800w, ${root}images/${s.image}.webp 2048w`;image.alt=s.name;}));
 const dialog=document.querySelector('.finder-dialog');const form=document.querySelector('#finder-form');const results=document.querySelector('.finder-results');
 document.querySelectorAll('[data-finder]').forEach(b=>b.addEventListener('click',()=>openDialog(dialog)));
 form.addEventListener('submit',e=>{e.preventDefault();const values=new FormData(form);const level=values.get('level'),sport=values.get('sport');const matches=schools.filter(s=>s.levels[sport]?.includes(level)).slice(0,3);results.replaceChildren();const description=document.createElement('p');description.textContent='A few places you might feel right at home. Explore each school, then contact the team to confirm the right session for you.';results.append(description);matches.forEach(s=>{const a=document.createElement('a');a.className='finder-result';a.href=`${root}${s.slug}/`;const im=document.createElement('img');im.src=`${root}images/${s.image}-sm.webp`;im.alt='';const content=document.createElement('div');const h=document.createElement('h3');h.textContent=s.name;const p=document.createElement('p');p.textContent=s.place+' · '+s.category;content.append(h,p);const arrow=document.createElement('span');arrow.textContent='↗';a.append(im,content,arrow);results.append(a);});const reset=document.createElement('button');reset.className='finder-reset';reset.textContent='← Change my choices';reset.addEventListener('click',()=>{results.hidden=true;form.hidden=false;form.querySelector('input').focus();});results.append(reset);form.hidden=true;results.hidden=false;results.querySelector('a').focus();});
}
const schoolData=document.querySelector('#school-data');
if(schoolData){
 const {courses,t,u,priceNote}=JSON.parse(schoolData.textContent),dialog=document.querySelector('.course-dialog'),content=dialog.querySelector('.course-dialog-content');
 document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{
  const c=courses[Number(button.dataset.course)];content.replaceChildren();
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=t.courseDetail;
  const title=document.createElement('h2');title.textContent=c.name;title.id='course-heading';
  const price=document.createElement('p');price.className='dialog-price';price.textContent=c.price;
  const unit=document.createElement('p');unit.className='dialog-unit';unit.textContent=c.unit;
  const list=document.createElement('ul');c.features.forEach(f=>{const li=document.createElement('li');li.textContent=f;list.append(li);});
  const note=document.createElement('p');note.className='dialog-note';note.textContent=priceNote;
  const source=document.createElement('a');source.className='source-link dialog-source';source.href=c.url;source.target='_blank';source.rel='noopener';source.textContent=u.source+' ↗';
  const a=document.createElement('a');a.className='button button-dark';a.href=c.bookingUrl;
  if(/^https?:/.test(c.bookingUrl)){a.target='_blank';a.rel='noopener';}
  a.textContent=c.bookingLabel+' ↗';content.append(eyebrow,title,price,unit,list,note,source,a);openDialog(dialog);
 }));
 document.querySelectorAll('[data-enquiry-form]').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const values=new FormData(form);
  const message=`${u.name}: ${values.get('name')}\n${u.dates}: ${values.get('dates')}\n\n${values.get('message')}`;
  const url=`mailto:${form.dataset.email}?subject=${encodeURIComponent(u.draftSubject)}&body=${encodeURIComponent(message)}`;
  const result=form.querySelector('.draft-result');result.hidden=false;result.querySelector('textarea').value=message;
  // Preparing a draft never submits a booking or sends a message from this site.
  location.href=url;
 }));
 const mobileBook=document.querySelector('.mobile-book');const contact=document.querySelector('#contact');
 if(mobileBook){const io=new IntersectionObserver(([e])=>{mobileBook.style.visibility=e.isIntersecting?'hidden':'';},{threshold:.05});io.observe(contact);}
}
// Load the visual enhancement after the usable page is painted.
const scene=document.querySelector('[data-scene]');
if(scene){const load=()=>import('./scene.js').then(({initScene})=>initScene(scene)).catch(()=>{});if('requestIdleCallback'in window)requestIdleCallback(load,{timeout:1200});else setTimeout(load,200);}
// Resolve direct section links again once the display fonts have settled.
if(location.hash){document.fonts.ready.then(()=>{const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));target?.scrollIntoView({behavior:'instant',block:'start'});});}
