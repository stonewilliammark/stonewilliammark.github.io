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
- **One content width, 1040px** (2026-08-18). The mocks ran everything at 1336px. `--container` now
  carries the nav pill, hero, every figure, every card, the section heads, the back row, the next-case
  block and the all-work list — one column at x=200 on a 1440px viewport. Prose caps at `--measure`
  (820px, ~68 characters) and sits 110px inside that. A single shared width for text and images is not
  achievable: 1040px at 68 characters needs ~28px body, and `--step-h2` is capped at 32px, so the
  heading hierarchy would collapse. Two earlier attempts are recorded in git — a three-tier system
  (2026-08-17) that read as three unrelated systems, and prose-only capping (2026-08-16) that left a
  308px step in the left edge.
  **Do not split `--container` into a separate token.** The carousel track reads it directly for
  `padding-inline` / `scroll-padding-inline`, and slide width is only algebraically identical to
  container content because both derive from it. `app.js` trusts the computed padding.
- **A clean top block, then one centred reading column** (2026-08-18, owner decision against Figma
  [`2287:8348`](https://www.figma.com/design/PiGt0QiXiX6ncBKSiFVF4X/Portfolio?node-id=2287-8348)). The
  nav pill, Back pill, **title** and hero all take the full 1040px content width, so the top of the page
  is four elements on one edge. Everything textual below — deck, topic pills, headings, paragraphs and
  figure captions — sits in the centred 820px reading column, 110px inside that edge. Figures break back
  out to the full width. At a 1512px viewport: content column 236→1276, reading column 346→1166. Two
  edges, entered once.
  **The title width was the actual defect, not the centring.** Capped at `--measure` and centred it made
  the top read 236 → 236 → **346** → 236 → 346 — the alternation the owner reported as "the heading and
  the back button and the image all jumping". A title conventionally runs wider than body copy anyway.
  **Left-aligning the prose so the whole page shared one edge has been tried live twice and rejected on
  sight both times** — `0cb8589` (2026-08-11, 1336px container, 536px of trailing space) and `d099647`
  (2026-08-18, 1040px container, 220px). Narrowing the rag from 536 to 220 was not the fix; an
  asymmetric right edge reads as broken at either size. **Do not left-align `.case-head > *` or
  `.case-body > *` a third time.**
- **The case-study title takes the full content width and uses `text-wrap: pretty`**, not the reading
  measure and not `balance`. At 820px it wrapped to three lines and `balance` chose to split "AI-driven"
  at its hyphen. The home hero `h1` and the section titles keep `balance` — they are short centred
  strings where it is right.
- **Body type reaches its designed 24px** (2026-08-18). `--step-body` was the only type token that
  never got there — its clamp maxed at 24px but needed a 2377px viewport, so it rendered 20.72px at
  1440 while every heading was saturated from ~1000px. Heading-to-body contrast fell as the viewport
  widened, which is why headings looked squashed into the measure. Consequently `.case-body h3` is
  1.75rem (a 1.25rem h3 would be smaller than its own paragraphs), and card title/deck maxima dropped
  32→28 and 24→20 for the narrower 472px card columns.
- **Card images at their native 1240/944 ratio** (2026-08-18), not the mocks' fixed panel. 16:9
  (2026-08-16) cut card height but cropped 26% of every image. At the 1040px container the columns are
  472px, so the panel at native ratio is 359px and the wrapped text column ~356px — they meet, so the
  height saving survives with zero crop. **Do not use `object-fit: contain` instead:** the source is a
  taller ratio than any wider box so it gives side bars, and the exports have opaque light corners
  baked in (~40px per edge) that any shallow crop exposes as notches.
- **No "Skills" nav item.** The mocks had the link but no such page was ever designed.
- **The nav pill spans the content width**, as the mocks have it. It briefly hugged and centred
  (2026-08-17) to escape 1336px of mostly-empty glass, but at ~450px it read as too small — the
  container width was the real problem. At 1040px the mocks' original reasoning holds again.
- **The nav adapts over dark artwork** (2026-08-17), which the mocks do not describe. The pill is
  sticky and case-study figures are 472px of near-black, so `--material` resolved to ~#3a3a3a and
  `--ink` measured **1.48:1** — a live WCAG failure across most of the scroll, not a polish item.
  `app.js` measures how much of the pill a `.panel` covers and toggles `.nav--on-dark`, flipping ink
  and tint to ~10:1 over the existing blur. Coverage thresholds are asymmetric (0.55 on / 0.25 off)
  so it holds through the 24–56px gaps between figures, and a work card's panel — which covers only
  ~46% of a centred pill — deliberately never triggers it.
- **Nav CTA is a plain dark button** (`333757e`). The LinkedIn-blue stroke in frame `2230:13710` was
  judged an accident in the file and is not applied. It inverts to white under `.nav--on-dark`.
- **Case-study body text is ink, not the mocks' grey** (2026-08-17). Grey measured 5.0:1 across the
  entire body of every case study; muted is now reserved for the deck, meta chips and captions.
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
