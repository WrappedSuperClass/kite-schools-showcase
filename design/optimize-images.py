from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
out=Path('site/public/images');out.mkdir(parents=True,exist_ok=True)
paths=list(Path('output/imagegen').glob('*.webp'))
for p in paths:
 im=Image.open(p).convert('RGB')
 im.save(out/p.name,'WEBP',quality=86,method=6)
 small=im.copy();small.thumbnail((800,800));small.save(out/(p.stem+'-sm.webp'),'WEBP',quality=80,method=6)
thumbs=[]
for p in paths:
 tile=Image.new('RGB',(420,270),'#f5f3eb');tile.paste(ImageOps.fit(Image.open(p),(420,236)),(0,0));ImageDraw.Draw(tile).text((12,246),p.stem,fill='#203d39');thumbs.append(tile)
if thumbs:
 sheet=Image.new('RGB',(1260,270*((len(thumbs)+2)//3)),'#f5f3eb')
 for i,t in enumerate(thumbs):sheet.paste(t,((i%3)*420,(i//3)*270))
 sheet.save('output/imagegen/contact-sheet.jpg',quality=85)
print('Optimized',len(paths),'hero images and mobile sizes')
