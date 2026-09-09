import {localize,ui} from './content/common.mjs';
import kitepulsion from './content/kitepulsion.mjs';
import narbonne from './content/narbonne-kite-passion.mjs';
import addicted from './content/addicted2kite.mjs';
import osmose from './content/osmose-kite.mjs';
import chinook from './content/chinook.mjs';
import skyfly from './content/skyfly.mjs';
import coriolis from './content/coriolis.mjs';
import tendance from './content/tendance-kite.mjs';
import ksl from './content/ksl.mjs';
import akila from './content/akila-gruissan.mjs';

export const reviewedOn='2026-09-09';
export const verified={kitepulsion,'narbonne-kite-passion':narbonne,addicted2kite:addicted,'osmose-kite':osmose,chinook,skyfly,coriolis,'tendance-kite':tendance,ksl,'akila-gruissan':akila};
export const languagesFor=slug=>slug==='skyfly'?['fr','en','de','es','nl']:['fr','en','de','es'];
export const uiFor=lang=>localize(ui,lang);
export function contentFor(s,lang){
 const d=localize(verified[s.slug],lang),u=uiFor(lang);
 d.title=`${s.name} — ${s.place}`;d.meta=d.intro;d.about=[d.about];d.steps=[];d.spotFeatures=[];
 d.reviewedOn=reviewedOn;d.priceNote=d.priceNote||u.ratesNote;
 d.booking.label=u[d.booking.kind];
 d.contacts=d.contacts.map(c=>({...c,label:u[c.label]||c.label}));
 d.facts=d.facts.map(f=>({...f,label:u[f.title]||f.title}));
 d.links=(d.links||[]).map(l=>({...l,label:u[l.label]||l.label}));
 d.sources=d.sources.map(v=>({...v,label:u[v.label]||({fr:'Les cours',en:'Courses',de:'Kurse',es:'Cursos',nl:'Cursussen'}[lang])}));
 d.mapUrl=d.mapUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery)}`;
 d.faq=[{q:u.bookingQ,a:d.booking.text,url:d.booking.url},{q:u.arrivalQ,a:d.spot,url:d.spotSource},{q:u.prepareQ,a:d.facts.find(f=>f.title==='requirements').text,url:d.facts.find(f=>f.title==='requirements').url}];
 d.courses=d.courses.map(c=>({...c,bookingUrl:c.bookingUrl||d.booking.url,bookingLabel:c.bookingUrl?.startsWith('tel:')?u.phone:c.bookingUrl===d.url?u.official:d.booking.label}));
 return d;
}
