// Writes sitemap.xml from what `sapper export` actually produced.
// Deps: node builtins. Run after export — deriving the sitemap from the exported files
// rather than from the route table means it cannot drift out of sync with the real site.

import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://sacred-traditions.org';
const ROOT = new URL('..', import.meta.url).pathname;
const EXPORT_DIR = join(ROOT, '__sapper__', 'export');

// Pages that exist but should not be advertised to search engines.
const EXCLUDE = [/^jsonlinks$/, /^admin$/, /^courses\/detail$/];

if (!existsSync(EXPORT_DIR)) {
  console.error('sitemap: no export at ' + EXPORT_DIR + ' — run `sapper export` first');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { walk(full); continue; }
    if (entry !== 'index.html') continue;
    const rel = relative(EXPORT_DIR, full).replace(/\\/g, '/').replace(/\/?index\.html$/, '');
    if (EXCLUDE.some((re) => re.test(rel))) continue;
    pages.push(rel);
  }
})(EXPORT_DIR);

pages.sort((a, b) => a.localeCompare(b));

const urls = pages
  .map((p) => `  <url>\n    <loc>${SITE}/${p}${p ? '/' : ''}</loc>\n  </url>`)
  .join('\n');

writeFileSync(
  join(EXPORT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`sitemap: ${pages.length} urls -> __sapper__/export/sitemap.xml`);
