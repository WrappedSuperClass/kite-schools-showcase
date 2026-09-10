// Local presentation flow: no network submission, payment, storage or real availability.
export function initBooking({courses,v,lang,slug}){
 const form=document.querySelector('#booking-form');
 const steps=[...form.querySelectorAll('[data-booking-step]')];
 const date=form.elements.date,course=form.elements.course,people=form.elements.people;
 const complete=form.querySelector('.booking-complete');
 const days=form.querySelector('.calendar-days'),monthTitle=form.querySelector('.calendar-month');
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
 const min=`${parts.year}-${parts.month}-${parts.day}`;
 const parse=s=>new Date(s+'T12:00:00');
 const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 const today=parse(min),last=new Date(today.getFullYear()+1,today.getMonth(),today.getDate(),12);
 const max=iso(last),format=new Intl.DateTimeFormat(lang,{dateStyle:'long'});
 date.min=min;date.max=max;
 let month=new Date(today.getFullYear(),today.getMonth(),1,12),step=0;
 const weekday=new Intl.DateTimeFormat(lang,{weekday:'short'});
 for(let i=0;i<7;i++){const day=document.createElement('span');day.textContent=weekday.format(new Date(2026,0,5+i,12));form.querySelector('.calendar-weekdays').append(day);}
 function renderCalendar(focusDate){
  days.replaceChildren();
  monthTitle.textContent=new Intl.DateTimeFormat(lang,{month:'long',year:'numeric'}).format(month);
  const offset=(month.getDay()+6)%7,total=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
  for(let i=0;i<offset;i++){const empty=document.createElement('span');empty.setAttribute('aria-hidden','true');days.append(empty);}
  for(let n=1;n<=total;n++){
   const value=iso(new Date(month.getFullYear(),month.getMonth(),n,12));
   const button=document.createElement('button');button.type='button';button.textContent=n;button.dataset.date=value;
   button.disabled=value<min||value>max;button.setAttribute('aria-label',format.format(parse(value)));
   button.setAttribute('aria-pressed',String(value===date.value));if(value===min)button.setAttribute('aria-current','date');
   button.addEventListener('click',()=>{date.value=value;renderCalendar(value);});days.append(button);
  }
  form.querySelector('[data-month="-1"]').disabled=month<=new Date(today.getFullYear(),today.getMonth(),1,12);
  form.querySelector('[data-month="1"]').disabled=month>=new Date(last.getFullYear(),last.getMonth(),1,12);
  if(focusDate)days.querySelector(`[data-date="${focusDate}"]`)?.focus({preventScroll:true});
 }
 form.querySelectorAll('[data-month]').forEach(button=>button.addEventListener('click',()=>{
  month=new Date(month.getFullYear(),month.getMonth()+Number(button.dataset.month),1,12);renderCalendar();
 }));
 date.addEventListener('change',()=>{if(date.value&&date.validity.valid){const chosen=parse(date.value);month=new Date(chosen.getFullYear(),chosen.getMonth(),1,12);}renderCalendar();});
 days.addEventListener('keydown',e=>{
  if(!e.target.dataset.date)return;
  const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];if(delta===undefined)return;
  e.preventDefault();const next=parse(e.target.dataset.date);next.setDate(next.getDate()+delta);const value=iso(next);
  if(value<min||value>max)return;month=new Date(next.getFullYear(),next.getMonth(),1,12);renderCalendar(value);
 });
 function setStep(n,focus=true){
  step=n;complete.hidden=true;steps.forEach((s,i)=>s.hidden=i!==n);
  document.querySelectorAll('[data-step-indicator]').forEach((s,i)=>{if(i===n)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');});
  document.querySelector('.booking-progress').textContent=`0${n+1} / 03`;
  if(focus){form.scrollIntoView({behavior:'instant',block:'start'});steps[n].querySelector('input,select,.review-heading')?.focus({preventScroll:true});}
 }
 function validStage(){
  for(const input of steps[step].querySelectorAll('input,select,textarea')){
   if(!input.checkValidity()){
    input.closest('details')?.setAttribute('open','');input.reportValidity();return false;
   }
  }
  return true;
 }
 function summary(){
  const values=new FormData(form),list=form.querySelector('.booking-summary');list.replaceChildren();
  const rows=[
   [v.session,courses[Number(course.value)].name],[v.date,format.format(parse(date.value))],
   [v.period,v[values.get('period')]],[v.name,values.get('name')],[v.email,values.get('email')],
   [v.phone,values.get('phone')],[v.people,values.get('people')],[v.level,v[values.get('level')]]
  ];
  if(values.get('weight'))rows.push([v.weight,values.get('weight')]);
  if(values.get('height'))rows.push([v.height,values.get('height')]);
  if(values.get('message'))rows.push([v.message,values.get('message')]);
  rows.forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;list.append(dt,dd);});
 }
 function advance(){if(!validStage())return;if(step===1)summary();setStep(Math.min(step+1,2));}
 form.addEventListener('submit',e=>{e.preventDefault();if(step<2)advance();});
 form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',advance));
 form.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>setStep(Math.max(0,step-1))));
 form.querySelector('[data-finish]').addEventListener('click',()=>{
  if(step!==2)return;
  steps.forEach(s=>s.hidden=true);complete.hidden=false;
  document.querySelector('.booking-progress').textContent='03 / 03';complete.focus();
  // Clear entered personal details immediately after the local demonstration.
  form.reset();adjustParticipants();form.querySelector('.booking-summary').replaceChildren();renderCalendar();
 });
 form.querySelector('[data-reset]').addEventListener('click',()=>{form.reset();adjustParticipants();month=new Date(today.getFullYear(),today.getMonth(),1,12);renderCalendar();setStep(0);});
 function adjustParticipants(){people.max=slug==='skyfly'&&Number(course.value)===7?'4':'40';if(Number(people.value)>Number(people.max))people.value=people.max;}
 course.addEventListener('change',adjustParticipants);
 renderCalendar();setStep(0,false);
 return index=>{
  if(!Number.isInteger(index)||index<0||index>=courses.length)return;
  course.value=String(index);adjustParticipants();setStep(0,false);
  document.querySelector('#reservation').scrollIntoView({behavior:'instant',block:'start'});course.focus({preventScroll:true});
 };
}
