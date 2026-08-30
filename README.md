# Kite Schools Showcase

Modern website redesigns for **10 kitesurf schools** on the Aude / Pyrénées-Orientales coast
(Leucate, La Franqui, Gruissan, Narbonne-Plage, Sigean, Port Leucate / Le Barcarès) — all within
~1.5–2 h drive of Toulouse.

Each site is a fully static, single-page redesign proposal built from the school's public
information (courses, prices, spots, contacts), with:

- a distinct visual identity per school (palette, typography, hero animation)
- a live wind widget (Open-Meteo, per-spot coordinates)
- scroll-reveal animations, marquee, pricing cards, OSM map embed, mailto contact form
- a hidden **Three.js easter egg**: type `VENT` (or click the logo 5×) on any site to fly a 3D kite
  over animated water — mouse steers the kite, `ESC` exits

## Structure

```
server.js            zero-dependency Node static server (local preview / any Node host)
sites/
  index.html         showcase hub linking all 10 sites
  shared/base.css    shared design system (themed via CSS variables per site)
  shared/app.js      shared engine: hero FX, wind widget, reveals, Three.js easter egg
  <school>/          index.html + site.css (theme) per school
```

## Run locally

```
npm start            # serves http://localhost:3000
```

## Schools

| School | Spot |
|---|---|
| Kitepulsion | Plage des Coussoules, La Franqui |
| Narbonne Kite Passion | Étang de Bages, La Nautique |
| Addicted2kite | Créneau Naturel, Narbonne-Plage |
| Osmose Kite | Coussoules Basses, La Franqui |
| Chinook Kite School | Étang de La Palme, Leucate |
| SkyFly Kiteschool | Île de la Rascasse, Port Leucate / Le Barcarès |
| Coriolis Foil School | Port Leucate |
| Tendance Kite | Port Mahon, Sigean |
| KSL Kite Surf Leucate | Plage des Coussoules, La Franqui |
| Akila Gruissan | Plage des Chalets, Gruissan |
