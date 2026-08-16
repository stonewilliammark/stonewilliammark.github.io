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
│   ├── base.njk           <head>, meta tags, nav
│   ├── case-study.njk     the case study page template
│   └── partials/          nav, work card, icons
├── assets/css/styles.css  the whole design system
├── assets/js/app.js       topic filter + carousel (progressive enhancement only)
├── img/<slug>/            case study images
└── assets/William-Stone-CV.pdf
```

`eleventy.config.js` holds the collections, the `{% figure %}` shortcode, reading-time calculation
and the frontmatter validation.

## Design source

Figma — [Portfolio, Dev handover page](https://www.figma.com/design/PiGt0QiXiX6ncBKSiFVF4X/Portfolio?node-id=2227-7925).
Colour, type and spacing tokens are transcribed at the top of `styles.css` with the node reference.

**The landing page is not from that frame.** The hero, nav and About card were re-derived from the
revised frame [`2230:13514`](https://www.figma.com/design/PiGt0QiXiX6ncBKSiFVF4X/Portfolio?node-id=2230-13514)
in commit `38fdd82`. Four `2230:*` nodes are cited in the code. Open `2227:7925` for everything except
the home page.

Deliberate departures from the mocks:

- **No contact form, and no footer** (2026-08-11). The "Want to connect?" section and the footer were
  both removed from the design. Contact lives in the nav CTA, the hero, and the About card.
- **Prose capped at ~68 characters and centred** (2026-08-16). The mocks ran body text the full 1336px
  container, which measured ~129 characters per line at 1440px. `--measure` (720px) caps prose and
  headings; figures keep the full container width. An earlier cap (`0cb8589`) was reverted because
  left-aligned prose beside full-width figures left 536px of dead space — centring the column is the fix.
- **Work cards at 16:9** (2026-08-16), not the mocks' 620/472. The card takes its height from the panel,
  and at 4:3 the text column left ~114px of dead space. Below 640px the mocks' 4:3 crop returns.
- **No "Skills" nav item.** The mocks had the link but no such page was ever designed.
- **Nav CTA is a plain dark button** (`333757e`). The LinkedIn-blue stroke in frame `2230:13710` was
  judged an accident in the file and is not applied.
- **Card title/deck fill their column.** The 462px/419px widths in `2227:7958` are hug-to-content
  artefacts of hard-wrapped text, not max-widths.
- **Topic names normalised** by hand in frontmatter, so the filter doesn't show near-duplicate chips.
  This is a content convention — there is no normalisation step in `eleventy.config.js`.

## The CV download

Live at `src/assets/William-Stone-CV.pdf`, from the phone-free `v8_2026-08_web-safe` resume.
Verified before publishing: no phone number, contact line is `Sydney, NSW | email` only, and
no restructure or team-size language.

To replace it, drop a new PDF at that path and push. The `"cvReady"` flag in
`src/_data/site.json` still gates both CV buttons — set it to `false` to hide them rather
than ever shipping a link that 404s.

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
