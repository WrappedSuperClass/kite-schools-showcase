# Source correction verification — 9 September 2026

Production build: PASS (`npm run build`). Pages deployment target: repository root on **gh-pages**.

## Source review and coverage

All ten schools were checked against their official public pages. The factual content is now maintained in `design/content/`, with official source URLs and the review date rendered on every school page. The legacy extraction is no longer a build input. `design/CONTENT-AUDIT.md` contains the correction table and historical audit.

- 41 localized school pages: French, English, German and Spanish for all ten schools, plus Dutch for SkyFly.
- 56 course/service entries across the ten schools; 232 localized entries. Every entry includes a source and its correct booking handoff.
- School-specific practical facts, published prices, arrival guidance, insurance/deposit instructions, multiple contacts and official resource links.
- Ten restored archive photographs, distinguished from AI-generated hero/spot imagery.
- Seven verified email contacts support an enquiry composer (28 localized forms), which prepares an email draft and offers text to copy.
- Schools with a verified official calendar/form/portal link directly to that existing process. Tendance private lessons link to telephone booking. Chinook's equipment offer links to the shop.
- The finder matches level within a discipline: beginner kite plus advanced foil does not qualify a school for beginner-foil recommendations.

## Browser verification

Chrome with Playwright, using the production preview under `/kite-schools-showcase/`:

- **42 routes PASS:** rendered headlines, all images loaded, working section anchors, no horizontal overflow at 1440px and 390px, Three.js initialized.
- **All 232 course dialogs PASS:** details, official source and correct booking target; the telephone-only private lesson and Chinook shop exceptions checked independently.
- **All 41 school pages PASS:** review date, official sources, course counts, primary telephone and booking URLs, correct presence/absence of verified-email composer and dated-price notice.
- KSL's nine-person roster and both contact pairs; SkyFly's Port Adhoc arrival guidance; Osmose's €60 deposit; Akila's official WhatsApp; Chinook's 2024 qualification: PASS.
- Filters: eight foil schools, nine beginner schools and ten schools in total. Beginner-foil finder returns three suitable schools.
- Interactive locator, FAQ, course-dialog close, mobile menu and Dutch next-school fallback: PASS.
- Motion preference persistence, system reduced motion, usable image/content fallback without WebGL: PASS.
- Email draft preserves multiline content and literal special characters; copy fallback appears. No email, form submission, reservation or payment was sent to a school.
- **Zero JavaScript errors and zero failed same-site resource requests.**
- 36 additional practical/contact screenshots at 1440, 390 and 320px, plus expanded price-reference and email-form screenshots. No horizontal overflow. Representative desktop/mobile sections visually reviewed.
- Source whitespace check and credential-pattern scan: PASS.

Local evidence is saved under `.verification/` and excluded from publishing. Main repeatable checks: `design/audit.cjs` with `design/content-checks.cjs`. Playwright comes from the existing workspace runtime; no dependency was installed for this correction.

## Explicit limits

This checks fidelity to the schools' published information, not private confirmation by the schools. Addicted2kite and Coriolis publish tariff tables dated **2022**, so their historical figures are labelled and current prices require enquiry. Chinook's located school-specific notice is dated **2024**. Narbonne Kite Passion has conflicting street numbers/season dates, and SkyFly's older offers conflict with its 2026 arrival news; those conflicts are explained rather than silently resolved by guessing.

NKP's Amelia and Akila's Activiteez inventory/checkout did not fully render during source inspection. Their official booking entry points and phone fallbacks are provided, but completed booking/payment functionality is not claimed as verified. A KSL contact form was observed; no live date selector was verified on the inspected route. Official map/weather pages remain external links, not embedded live widgets.
