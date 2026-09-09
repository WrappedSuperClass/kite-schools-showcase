# Dependency and asset references

Checked 9 September 2026 before installing and using dependencies.

- Three.js: stable 0.186.0, release r186. No LTS-labelled line. https://github.com/mrdoob/three.js/releases and https://threejs.org/manual/en/installation.html . Shader usage: https://threejs.org/docs/pages/ShaderMaterial.html .
- Vite: stable 8.2.2. Support policy: https://vite.dev/releases . Usage: https://vite.dev/guide/ and https://vite.dev/guide/build.html . Vite 8's `manualChunks` callback form is used for the deferred Three.js bundle.
- OpenAI Python SDK: stable 3.10.0. https://pypi.org/project/openai/ and https://github.com/openai/openai-python . Used only by the image skill CLI, in the ignored local environment.
- Pillow: stable 12.3.0. https://pypi.org/project/pillow/ and https://pillow.readthedocs.io/en/stable/handbook/tutorial.html . Used only for WebP optimization and review contact sheets, in the ignored local environment.
- GPT Image 2 API: https://developers.openai.com/api/docs/models/gpt-image-2 and https://developers.openai.com/api/docs/guides/image-generation .
- Browser automation uses Playwright already provided by the workspace runtime; no package was installed for the site.

The frontend requires no API keys, booking backend, external 3D CDN or paid hosting service. The only external frontend asset service is Google Fonts. The Three.js renderer is loaded after page content and pauses when out of view, while the document is hidden, or when motion is disabled.

Hosted builder alternative considered: Framer Basic, $10/month billed yearly. https://www.framer.com/pricing . The custom build retains the requested existing GitHub Pages hosting.
