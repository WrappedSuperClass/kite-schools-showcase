// A local demonstration. No submission endpoint, storage, payment or live inventory.
export function initBooking(school){
 const form=document.querySelector('#booking-form'),f=form.elements,steps=[...form.querySelectorAll('[data-step]')],complete=form.querySelector('.booking-complete');
 const date=f.date,course=f.course,days=form.querySelector('.calendar-days');
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
 const min=`${parts.year}-${parts.month}-${parts.day}`,parse=s=>new Date(s+'T12:00:00');
 const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 const today=parse(min),last=new Date(today.getFullYear()+1,today.getMonth(),today.getDate(),12),max=iso(last);date.min=min;date.max=max;
 let month=new Date(today.getFullYear(),today.getMonth(),1,12),step=0;
 const format=new Intl.DateTimeFormat('fr-FR',{dateStyle:'long'}),week=new Intl.DateTimeFormat('fr-FR',{weekday:'short'});
 for(let i=0;i<7;i++){const span=document.createElement('span');span.textContent=week.format(new Date(2026,0,5+i,12));form.querySelector('.calendar-weekdays').append(span);}
 function renderCalendar(focusDate){
  days.replaceChildren();form.querySelector('.calendar-month').textContent=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(month);
  for(let i=0;i<(month.getDay()+6)%7;i++){const empty=document.createElement('span');empty.setAttribute('aria-hidden','true');days.append(empty);}
  const total=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
  for(let n=1;n<=total;n++){const value=iso(new Date(month.getFullYear(),month.getMonth(),n,12)),b=document.createElement('button');b.type='button';b.textContent=n;b.dataset.date=value;b.disabled=value<min||value>max;b.setAttribute('aria-label',format.format(parse(value)));b.setAttribute('aria-pressed',String(value===date.value));if(value===min)b.setAttribute('aria-current','date');b.addEventListener('click',()=>{date.value=value;renderCalendar(value);updateCourse();});days.append(b);}
  form.querySelector('[data-month="-1"]').disabled=month<=new Date(today.getFullYear(),today.getMonth(),1,12);
  form.querySelector('[data-month="1"]').disabled=month>=new Date(last.getFullYear(),last.getMonth(),1,12);
  if(focusDate)days.querySelector(`[data-date="${focusDate}"]`)?.focus({preventScroll:true});
 }
 form.querySelectorAll('[data-month]').forEach(b=>b.addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()+Number(b.dataset.month),1,12);renderCalendar();}));
 date.addEventListener('change',()=>{if(date.value&&date.validity.valid){const d=parse(date.value);month=new Date(d.getFullYear(),d.getMonth(),1,12);}renderCalendar();updateCourse();});
 days.addEventListener('keydown',e=>{if(!e.target.dataset.date)return;const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];if(delta===undefined)return;e.preventDefault();const d=parse(e.target.dataset.date);d.setDate(d.getDate()+delta);const value=iso(d);if(value<min||value>max)return;month=new Date(d.getFullYear(),d.getMonth(),1,12);renderCalendar(value);});
 function current(){return school.courses[Number(course.value)];}
 function price(){const c=current();if(c.low&&date.value&&f.kind?.value!=='gift'){const md=date.value.slice(5),high=md>='05-01'&&md<='10-01';return `${high?c.high:c.low} € · ${high?'haute':'basse'} saison`;}return c.price;}
 function updateCourse(){
  const c=current(),p=form.querySelector('.selected-price');document.querySelector('.contact-inline').href='tel:'+(c.group==='Catamaran'?school.secondPhone.number:school.phone);p.textContent=`${c.duration} · ${price()}`;
  if(c.note){const small=document.createElement('small');small.textContent=c.note;p.append(small);}
  f.people.min=c.min||1;f.people.max=c.max||12;f.people.value=Math.max(Number(f.people.min),Math.min(Number(f.people.max),Number(f.people.value)||1));
  if(f.base){for(const option of f.base.options)option.disabled=!!c.base&&option.value!==c.base;if(c.base)f.base.value=c.base;}
 }
 function updateKind(){const gift=f.kind?.value==='gift';form.querySelector('.date-choice').hidden=gift;date.required=!gift;const note=form.querySelector('.gift-note');if(note)note.hidden=!gift;updateCourse();}
 course.addEventListener('change',updateCourse);f.kind?.addEventListener('change',updateKind);
 function setStep(n,focus=true){step=n;complete.hidden=true;steps.forEach((s,i)=>s.hidden=i!==n);form.querySelector('.booking-progress').textContent=`0${n+1} / 03`;form.querySelector('.step-name').textContent=['Votre sortie','Vos coordonnées','Le récapitulatif'][n];if(focus){form.scrollIntoView({behavior:'instant',block:'start'});steps[n].querySelector('input,select,.review-heading')?.focus({preventScroll:true});}}
 function valid(){for(const input of steps[step].querySelectorAll('input,select,textarea'))if(!input.checkValidity()){input.reportValidity();return false;}return true;}
 function summary(){const list=form.querySelector('.booking-summary');list.replaceChildren();const gift=f.kind?.value==='gift';const rows=[['Formule',current().name],['Tarif',price()],...(f.base?[['Base',f.base.value]]:[]),['Envie',gift?'Bon cadeau':'Session'],...(!gift?[['Date souhaitée',format.format(parse(date.value))]]:[]),['Nom',f.name.value],['E-mail',f.email.value],...(f.phone.value?[['Téléphone',f.phone.value]]:[]),['Participants',f.people.value],['Niveau',f.level.value],...(f.message.value?[['Précision',f.message.value]]:[])];for(const [label,value]of rows){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;list.append(dt,dd);}}
 function next(){if(!valid())return;if(step===1)summary();setStep(Math.min(step+1,2));}
 form.addEventListener('submit',e=>{e.preventDefault();if(step<2)next();});form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',next));form.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>setStep(Math.max(0,step-1))));
 form.querySelector('[data-finish]').addEventListener('click',()=>{if(step!==2)return;const contact=current().group==='Catamaran'?school.secondPhone.number:school.phone;steps.forEach(s=>s.hidden=true);complete.hidden=false;form.querySelector('.step-name').textContent='Démo terminée';complete.focus();form.reset();form.querySelector('.booking-summary').replaceChildren();updateKind();renderCalendar();complete.querySelector('a').href='tel:'+contact;});
 form.querySelector('[data-reset]').addEventListener('click',()=>{form.reset();month=new Date(today.getFullYear(),today.getMonth(),1,12);updateKind();renderCalendar();setStep(0);});
 document.querySelectorAll('[data-course]').forEach(b=>b.addEventListener('click',()=>{course.value=b.dataset.course;updateKind();setStep(0,false);document.querySelector('#reservation').scrollIntoView({behavior:'instant',block:'start'});course.focus({preventScroll:true});}));
 renderCalendar();updateKind();setStep(0,false);
}
