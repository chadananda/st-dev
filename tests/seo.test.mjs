// Guards the head metadata that is easy to delete by accident. Deps: node:test only.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const read = (p) => readFileSync(p, 'utf8');

test('template declares a language', () => {
  assert.match(read('src/template.html'), /<html lang="[a-z]{2}"/i);
});

test('layout emits site-wide structured data', () => {
  const s = read('src/routes/_layout.svelte');
  assert.ok(s.includes('application/ld+json'), 'layout should emit a JSON-LD block');
  assert.ok(s.includes("'@type': 'WebSite'"), 'JSON-LD should describe the site');
});

test('robots.txt points at the sitemap and hides the crawler seed', () => {
  const s = read('static/robots.txt');
  assert.match(s, /^Sitemap: https:\/\/sacred-traditions\.org\/sitemap\.xml$/m);
  assert.match(s, /^Disallow: \/jsonlinks$/m);
});

test('every reader-facing route sets a title', () => {
  // Either via <Seo title=...> or its own <svelte:head><title>.
  const skip = new Set(['_layout.svelte', '_error.svelte']);
  const offenders = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!entry.endsWith('.svelte') || skip.has(entry)) continue;
      const s = read(full);
      // <Content> sets the title for markdown-backed pages, so delegating to it counts.
      const hasTitle = /<Seo\b[\s\S]*?title=/.test(s) || /<svelte:head>[\s\S]*?<title>/.test(s) || /<Content\b/.test(s);
      if (!hasTitle) offenders.push(full);
    }
  })('src/routes');
  assert.deepEqual(offenders, [], 'routes with no <title>');
});

test('Seo component emits the full tag set', () => {
  const s = read('src/components/Seo.svelte');
  for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'rel="canonical"']) {
    assert.ok(s.includes(tag), `Seo.svelte should emit ${tag}`);
  }
});
