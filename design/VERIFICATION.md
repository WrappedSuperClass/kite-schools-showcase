# Independent school presentation — 10 September 2026

Production target: GitHub Pages, repository root on **gh-pages**.

## What changed

- Removed the collection landing page, VENT branding, school numbering, next-school links and cross-school navigation. Root opens Kitepulsion; the ten school URLs remain independent.
- Removed visitor-facing source citations, review dates, old website URLs and external registration/booking links. Underlying research remains in `design/content/` for maintenance.
- Reduced static text by approximately 52% across 41 language pages, counting collapsed content too. Each page starts with three offers; further offers, practical details, team and direct contacts expand on demand.
- Retained the school-specific themes, images, Three.js enhancement, verified practical facts and all 56 course/service entries (232 localized entries).
- Old dated tariffs remain in research only. The presentation uses current published figures where available and “on request” otherwise.
- Added a styled three-step on-page booking demo to every school: preferred session/date → visitor details → review. Dates represent preferences, not real inventory. Relevant equipment fields remain available for Addicted2kite and Coriolis.
- Explicit demo note before interaction and at completion. No backend call, email, reservation, payment or persistent storage. Personal fields are cleared after the demo.

## Verification

`design/standalone-audit.cjs`, Chrome with the existing workspace Playwright runtime:

- All 42 routes load with intact images, working anchors and exactly three featured offers.
- All school/language booking flows tested through selection, date navigation, required-field validation, contact details, review, back, completion and reset.
- Every offer selects the on-page form; course-dialog booking also remains on the page.
- No rendered source/collection blocks, old-site HTTP links, competing-school links or outbound form submissions.
- Language menus stay within their school. The root uses Kitepulsion's own language routes.
- Past dates disabled; calendar month controls and selected date consistent. SkyFly family option limits the participant field to four; resetting restores the ordinary field limit.
- All routes checked at 320, 390, 768, 1024 and 1440px for horizontal overflow and clipped headlines. Long German offer names wrap without forcing cards wider than the screen.
- Mobile menus, booking-bar visibility while using the form, and menu closure when resizing to desktop checked.
- Three.js initialization checked. Reduced-motion mode used throughout the form/layout checks.
- Zero JavaScript errors, failed same-site resources or non-GET requests in the audit.
- Representative Akila, Kitepulsion, Narbonne Kite Passion, SkyFly, Coriolis and KSL offer/booking screens inspected at desktop/mobile sizes. Browser-use visitor check independently confirmed course selection, preferred date and details step.

Local logs, text counts and screenshots are under `.verification/standalone/` and are excluded from publishing. No new package was installed. Source whitespace checked before publication.

## Launch boundary

These are owner-facing design proposals with functional local demonstrations. Real booking operations still require the owner to connect their provider and approve current capacity, prices and policies. The demo never pretends that a booking was sent or confirmed. Existing phone/email/WhatsApp contacts are retained in the contact disclosure, and map directions remain available inside the meeting-point disclosure.

For an embedded production option, Cal.com offers a free individual plan and Teams at $12 per user/month billed annually (checked 10 September 2026): [pricing](https://cal.com/pricing), [embed documentation](https://cal.com/embed).
