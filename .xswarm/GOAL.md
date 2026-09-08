<!-- PROPOSED by goal-propose.py. Inferred from repo evidence, not
     confirmed by Chad. Raise at the next planning meeting. -->

# Goal (PROPOSED)

## What this is for

The people this actually serves are the handful of adults who sign up for a Dawn-Breakers Challenge study retreat and need the workbook, plus the smaller group of collaborators (David Langness, Peter Terry) who need to post a talk, a course, or a new workbook edition without touching a build. Everything else on the site is either dead or has moved: the Ocean 2.0 landing page points at `ocean-download.dev2.us`, which no longer resolves, while Ocean itself is alive at oceanlibrary.com; the homepage still reads "The Dawn-Breakers Challenge - 2021 ... according Covid-19, not this year!!"; the last content commit that wasn't a workbook PDF upload was March 2021. The change for that user is that they land on a page that describes a retreat that is actually happening, download a current workbook, and get a talks archive that isn't fed by a Google Sheet nobody has opened in four years. I am inferring the retreat audience — the repo shows 32MB of 2019 retreat photos and workbook PDFs re-uploaded in 2023, which is the only signal of ongoing human activity here.

## What success looks like

sacred-traditions.org is a small, boring, maintained site with exactly one live purpose: the Dawn-Breakers Challenge. It builds on current Node without pinned node-sass 4 / Sapper 0.28. Every download link on it resolves. Ocean is a one-line link to oceanlibrary.com, not a hosted product page with per-OS installer detection. The talks archive either has a data source Chad can name and reach, or it is gone. A collaborator can publish a retreat date without asking Chad to run a build. Six months after shipping, no page on the site names a year in the past.

## What would falsify this

No Dawn-Breakers Challenge retreat has been held since 2019, and the workbook has been downloaded fewer than ~50 times in the past 12 months. If the S3/CloudFront logs say that, then there is no program to be a front door for, the 2023 workbook uploads were archival rather than operational, and the correct goal is to export the workbook and photos somewhere permanent and redirect the domain to oceanlibrary.com. Second falsifier, weaker but cheaper to check: the PayPal course checkout has processed zero orders since 2020 — that kills any version of this goal that keeps commerce.

## Explicitly not the goal

Rebuilding this as a general interfaith content platform on the Astro/Cloudflare/D1 standard stack. The pull is obvious — the codebase is a dead framework, the content is markdown, and a rewrite feels like progress. But a rewrite converts a 17-course, 34-markdown-file, one-real-audience site into a platform that then needs content to justify itself, and the content stopped in 2021. Also not the goal: search or discovery over sacred texts. That is siftersearch.com, which is described as an AI-powered interfaith library search over sacred texts and scholarly works — the same subject matter, a different product. These two overlap enough that "make sacred-traditions.org a better place to explore sacred literature" would put them in direct competition with each other.

## Where I am guessing

- **That the Dawn-Breakers Challenge is still a live program.** Everything above hangs on this. Evidence is two workbook uploads (2023-05, 2023-10) and nothing else since 2021. If it's dormant, the whole goal inverts to archive-and-redirect.
- **That Ocean should leave this site entirely.** oceanlibrary.com returns 200; the installer host here does not resolve. But Chad may deliberately keep sacred-traditions.org as an interfaith-framed on-ramp to Ocean for an audience oceanlibrary.com doesn't address.
- **That the courses/ section and PayPal checkout are abandoned.** 17 course files, all 2020-era presenters. I did not verify a single transaction. If courses still sell, the goal needs a revenue leg and this draft is wrong about scope.
- **That the webinars Google Sheet (`1nlsYAML...i4iYw`) is stale or gone.** The archive route reads it live with an hourly cache. I didn't fetch it. If someone is still maintaining that sheet, the archive is the site's living part, not the workbook, and the goal should center there instead.
- **That collaborator self-service matters.** Inferred from three named contributors in package.json and commits like "temporarily removed language filter drop-down ... since I don't have other religions yet." If Chad is the only person who will ever touch this again, drop the CMS-shaped requirement and the goal gets much smaller.
- **That the Italian translations (`_it.md` on every article) were an experiment, not a commitment.** If there's an Italian audience, "no i18n" is the wrong default for a rebuild.
