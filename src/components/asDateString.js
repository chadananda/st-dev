// Normalise a front-matter pubdate to a plain "YYYY-MM-DD" string.
// Deps: none. Shared by getContent.js and routes/articles/_articles.js.
//
// YAML libraries disagree about unquoted dates: js-yaml 3 (which gray-matter still bundles)
// resolves `pubdate: 2016-03-11` to a Date at UTC midnight, js-yaml 4+ leaves it a string.
// Handing that Date to moment reinterprets it in local time, so west of UTC every article
// published one day early -- the live site serves /articles/2016-03-10_essay-on-the-trinity
// for an article whose front matter and filename both say 2016-03-11. A Date also breaks
// the `pubdate <= today` listing filter, which compares strings: "Fri Mar 11 2016 ..." is
// never <= "2026-09-10", so the entry silently vanishes from its index.
//
// Read the UTC calendar date explicitly so behaviour depends on the front matter alone --
// not on the YAML version, and not on the builder's timezone.
export default function asDateString(pubdate) {
  if (pubdate instanceof Date && !isNaN(pubdate)) {
    return pubdate.toISOString().split('T')[0];
  }
  return pubdate == null ? '' : String(pubdate).trim();
}
