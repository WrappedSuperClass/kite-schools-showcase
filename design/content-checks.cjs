const assert=require('node:assert/strict');
// Independent acceptance fixtures transcribed from official sources on 2026-09-09.
const expected={
 kitepulsion:{booking:'mailto:kitepulsion@gmail.com',phone:'+33682314920',courses:4,email:true},
 'narbonne-kite-passion':{booking:'https://narbonnekitepassion.com/reserver-vos-cours-de-kitesurf/',phone:'+33679827253',courses:7,email:true},
 addicted2kite:{booking:'https://addicted2kite.webflow.io/contact',phone:'+33674651701',courses:5,dated:true},
 'osmose-kite':{booking:'http://www.osmose-kite.com/reservation/',phone:'+33670708653',courses:6,email:true},
 chinook:{booking:'tel:+33468401717',phone:'+33468401717',courses:3,email:true},
 skyfly:{booking:'https://www.sky-fly.com/reservation-en-ligne.html',phone:'+33675422691',courses:8},
 coriolis:{booking:'https://coriolisfoilschool.fr/contact/',phone:'+33662070867',courses:5,dated:true},
 'tendance-kite':{booking:'https://www.tendancekite.com/book-online',phone:'+33662091703',courses:7,email:true},
 ksl:{booking:'https://www.kite-surf-leucate.com/inscription-r%C3%A9servation-cours-kite-wing',phone:'+33611581614',courses:5,email:true},
 'akila-gruissan':{booking:'https://www.akila-centers.com/nos-centres-sportifs/',phone:'+33468493333',courses:6,email:true}
};
async function checkSourceContent(page,route,report){
 const slug=route.split('/')[0],e=expected[slug];
 assert.equal(await page.locator('[data-booking]').getAttribute('href'),e.booking,route+' booking');
 assert.ok(await page.locator(`.contact-card a[href="tel:${e.phone}"]`).count(),route+' phone');
 assert.equal(await page.locator('.session-item').count(),e.courses,route+' course count');
 assert.equal(await page.locator('[data-enquiry-form]').count(),e.email?1:0,route+' verified email form');
 assert.equal(await page.locator('.content-review time').getAttribute('datetime'),'2026-09-09');
 assert.ok(await page.locator('#sources a').count()>=1);
 assert.equal(await page.locator('.dated-price-notice').count(),e.dated?1:0);
 if(e.dated)assert.match(await page.locator('.dated-price-notice').textContent(),/2022/);
 const brokenCitations=await page.locator('.source-link').evaluateAll(links=>links.filter(a=>!/^https?:\/\//.test(a.href)&&!a.href.startsWith('mailto:')&&!a.href.startsWith('tel:')).map(a=>a.href));
 assert.deepEqual(brokenCitations,[]);
 const data=await page.locator('#school-data').evaluate(el=>JSON.parse(el.textContent));
 for(let i=0;i<e.courses;i++){
  await page.locator(`[data-course="${i}"]`).click();
  const link=page.locator('.course-dialog-content a.button');
  assert.equal(await link.getAttribute('href'),data.courses[i].bookingUrl,route+' course destination');
  assert.ok(await page.locator('.course-dialog-content .source-link').isVisible());
  if(slug==='tendance-kite'&&i===5)assert.equal(await link.getAttribute('href'),'tel:+33662091703');
  if(slug==='chinook'&&i===2)assert.equal(await link.getAttribute('href'),'https://www.chinook-leucate.com/');
  await page.keyboard.press('Escape');
 }
 if(slug==='ksl'){
  assert.equal(await page.locator('.school-team li').count(),9);
  assert.ok(await page.locator('a[href="tel:+33619959802"]').count());
  assert.ok(await page.locator('a[href="mailto:contact.kitesurfleucate@gmail.com"]').count());
 }
 if(slug==='skyfly')assert.match(await page.locator('#spot').textContent(),/Port Adhoc/);
 if(slug==='osmose-kite')assert.match(await page.locator('#contact').textContent(),/60/);
 if(slug==='chinook')assert.match(await page.locator('#ecole').textContent(),/2024/);
 if(slug==='akila-gruissan')assert.ok(await page.locator('a[href="https://wa.me/33767594064"]').count());
 report.checks.push(route+': sources, contact, booking route and all course dialogs.');
}
async function checkEnquiryDraft(page,base,report){
 // Headless browser only: composing mailto cannot send a message or make a booking.
 await page.goto(base+'kitepulsion/en.html',{waitUntil:'domcontentloaded'});
 await page.locator('.enquiry-compose summary').click();
 await page.locator('[name="name"]').fill('Local test & visitor');
 await page.locator('[name="dates"]').fill('Dates to discuss');
 await page.locator('[name="message"]').fill('Beginner <kite>\nA second line.');
 await page.locator('[data-enquiry-form] button').click();
 const draft=await page.locator('.draft-result textarea').inputValue();
 assert.match(draft,/Local test & visitor/);assert.match(draft,/Beginner <kite>\nA second line\./);
 assert.ok(await page.locator('.draft-result').isVisible());
 report.checks.push('Email composer prepares an escaped multiline draft and exposes a copy fallback; no form submission.');
}
module.exports={checkSourceContent,checkEnquiryDraft};
