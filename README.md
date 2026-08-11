# stonewilliam.com

UX portfolio for William Stone. Static site, built with [Eleventy](https://www.11ty.dev/),
hosted on GitHub Pages at [stonewilliam.com](https://stonewilliam.com).

## Adding a case study — four steps

1. **Copy the template.** `cp CASE-STUDY-TEMPLATE.md src/work/my-case-study.md`
2. **Fill in the frontmatter and write the body.** Five required keys, plain markdown underneath.
   [`CASE-STUDY-TEMPLATE.md`](CASE-STUDY-TEMPLATE.md) documents every field.
3. **Drop the images** into `src/img/my-case-study/` and reference them with `{% figure %}`.
4. **Commit and push to `main`.** GitHub Actions builds and deploys; live in a few minutes.

Nothing else needs editing. The page, the home carousel card, the All-work card, the tag filter
and its counts, the "next case study" link, the sitemap and the social preview tags are all
generated from that one file.

If a required field is missing, **the build fails and names the file** rather than shipping a
broken card.

## Local development

```bash
npm install
npm start        # http://localhost:8080, live reload
npm run build    # production build into _site/
```

Node 22 or newer is recommended — that's what CI uses. On Node 20 `npm install` prints an
`EBADENGINE` warning for `@11ty/eleventy-img`; it's advisory and the build still works.

## How it fits together

```
src/
├── index.njk              home — hero, selected work, about
├── work.njk               all work + topic filter
├── work/
│   ├── work.json          shared config for every case study (layout, URL pattern)
│   └── *.md               ← one markdown file per case study. This is the content.
├── _includes/
│   ├── base.njk           <head>, meta tags, nav, footer
│   ├── case-study.njk     the case study page template
│   └── partials/          nav, footer, work card
├── assets/css/styles.css  the whole design system, ~600 lines
├── assets/js/app.js       topic filter + carousel (progressive enhancement only)
├── img/<slug>/            case study images
└── assets/William-Stone-CV.pdf
```

`eleventy.config.js` holds the collections, the `{% figure %}` shortcode, reading-time calculation
and the frontmatter validation.

## Design source

Figma — [Portfolio, Dev handover page](https://www.figma.com/design/PiGt0QiXiX6ncBKSiFVF4X/Portfolio?node-id=2227-7925).
Colour, type and spacing tokens are transcribed at the top of `styles.css` with the node reference.

Deliberate departures from the mocks, all agreed 2026-08-10:

- **No contact form.** Two routes out instead: LinkedIn, and a downloadable CV.
- **Prose capped at ~70 characters.** The mocks ran body text the full 1336px container width
  (~116 characters per line); the cap is set by `--measure`.
- **No "Skills" nav item.** The mocks had the link but no such page was ever designed.
- **Topic names normalised**, so the filter doesn't show near-duplicate chips.

## Turning on the CV download

The "Download CV" CTA is gated so a dead button never ships. To enable it:

1. Put the PDF at `src/assets/William-Stone-CV.pdf`.
2. Set `"cvReady": true` in `src/_data/site.json`.
3. Commit and push.

Until then the hero and footer fall back to LinkedIn. **The PDF must be the phone-free
version** — the public CV is intended to carry email only.

## Accessibility notes

Contrast was measured against WCAG AA for every token pair. Two needed attention:

- **Chip text** was 4.50:1 on white and 4.19:1 on the grey surface at 14px, so it missed AA.
  `--chip-text` is now a shade darker (4.99 / 4.65).
- **The brand accent `#d7a36e` measures 2.25:1 on white**, so the uppercase eyebrow using it
  fails AA (4.5:1 needed, or 3:1 as large text). It is left exactly as designed pending a
  decision — `#9c6c34` would clear AA at 4.56:1 but reads noticeably browner.

## Notes

- Vanilla CSS with custom properties — no Tailwind, no framework, no client-side rendering.
  The only JavaScript is the topic filter and the carousel, both of which degrade to a fully
  usable page when disabled.
- Fonts: SF Pro on Apple devices via `-apple-system` (zero download), self-hosted Inter
  (48KB, latin subset) everywhere else. No third-party font requests.
- **This repo is public** because GitHub Pages requires it on a free account. Only publishable
  content belongs here — drafts, transcripts and working notes stay in the project folder.
