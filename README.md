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
- `design/original-content.json`: school descriptions, course information, FAQ and contact details preserved from the previous showcase. This is the content source. The extraction helper reads the original 395723b Git revision so it cannot accidentally ingest the redesigned pages.
- `design/build.mjs`: page templates and production publishing.
- `site/src/style.css`: responsive design and ten school identities.
- `site/src/app.js`: filters, school finder, interactive locator, course dialogs, mobile menu and motion settings.
- `site/src/scene.js`: Three.js ocean and wind image refraction, pointer response, viewport/visibility pausing, and static-image fallback.
- `site/public/images/`: final generated photography and smaller mobile assets.
- `design/image-prompts.jsonl`: the exact eleven image prompts.

## Images and content

Eleven original mood images were generated through the OpenAI Images API using `gpt-image-2`, high quality, 2048 × 1152. Final web assets are compressed WebP with 800px variants. The image-generation skill’s bundled CLI was used; no API credentials are stored in this repository or in browser code.

The imagery is conceptual, not documentary photography of the schools, their staff, or exact locations. This is disclosed on each website. Course information is inherited from the earlier showcase and marked as indicative; prices, availability, insurance and booking must be confirmed with the school. Links go directly to each school’s existing official site, phone number or email. This showcase does not process bookings or payments.

## Verification

`design/audit.cjs` checks all routes, loaded images, desktop/mobile overflow, Three.js rendering, filters, the school finder, locator, course dialogs, FAQ, mobile navigation, language routing, reduced motion and fallback without WebGL. `design/preview-check.cjs` produces screenshots of the index and all ten schools at desktop and mobile sizes. Both use Playwright available in the local workspace runtime; it is not a production dependency.

Dependencies were checked against current releases and official documentation on 9 September 2026: Three.js 0.186.0 and Vite 8.2.2. These projects use stable releases rather than an LTS-labelled release line. Node 22.22.2 was used locally.

## Hosted alternative considered

Framer Basic is a good hosted visual-editor alternative, listed at $10/month when billed yearly on https://www.framer.com/pricing (checked 9 September 2026). This implementation retains the requested GitHub Pages hosting and custom Three.js control.
