import {writeFile,mkdir,cp,readdir} from 'node:fs/promises';
import {schools} from './schools.mjs';
import {locales} from './locales.mjs';
import {contentFor,languagesFor} from './verified-content.mjs';
import {presentationFor} from './presentation.mjs';
const root='/kite-schools-showcase/';
const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
const compass='<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 2 5 13 13 5-13 5-5 13-5-13L2 20l13-5z" fill="currentColor"/><circle cx="20" cy="20" r="4" fill="var(--paper,#f5f3eb)"/></svg>';
const img=(name,alt)=>`<img class="scene-image" src="/images/${name}.webp" srcset="/images/${name}-sm.webp 800w, /images/${name}.webp 2048w" sizes="100vw" alt="${esc(alt)}" fetchpriority="high" decoding="async" width="2048" height="1152">`;
const head=(title,desc,lang,image)=>`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f5f3eb"><meta name="robots" content="noindex"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="https://wrappedsuperclass.github.io${root}images/${image}.webp"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;450;500;550;600;650;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="/src/style.css"></head>`;
const script='<script type="module" src="/src/app.js"></script></body></html>';
const featured={kitepulsion:[0,2,3],skyfly:[0,1,3],coriolis:[0,2,4],ksl:[0,1,4],'akila-gruissan':[0,1,5]};
function booking(s,p){
 const {v,courses}=p;
 const label=(text,input,cls='')=>`<label class="field ${cls}"><span>${text}</span>${input}</label>`;
 const periods=['morning','afternoon','flexible'];
 return `<section class="booking-section section-wrap" id="reservation"><span id="contact" class="anchor-alias"></span><div class="booking-intro"><p class="eyebrow">${s.place.toUpperCase()}</p><h2>${v.bookingTitle}</h2><p>${v.bookingSub}</p><details class="direct-contacts"><summary>${v.contact} +</summary><div class="booking-contacts">${p.contacts.map(c=>`<div><strong>${esc(c.label)}</strong>${c.phone?`<a href="tel:${c.phone}">${esc(c.phone.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/,'+33 $1 $2 $3 $4 $5'))}</a>`:''}${c.email?`<a href="mailto:${c.email}">${esc(c.email)}</a>`:''}${c.whatsapp?`<a href="${esc(c.whatsapp)}" target="_blank" rel="noopener">WhatsApp ↗</a>`:''}</div>`).join('')}</div></details></div>
 <div class="booking-panel"><div class="booking-panel-top"><span class="demo-badge">${v.demo}</span><span class="booking-progress" aria-live="polite">01 / 03</span></div><ol class="booking-steps" aria-label="${v.book}">${[v.stepSession,v.stepYou,v.stepReview].map((t,i)=>`<li data-step-indicator="${i}"${i===0?' aria-current="step"':''}><span>0${i+1}</span>${t}</li>`).join('')}</ol>
 <p class="booking-demo-note">${v.demoNote}</p><form id="booking-form" action="#reservation" novalidate>
 <fieldset data-booking-step="0"><legend class="sr-only">${v.stepSession}</legend>
 ${label(v.session,`<select name="course" required>${courses.map((c,i)=>`<option value="${i}">${esc(c.name)}</option>`).join('')}</select>`)}
 <div class="booking-calendar"><div class="calendar-nav"><button type="button" data-month="-1" aria-label="${v.previousMonth}">←</button><h3 class="calendar-month" aria-live="polite"></h3><button type="button" data-month="1" aria-label="${v.nextMonth}">→</button></div><div class="calendar-weekdays" aria-hidden="true"></div><div class="calendar-days" role="group" aria-label="${v.date}"></div></div>
 ${label(v.date,'<input type="date" name="date" required>','date-field')}
 <fieldset class="period-choice"><legend>${v.period}</legend>${periods.map((period,i)=>`<label><input type="radio" name="period" value="${period}"${i===2?' checked':''}><span>${v[period]}</span></label>`).join('')}</fieldset>
 <div class="booking-actions"><button class="button button-dark" type="button" data-next>${v.continue} ${arrow}</button></div>
 </fieldset>
 <fieldset data-booking-step="1" hidden><legend class="sr-only">${v.stepYou}</legend><div class="booking-fields">
 ${label(v.name,'<input name="name" autocomplete="name" required maxlength="100">','field-wide')}
 ${label(v.email,'<input name="email" type="email" autocomplete="email" required maxlength="180">','field-wide')}
 ${label(v.phone,'<input name="phone" type="tel" autocomplete="tel" required maxlength="40">','field-wide')}
 ${label(v.people,'<input name="people" type="number" min="1" max="40" value="1" required>')}
 ${label(v.level,`<select name="level">${['beginner','intermediate','advanced'].map(l=>`<option value="${l}">${v[l]}</option>`).join('')}</select>`)}
 </div>${['addicted2kite','coriolis'].includes(s.slug)?`<details class="booking-extra"><summary>${v.measurements}</summary><div class="booking-fields">${label(v.weight,'<input name="weight" type="number" min="1" max="300">')}${s.slug==='coriolis'?label(v.height,'<input name="height" type="number" min="50" max="250">'):''}</div></details>`:''}
 <details class="booking-extra"><summary>${v.message}</summary><textarea name="message" rows="3" maxlength="1000" aria-label="${v.message}"></textarea></details>
 <div class="booking-actions"><button class="booking-back" type="button" data-back>← ${v.back}</button><button class="button button-dark" type="button" data-next>${v.continue} ${arrow}</button></div>
 </fieldset>
 <fieldset data-booking-step="2" hidden><legend class="sr-only">${v.stepReview}</legend><h3 class="review-heading" tabindex="-1">${v.stepReview}</h3><dl class="booking-summary"></dl><p class="review-note">${v.rates}</p><div class="booking-actions"><button class="booking-back" type="button" data-back>← ${v.back}</button><button class="button button-dark" type="button" data-finish>${v.finish} ${arrow}</button></div></fieldset>
 <div class="booking-complete" hidden role="status" tabindex="-1"><span class="complete-mark" aria-hidden="true">✓</span><h3>${v.done}</h3><p>${v.doneNote}</p><button class="button button-dark" type="button" data-reset>${v.reset} ${arrow}</button></div>
 </form><noscript><p>${v.noScript}</p></noscript></div></section>`;
}
function schoolPage(s,lang){
 const d=contentFor(s,lang),p=presentationFor(s,d,lang),{v}=p,t=locales[lang],headlines=s[lang]||s.en;
 const aboutTitle=lang==='fr'?s.aboutTitle:[t.intro,t.chapter];
 const main=featured[s.slug]||[0,1,2],extra=p.courses.map((_,i)=>i).filter(i=>!main.includes(i));
 const card=i=>{const c=p.courses[i];return `<article class="offer-card"><div class="offer-top"><span>${String(i+1).padStart(2,'0')}</span><button type="button" class="offer-detail" data-course="${i}" aria-label="${esc(v.details+' — '+c.name)}">↗</button></div><h3>${esc(c.name)}</h3><p class="offer-unit">${esc(c.unit)}</p><div class="offer-bottom"><p>${esc(c.price)}</p><button class="offer-book" type="button" data-select-course="${i}">${v.book} ${arrow}</button></div></article>`;};
 const json=JSON.stringify({name:s.name,slug:s.slug,courses:p.courses,v,lang}).replace(/</g,'\\u003c');
 return `${head(d.title,p.intro,lang,s.image)}<body class="school-page standalone theme-${s.theme} layout-${s.layout}" style="--accent:${s.accent};--ink:${s.ink}"><a class="skip-link" href="#formules">${t.courses}</a>
 <header class="site-nav school-nav"><a class="school-logo" href="#top">${s.logo}</a><nav aria-label="Navigation"><a href="#formules">${t.courses}</a><a href="#ecole">${v.school}</a><a href="#reservation" class="nav-cta">${v.book} ${arrow}</a></nav><details class="language-picker"><summary aria-label="${t.choose}">${lang.toUpperCase()} <span>⌄</span></summary><div class="lang-switch" aria-label="${t.choose}">${languagesFor(s.slug).map(l=>`<a${l===lang?' aria-current="page"':''} href="${root}${s.slug}/${l==='fr'?'':l+'.html'}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`).join('')}</div></details><button class="menu-toggle" aria-label="${t.menu}" aria-expanded="false"><span></span><span></span></button></header>
 <main><section class="school-hero" id="top"><div class="school-hero-visual">${img(s.image,v.imageNote)}<div class="scene" data-scene="${s.image}" aria-hidden="true"></div><div class="hero-shade"></div><div class="hero-coordinates">${s.place}<span>${s.category.toUpperCase()}</span></div></div><div class="school-hero-copy"><p class="eyebrow"><span class="small-line"></span>${s.place.toUpperCase()}</p><h1><span>${headlines[0]}</span><em>${headlines[1]}</em></h1><p class="school-hero-sub">${esc(p.intro)}</p><div class="school-hero-actions"><a class="button button-accent" href="#reservation">${v.book} ${arrow}</a><a class="hero-secondary" href="#formules">${t.learn} ↓</a></div></div><div class="school-hero-stamp">${compass}<span>${s.spot.toUpperCase()}</span></div><div class="school-hero-footer"><span>${s.spot}</span><a href="#formules">${t.scroll} ↓</a></div></section>
 <div class="school-facts section-wrap">${p.chips.map(c=>`<span>${esc(c)}</span>`).join('<i>✳</i>')}</div>
 <section class="offers-section section-wrap" id="formules"><div class="offers-heading"><p class="section-index">01 / ${t.courses.toUpperCase()}</p><h2>${t.sessionTitle}</h2></div><div class="offer-grid">${main.map(card).join('')}</div>${extra.length?`<details class="more-sessions"><summary>${v.more} <span>(${p.courses.length}) +</span></summary><div class="offer-grid">${extra.map(card).join('')}</div></details>`:''}<p class="offer-price-note">${v.rates}${p.courses.some(c=>c.price.includes(' / '))?' '+v.seasonal+'.':''}</p></section>
 <section class="school-about section-wrap" id="ecole"><div class="about-image reveal"><img src="/school-photos/${s.slug}.jpg" alt="${esc(s.name)}" loading="lazy" decoding="async"><div class="about-seal">${compass}<span>${s.place}</span></div></div><div class="about-copy"><p class="section-index">02 / ${v.school.toUpperCase()}</p><h2>${esc(aboutTitle[0])}<br><em>${esc(aboutTitle[1])}</em></h2><p>${esc(p.about)}</p><div class="practical-accordions" id="practical"><span id="spot" class="anchor-alias"></span>${[['arrival',p.arrival],['prepare',p.prepare],['conditions',p.conditions]].map(([key,value])=>`<details><summary>${v[key]}<span>+</span></summary><p>${esc(value)}</p>${key==='arrival'?`<a class="text-link" href="${esc(p.mapUrl)}" target="_blank" rel="noopener">${t.maps} ↗</a>`:''}</details>`).join('')}${p.team?`<details><summary>${v.team}<span>+</span></summary><ul class="compact-team">${p.team.map(person=>`<li><strong>${esc(person.name)}</strong><span>${esc(person.role)}</span></li>`).join('')}</ul></details>`:''}</div></div></section>
 ${booking(s,p)}</main><footer class="school-footer standalone-footer section-wrap"><a class="school-logo" href="#top">${s.logo}</a><span>${s.place}</span><button class="motion-toggle" aria-pressed="false" data-on="${t.on}" data-off="${t.off}">${t.motion} <span>${t.on}</span></button><small>${v.imageNote}</small></footer>
 <a href="#reservation" class="mobile-book">${v.book} ${arrow}</a><dialog class="course-dialog" aria-labelledby="course-heading"><button class="dialog-close" aria-label="${t.close}">×</button><div class="course-dialog-content"></div></dialog><script id="school-data" type="application/json">${json}</script>${script}`;
}
await mkdir('site/public',{recursive:true});
await writeFile('site/public/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#143d3d"/><path d="m32 7 7 18 18 7-18 7-7 18-7-18L7 32l18-7z" fill="#d4f76a"/></svg>');
await writeFile('site/public/.nojekyll','');
// Keep the shared root address blank; each school remains at its own URL.
await writeFile('site/index.html', '<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title></title></head><body></body></html>\n');
for(const s of schools){await mkdir(`site/${s.slug}`,{recursive:true});for(const lang of languagesFor(s.slug))await writeFile(`site/${s.slug}/${lang==='fr'?'index':lang}.html`,schoolPage(s,lang));}
if(!process.argv.includes('--templates-only')){
 const {build}=await import('vite');await build();
 for(const file of await readdir('site-dist'))await cp(`site-dist/${file}`,file,{recursive:true});
 console.log('Published build to repository root: 41 independent school pages + blank root.');
}
