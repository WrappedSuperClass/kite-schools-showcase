import re,json,html,subprocess
from pathlib import Path
slugs=['kitepulsion','narbonne-kite-passion','addicted2kite','osmose-kite','chinook','skyfly','coriolis','tendance-kite','ksl','akila-gruissan']
def clean(s): return re.sub(r'\s+',' ',html.unescape(re.sub('<[^>]+>',' ',s))).strip()
def match(p,s,default=''):
 m=re.search(p,s,re.S);return m.group(1) if m else default
result={}
for slug in slugs:
 result[slug]={}
 for lang in ['fr','en','de','es','nl']:
  p=Path(slug)/('index.html' if lang=='fr' else lang+'.html')
  if not p.exists():continue
  s=subprocess.check_output(['git','show','395723b:'+str(p)],text=True);data={}
  data['title']=clean(match(r'<title>(.*?)</title>',s))
  data['intro']=clean(match(r'<p class="hero-sub[^\"]*">(.*?)</p>',s))
  data['legacyHeadline']=clean(match(r'<h1[^>]*>(.*?)</h1>',s))
  data['phone']=match(r'href="tel:([^\"]+)"',s)
  data['email']=match(r'href="mailto:([^\"]+)"',s)
  data['lat']=float(match(r'lat:\s*([\d.]+)',s,'43.0'))
  data['lon']=float(match(r'lon:\s*([\d.]+)',s,'3.0'))
  courses=[]
  section=s
  for c in re.split(r'<div class="price-card[^\"]*">',section)[1:]:
   price=match(r'<p class="price">(.*?)</p>',c)
   courses.append({'name':clean(match(r'<h3>(.*?)</h3>',c)),'price':clean(re.sub(r'<span>.*?</span>','',price,flags=re.S)),'unit':clean(match(r'<span>(.*?)</span>',price)),'features':[clean(v) for v in re.findall(r'<li>(.*?)</li>',match(r'<ul>(.*?)</ul>',c),re.S)]})
  data['courses']=courses
  data['faq']=[{'q':clean(q),'a':clean(a)} for q,a in re.findall(r'<details><summary>(.*?)</summary><p>(.*?)</p></details>',s,re.S)]
  about_id={'narbonne-kite-passion':'pourquoi','osmose-kite':'concept','coriolis':'foil','ksl':'club','akila-gruissan':'base'}.get(slug,'ecole')
  school=match(r'<section[^>]*id="'+about_id+r'"[^>]*>(.*?)</section>',s)
  data['about']=[clean(v) for v in re.findall(r'<p(?: [^>]*)?>(.*?)</p>',school,re.S) if len(clean(v))>75][:2]
  spot_id={'osmose-kite':'spots','skyfly':'ile','ksl':'services'}.get(slug,'spot')
  spot=match(r'<section[^>]*id="'+spot_id+r'"[^>]*>(.*?)</section>',s)
  data['spot']=clean(match(r'<p class="lead"[^>]*>(.*?)</p>',spot))
  data['spotFeatures']=[clean(v) for v in re.findall(r'<li>(.*?)</li>',spot,re.S)][:4]
  data['steps']=[{'title':clean(t),'body':clean(b)} for t,b in re.findall(r'<div class="tl-body"><h3>(.*?)</h3><p>(.*?)</p>',s,re.S)]
  if not data['steps'] and slug=='coriolis':
   seance=match(r'<section[^>]*id="seance"[^>]*>(.*?)</section>',s)
   data['steps']=[{'title':re.sub(r'^\d+\s*[·.]\s*','',clean(t)),'body':clean(b)} for t,b in re.findall(r'<figcaption[^>]*><b>(.*?)</b><br\s*/?><span[^>]*>(.*?)</span></figcaption>',seance,re.S)]
  data['meta']=clean(match(r'<meta name="description" content="([^\"]+)"',s))
  result[slug][lang]=data
Path('design/original-content.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('Archived content:',len(result),'schools,',sum(len(s) for s in result.values()),'language pages')
