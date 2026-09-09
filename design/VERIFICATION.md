# Redesign verification — 9 September 2026

Production build: PASS (`npm run build`).

- 42 pages: collection index plus 41 school/language pages.
- 10 distinct school identities; 11 generated hero images and 11 smaller variants.
- 152 localized course entries, with course lists, FAQs and school information present for every school/language combination.
- 42 pages checked in Chrome at 1440px and 390px: headlines render, all images load, section targets exist, no horizontal overflow, Three.js canvas initialized.
- Hero typography and action/footer spacing also checked at 320, 390, 768, 1024 and 1440px.
- 44 unique internal destinations resolve to generated files.
- Filters return 10 schools, 6 foil schools, and 5 beginner schools as appropriate.
- School finder recommendations, interactive map selection, course dialogs, official booking links and FAQs: PASS.
- Mobile navigation and language routes, including the Dutch-to-English next-school fallback: PASS.
- Motion preference persists. System reduced-motion preference: PASS.
- Without WebGL, the static hero image and content remain usable: PASS.
- No JavaScript errors or failed same-site resource requests in the production browser audit.
- Source whitespace check and credential-pattern scan: PASS. Bundled third-party shader strings retain their upstream whitespace.

Review screenshots and detailed browser results are stored locally in `.verification/` and intentionally excluded from the published website. Reproduce with `design/audit.cjs`, `design/layout-audit.cjs` and `design/preview-check.cjs` using the workspace-provided Playwright runtime.

School information is preserved from the original showcase; the redesign is not a fresh verification of current school prices, insurance terms, or availability. Every school page directs visitors to confirm these with the school and clearly identifies the imagery as AI-generated mood imagery.
