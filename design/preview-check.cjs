const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=metal']});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGE ERROR',e.message));
const slugs=['','kitepulsion','narbonne-kite-passion','addicted2kite','osmose-kite','chinook','skyfly','coriolis','tendance-kite','ksl','akila-gruissan'];
for(const slug of slugs){await page.goto('http://127.0.0.1:4174/kite-schools-showcase/'+(slug?slug+'/':''),{waitUntil:'networkidle'});await page.screenshot({path:'.verification/desktop-'+(slug||'home')+'.png'});console.log('desktop',slug||'home',await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,three:document.querySelector('.scene')?.dataset.rendered})));}
await page.setViewportSize({width:390,height:844});
for(const slug of slugs){await page.goto('http://127.0.0.1:4174/kite-schools-showcase/'+(slug?slug+'/':''),{waitUntil:'networkidle'});await page.screenshot({path:'.verification/mobile-'+(slug||'home')+'.png'});console.log('mobile',slug||'home',await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,width:document.documentElement.scrollWidth,three:document.querySelector('.scene')?.dataset.rendered})));}
await browser.close();
})();
