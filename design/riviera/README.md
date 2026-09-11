# Riviera sites

Four isolated French school proposals. Build from repository root with `node design/riviera/build.mjs` using the already-installed dependencies (Three.js 0.186.0, Vite 8.2.2). No package installation or upgrade performed.

- `schools.mjs`: visitor data and concise copy.
- `../../riviera-site/src`: shared presentation, responsive themes, local booking flow, Three.js sea shader.
- `../../riviera-images`: four final 2048×1152 WebP assets, generated with gpt-image-2 via the explicitly authorized fallback CLI. Originals also saved under ignored `output/imagegen/riviera` during generation.
- `image-prompts.jsonl`: exact final prompt set and generation settings.
- `SOURCE-AUDIT.md`: current evidence, exclusions and production boundaries.

The build only writes `riviera-site`, `riviera-dist`, four school directories and `riviera-assets`. It never invokes the old renderer. Generated image assets are already committed in `riviera-images`. Root `index.html` remains blank, and old school sites/assets are untouched. Do not publish the unrelated pending font-loading commit from the main workspace.

The forms are non-operational demos. Real calendars, booking delivery, payments, current stock and owner-approved photographs must be connected during finalization with the school. No customer details are transmitted or persisted by the form.
