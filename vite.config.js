import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
const inputs = { main: resolve('site/index.html') };
for (const d of readdirSync('site', {withFileTypes:true})) {
  if (d.isDirectory() && !['public','src'].includes(d.name)) {
    for (const f of readdirSync(`site/${d.name}`)) if (f.endsWith('.html')) inputs[`${d.name}-${f}`] = resolve(`site/${d.name}/${f}`);
  }
}
export default defineConfig({
 root: 'site', base: '/kite-schools-showcase/',
 build: {outDir:'../site-dist',emptyOutDir:true,rollupOptions:{input:inputs,output:{manualChunks(id){if(id.includes('node_modules/three/'))return 'three';}}}},
 server:{port:4173},preview:{port:4174}
});
