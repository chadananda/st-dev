// Regression net for the content pipeline. Deps: node:test, gray-matter (already present).
// Runs in ~1s with no build, so the quality gate can run it at the end of every turn.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import asDateString from '../src/components/asDateString.js';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const ARTICLES = 'src/content/articles';

test('asDateString takes the UTC calendar date from a Date, not the local one', () => {
  // js-yaml 3 hands us midnight UTC. Read in a timezone west of UTC, the local date is the
  // day before -- the bug that shifted every article slug back one day.
  assert.equal(asDateString(new Date('2016-03-11T00:00:00Z')), '2016-03-11');
});

test('asDateString passes strings through untouched', () => {
  assert.equal(asDateString('2016-03-11'), '2016-03-11');
  assert.equal(asDateString('  2016-03-11  '), '2016-03-11');
});

test('asDateString yields a falsy string for missing or invalid dates', () => {
  assert.equal(asDateString(undefined), '');
  assert.equal(asDateString(null), '');
  assert.equal(asDateString(new Date('nonsense')), 'Invalid Date');
});

test('gray-matter still yields a Date, so the coercion is still load-bearing', () => {
  // If this ever fails, gray-matter has moved to js-yaml 4+ and the guard could be revisited.
  const { data } = matter('---\npubdate: 2016-03-11\n---\nbody');
  assert.ok(data.pubdate instanceof Date, 'gray-matter no longer returns a Date for an unquoted YAML date');
});

test('a normalised pubdate survives the "published already?" listing filter', () => {
  // getContent filters with `pubdate <= today` as strings. A raw Date coerces to
  // "Fri Mar 11 2016 ..." which is never <= "2026-09-10", silently hiding the entry.
  const { data } = matter('---\npubdate: 2016-03-11\n---\nbody');
  assert.equal(data.pubdate <= '2026-09-10', false, 'precondition: a raw Date fails the filter');
  assert.equal(asDateString(data.pubdate) <= '2026-09-10', true);
});

test('every article resolves to a valid publication date', () => {
  // The pipeline takes the front-matter pubdate, falling back to the filename prefix; the
  // resolved date becomes the slug, and therefore the article's public URL. What matters is
  // that one of the two is a usable date -- not that they agree (they are allowed to differ,
  // and front matter deliberately wins).
  assert.ok(existsSync(ARTICLES), `${ARTICLES} should exist`);
  let checked = 0;
  for (const dir of readdirSync(ARTICLES, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const file of readdirSync(join(ARTICLES, dir.name))) {
      if (!file.endsWith('.md')) continue;
      const { data } = matter(readFileSync(join(ARTICLES, dir.name, file), 'utf8'));
      const resolved = asDateString(data.pubdate) || file.split('_')[0].trim();
      assert.match(resolved, /^\d{4}-\d{2}-\d{2}$/,
        `${file}: no usable publication date in front matter or filename — the slug is built from this`);
      const year = Number(resolved.slice(0, 4));
      assert.ok(year >= 2015 && year <= 2500, `${file}: publication year ${year} is out of range`);
      checked++;
    }
  }
  assert.ok(checked > 0, 'expected to check at least one article');
});
