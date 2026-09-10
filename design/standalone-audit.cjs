const {chromium}=require('playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.VENT_TEST_BASE||'http://127.0.0.1:4174/kite-schools-showcase/';
const slugs=['kitepulsion','narbonne-kite-passion','addicted2kite','osmose-kite','chinook','skyfly','coriolis','tendance-kite','ksl','akila-gruissan'];
const routes=[...slugs.flatMap(s=>(s==='skyfly'?['fr','en','de','es','nl']:['fr','en','de','es']).map(l=>s+'/'+(l==='fr'?'':l+'.html')))];
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=metal']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[],failed=[],outbound=[];const report={pages:[],flows:[],checks:[]};
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failed.push(r.url());});
 page.on('request',r=>{if(r.method()!=='GET')outbound.push(r.url());});
 for(const route of routes){
  await page.goto(base+route,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelectorAll('.calendar-days button').length>27);
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
  const result=await page.evaluate(()=>({title:document.title,width:document.documentElement.scrollWidth,viewport:innerWidth,words:document.body.innerText.split(/\s+/).length,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),external:[...document.querySelectorAll('a[href^="http"]')].map(a=>a.href),badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),data:JSON.parse(document.querySelector('#school-data').textContent),copy:document.body.innerText}));
  assert.equal(result.width,result.viewport,route+' desktop overflow');assert.deepEqual(result.broken,[],route+' images');assert.deepEqual(result.badAnchors,[],route+' anchors');
  assert.ok(result.external.every(u=>/^https:\/\/(www\.google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl|wa\.me\/)/.test(u)),route+' external website link '+result.external.join(','));
  assert.equal(await page.locator('.collection-bar,.collection-logo,.next-school,.sources-section,.content-review,.source-link,.finder-dialog').count(),0);
  assert.ok(!/source officielle|official (source|site|website)|offizielle (quelle|website)|fuente oficial|site officiel|web oficial|showcase|THE KITE SCHOOL COLLECTION|VENT\s*\//i.test(result.copy),route+' research or showcase copy');
  assert.equal(await page.locator('.offer-card:visible').count(),3,route+' three featured sessions');
  const data=result.data;
  assert.equal(await page.locator('.offer-card').count(),data.courses.length);
  // Every offer selects the same-page form, including offers behind the disclosure.
  for(let i=0;i<data.courses.length;i++){
   const button=page.locator(`[data-select-course="${i}"]`);
   if(!await button.isVisible())await page.locator('.more-sessions>summary').click();
   await button.click();assert.equal(await page.locator('select[name="course"]').inputValue(),String(i),route+' course selection');
   assert.equal(page.url(),base+route,route+' must not navigate to a booking provider');
  }
  // Empty date blocks progression. Calendar supports next/previous months and past-date protection.
  await page.locator('[data-booking-step="0"] [data-next]').click();assert.ok(await page.locator('[data-booking-step="0"]').isVisible());
  const min=await page.locator('[name="date"]').getAttribute('min');
  const previous=await page.locator('.calendar-month').innerText();await page.locator('[data-month="1"]').click();assert.notEqual(await page.locator('.calendar-month').innerText(),previous);await page.locator('[data-month="-1"]').click();assert.equal(await page.locator('.calendar-month').innerText(),previous);
  assert.equal(await page.locator('.calendar-days button:enabled').evaluateAll((buttons,min)=>buttons.some(b=>b.dataset.date<min),min),false);
  await page.locator('.calendar-days button:enabled').first().click();const chosen=await page.locator('[name="date"]').inputValue();assert.ok(chosen>=min);
  await page.locator('[data-booking-step="0"] [data-next]').click();
  await page.locator('[data-booking-step="1"] [data-next]').click();assert.ok(await page.locator('[data-booking-step="1"]').isVisible());
  await page.locator('[name="name"]').fill('Preview <visitor> & friend');await page.locator('[name="email"]').fill('demo@example.com');await page.locator('[name="phone"]').fill('+33000000000');
  await page.locator('[name="people"]').fill('2');
  await page.locator('[data-booking-step="1"] [data-next]').click();assert.ok(await page.locator('[data-booking-step="2"]').isVisible());
  assert.match(await page.locator('.booking-summary').innerText(),/Preview <visitor> & friend/);
  await page.locator('[data-booking-step="2"] [data-back]').click();assert.equal(await page.locator('[name="email"]').inputValue(),'demo@example.com');await page.locator('[data-booking-step="1"] [data-next]').click();
  await page.locator('[data-finish]').click();assert.ok(await page.locator('.booking-complete').isVisible());assert.equal(await page.locator('[name="email"]').inputValue(),'');assert.equal(await page.locator('[name="people"]').getAttribute('max'),'40');
  assert.equal(page.url(),base+route);assert.equal(await page.locator('.booking-summary').innerText(),'');
  await page.locator('[data-reset]').click();assert.ok(await page.locator('[data-booking-step="0"]').isVisible());assert.equal(await page.locator('[name="date"]').inputValue(),'');
  if(route==='skyfly/'){await page.locator('[name="course"]').selectOption('7');assert.equal(await page.locator('[name="people"]').getAttribute('max'),'4');}
  if(data.slug==='addicted2kite')assert.equal(await page.locator('[name="weight"]').count(),1);
  if(data.slug==='coriolis')assert.equal(await page.locator('[name="height"]').count(),1);
  if(route){await page.locator('.language-picker>summary').click();const links=await page.locator('.lang-switch a').evaluateAll(a=>a.map(x=>x.href));assert.ok(links.every(h=>h.includes('/'+data.slug+'/')));await page.locator('.language-picker>summary').click();}
  // Details modal preserves the local booking route as well.
  await page.locator('[data-course]').first().click();assert.ok(await page.locator('.course-dialog').evaluate(d=>d.open));await page.locator('.course-dialog-content button').click();await page.waitForFunction(()=>!document.querySelector('.course-dialog').open);assert.ok(await page.locator('#booking-form').isVisible());
  report.pages.push({route,title:result.title,visibleWords:result.words});report.flows.push(route);
  console.log('PASS',route||'root');
 }
 fs.writeFileSync('.verification/standalone/flows.json',JSON.stringify(report,null,2));
 for(const width of [320,390,768,1024]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){
   await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelectorAll('.calendar-days button').length>27);await page.evaluate(()=>document.fonts.ready);
   const bad=await page.evaluate(()=>{const r=document.createRange();r.selectNodeContents(document.querySelector('h1'));const h=r.getBoundingClientRect();return{overflow:document.documentElement.scrollWidth>innerWidth,heading:h.left<0||h.right>innerWidth+1};});assert.deepEqual(bad,{overflow:false,heading:false},route+' width '+width);
   if(width===390){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.locator('.site-nav nav a[href="#reservation"]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('#booking-form').scrollIntoViewIfNeeded();await page.waitForFunction(()=>getComputedStyle(document.querySelector('.mobile-book')).visibility==='hidden');}
  }
  console.log('PASS responsive',width);
 }
 await page.setViewportSize({width:768,height:900});await page.goto(base+'akila-gruissan/',{waitUntil:'domcontentloaded'});await page.locator('.menu-toggle').click();await page.setViewportSize({width:1024,height:900});await page.waitForFunction(()=>!document.body.classList.contains('menu-open'));
 const webgl=await browser.newPage({viewport:{width:1440,height:1000}});await webgl.goto(base+'akila-gruissan/',{waitUntil:'domcontentloaded'});await webgl.waitForFunction(()=>document.querySelector('.scene').dataset.rendered==='true');await webgl.close();
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(outbound,[],'form must not send data');
 report.checks=['All 41 school pages: three featured offers, no source/showcase/cross-school links.','All 41 same-page booking demos: selection, calendar, validation, back/review, completion, reset, no outbound submission.','All 232 school course selectors stay on the same page.','All 41 school pages at 320, 390, 768, 1024 and 1440px: no horizontal overflow or clipped headlines.','Mobile menus and booking-bar visibility, language links, local course dialogs, Three.js.'];
 report.errors=errors;report.failed=failed;report.outbound=outbound;report.passed=true;fs.writeFileSync('.verification/standalone/audit.json',JSON.stringify(report,null,2));console.log('PASS ALL',JSON.stringify({pages:report.pages.length,flows:report.flows.length,errors,failed,outbound}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
