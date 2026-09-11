import './style.css';
import { initBooking } from './booking.js';
const school=JSON.parse(document.getElementById('school-data').textContent);
initBooking(school);
const control=document.querySelector('.motion'),media=matchMedia('(prefers-reduced-motion:reduce)');
function motion(paused){document.body.classList.toggle('motion-off',paused);control.setAttribute('aria-pressed',String(paused));control.textContent=paused?'Activer l’animation':'Pause animation';document.dispatchEvent(new Event('motionchange'));}
motion(media.matches);
control.addEventListener('click',()=>motion(!document.body.classList.contains('motion-off')));
media.addEventListener('change',e=>motion(e.matches));
if(navigator.connection?.saveData){motion(true);control.hidden=true;}else import('./scene.js').then(({initScene})=>initScene(document.querySelector('.scene'))).catch(()=>{control.hidden=true;});
