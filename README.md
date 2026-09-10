# Independent kite school websites

Ten owner-facing school sites. Each URL contains only that school's identity, content and booking demo. There is no directory, collection brand, source-link section or link to a competing school. The root address opens Kitepulsion; use a school's own URL for its presentation.

| School | Presentation |
|---|---|
| Kitepulsion | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/kitepulsion/) |
| Narbonne Kite Passion | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/narbonne-kite-passion/) |
| Addicted2kite | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/addicted2kite/) |
| Osmose Kite | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/osmose-kite/) |
| Chinook | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/chinook/) |
| SkyFly | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/skyfly/) |
| Coriolis | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/coriolis/) |
| Tendance Kite | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/tendance-kite/) |
| KSL | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/ksl/) |
| Akila Gruissan | [Open](https://wrappedsuperclass.github.io/kite-schools-showcase/akila-gruissan/) |

FR/EN/DE/ES for every school, plus NL for SkyFly. 41 localized pages plus the default school home.

## Run and publish

`npm run dev` starts development at http://127.0.0.1:4173/kite-schools-showcase/.

`npm run build` generates the HTML, builds the assets and copies production files into the repository root. `npm run preview` serves the build at http://127.0.0.1:4174/kite-schools-showcase/.

GitHub Pages serves the repository root on **gh-pages**. Commit generated output with its sources and push that branch. Main does not publish this site.

## Editing

- `design/presentation.mjs`: short translated visitor copy, units and offer presentation.
- `design/schools.mjs`: visual identities, headlines and themes.
- `design/build.mjs`: independent school pages and embedded booking form.
- `site/src/app.js`: menus, course dialogs and motion preferences.
- `site/src/booking.js`: local three-step enquiry demonstration.
- `site/src/style.css`: responsive layout and school identities.
- `site/src/scene.js`: Three.js visual enhancement and fallback.
- `design/content/` and `design/verified-content.mjs`: the underlying source research, retained for maintenance, not rendered as citations or sent to the browser.
- `site/public/images/`: generated mood imagery. `site/public/school-photos/`: retained school photographs.

## Booking demo

Every school has its own on-page flow: session and preferred date → visitor details → review. Course buttons preselect the offer. The calendar represents date preferences, not live availability. Past dates are disabled. Each step validates its fields; going back preserves the draft. Optional equipment measurements appear for the relevant schools.

The form is explicitly labelled as a demonstration. It makes no network submission, creates no reservation, takes no payment and stores no personal details. Completion clears entered details. Real telephone, email and WhatsApp contacts remain inside the contact disclosure.

Before accepting real bookings, connect each owner's chosen provider and validate their policies, capacity, prices and availability. Cal.com is an available embedded option: individual plan free, Teams $12/user/month billed annually, checked 10 September 2026 ([pricing](https://cal.com/pricing), [embedding](https://cal.com/embed)). The current presentation intentionally uses the requested local demo.

## Content and checks

Visitor text is 52% shorter than the source-heavy version, counting all static text including collapsed content. Three featured offers appear initially; all other offers, practical details and secondary contacts expand on demand. Old 2022 prices remain in research only; the presentation uses “on request”.

Run `design/standalone-audit.cjs` with the existing workspace Playwright runtime. It exercises every school/language page, all offer selectors, the complete local form flow, dates and validation, language isolation, source-link removal, responsive layout and no-submission behaviour. `design/VERIFICATION.md` records the latest results. Earlier audits are retained as historical evidence.
