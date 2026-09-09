# VENT — The Kite School Collection

A complete redesign of the showcase and all ten school websites, including the existing French, English, German, Spanish, and SkyFly Dutch routes (42 pages total).

**Live:** https://wrappedsuperclass.github.io/kite-schools-showcase/

**Hosting:** GitHub Pages serves the repository root on **`gh-pages`**. This project does not use Railway. Publishing to `main` will not update the site.

## Local development

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173/kite-schools-showcase/.

## Build and publish

```sh
npm run build
npm run preview
```

The build generates all 42 source HTML files, builds with Vite, then copies the production HTML, shared assets, and images into the repository root. Preview: http://127.0.0.1:4174/kite-schools-showcase/.

Review and commit the generated files alongside the sources on `gh-pages`, then push that branch. `.nojekyll` preserves the generated assets. The existing Git history retains the earlier design.

## Editing

- `design/schools.mjs`: the ten visual identities, locations, themes, headlines and official website links.
- `design/locales.mjs`: translated interface text.
- `design/content/`: manually reviewed, translated school facts, prices, contacts, booking routes and their official source URLs.
- `design/verified-content.mjs`: assembles the reviewed content and enforces complete translations. Update its review date only after actually reviewing the official sources.
- `design/original-content.json`: historical snapshot of the previous showcase, retained for comparison; no longer a build input.
- `design/build.mjs`: page templates and production publishing.
- `site/src/style.css`: responsive design and ten school identities.
- `site/src/app.js`: filters, school finder, interactive locator, course dialogs, mobile menu and motion settings.
- `site/src/scene.js`: Three.js ocean and wind image refraction, pointer response, viewport/visibility pausing, and static-image fallback.
- `site/public/images/`: final generated photography and smaller mobile assets.
- `site/public/school-photos/`: restored photographs from the earlier showcase, identified as archive photographs.
- `design/image-prompts.jsonl`: the exact eleven image prompts.

## Images and content

Eleven original mood images were generated through the OpenAI Images API using `gpt-image-2`, high quality, 2048 × 1152. Final web assets are compressed WebP with 800px variants. The image-generation skill’s bundled CLI was used; no API credentials are stored in this repository or in browser code.

The generated hero/spot imagery is conceptual, not documentary photography of the schools, their staff, or exact locations. It is disclosed on each website and distinguished from the restored archive photographs. School information was reviewed against official pages on 9 September 2026, with visible source links and specific treatment of conflicting or dated information. Addicted2kite and Coriolis publish 2022 price tables: these are explicitly historical references, not current quotes. Chinook's located school notice is dated 2024. Availability, the final price and insurance cover remain the school's responsibility.

Booking links lead to the actual official calendars, registration forms or school contacts. Tendance's private lessons use telephone booking. Akila's centre page separates Pôle Mer and Pôle Étang. Seven schools with verified public email addresses also have a composer that opens an email draft, with a copy fallback. This showcase does not process bookings or payments or send email. Read `design/CONTENT-AUDIT.md` for the school-by-school correction table and historical audit.

## Verification

`design/audit.cjs` and `design/content-checks.cjs` check all routes, loaded images, desktop/mobile overflow, Three.js rendering, filters, the school finder, locator, all course dialogs, official booking destinations, verified contacts, source dates, dated-price notices, FAQ, email draft composition, mobile navigation, language routing, reduced motion and fallback without WebGL. `design/preview-check.cjs` produces screenshots of the index and all ten schools at desktop and mobile sizes. They use Playwright available in the local workspace runtime; it is not a production dependency.

Dependencies were checked against current releases and official documentation on 9 September 2026: Three.js 0.186.0 and Vite 8.2.2. These projects use stable releases rather than an LTS-labelled release line. Node 22.22.2 was used locally.

## Hosted alternative considered

Framer Basic is a good hosted visual-editor alternative, listed at $10/month when billed yearly on https://www.framer.com/pricing (checked 9 September 2026). This implementation retains the requested GitHub Pages hosting and custom Three.js control.
