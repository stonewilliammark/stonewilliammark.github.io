# Case study template

Copy this file to `src/work/<slug>.md`, fill it in, commit, push. That is the whole process —
the page, the home carousel card, the All-work card, the tag filter counts, the "next case study"
link, the sitemap entry and the social preview all generate themselves from what you write here.

**This file lives at the repo root on purpose.** It must stay outside `src/`, because Eleventy
builds every markdown file it finds in a content directory — a template sitting in `src/work/`
would publish itself as a real page.

The `<slug>` becomes the URL: `src/work/spacing-epic.md` → `stonewilliam.com/work/spacing-epic/`.
Use lowercase words separated by hyphens.

---

## Frontmatter

Everything between the `---` fences. **All five keys are required** — the build fails and names
your file if one is missing or empty, so a half-finished case study can't ship a broken card.

```yaml
---
title: "Reimagining spacing: The Quantium Design System spacing epic"
deck: "Developing a semantic spacing model to enable flexible interface density"
topics:
  - "Design systems"
  - "Leadership"
  - "UX design"
hero: "/img/spacing-epic/hero.png"
heroAlt: "The spacing scale applied across three interface densities"
order: 5
---
```

| Key | Required | What it does |
|---|---|---|
| `title` | yes | The `<h1>`, the card title, the browser tab, the social preview title. |
| `deck` | yes | The one-line subtitle under the hero image. Also becomes the meta description and the card summary. |
| `topics` | yes | The chips on the card and page, **and the All-work filter**. See the taxonomy below. |
| `hero` | yes | The image at the top of the page and on every card. Also the social preview image. |
| `heroAlt` | no | Alt text for the hero. Falls back to `title`, but write a real description. |
| `order` | yes | Running order across the site: home carousel, All-work list, and which case study comes "next". Lower numbers first. |

**Note:** the field is `topics`, not `tags`. Eleventy reserves `tags` for its own collection
membership, which is set for you in `src/work/work.json` — you never write it.

### Topic taxonomy

Reuse an existing topic wherever one fits. A new topic silently creates a new filter chip, and
near-duplicates ("UX design" vs "Ux design") would show up as two separate filters.

Currently in use: `Agentic design` · `Agentic workflows` · `Cultural change` · `Design systems` ·
`Leadership` · `Product design` · `Product management` · `Service design` · `UI design` · `UX design`

---

## Body

Plain markdown. `## Headings` become the section headlines; the prose under each is capped at a
readable measure automatically. Bold, bullets and numbered lists all work as normal.

Write headlines that **state a finding**, not ones that name an activity — "The breakthrough:
from metrics to intent", not "Research". That is the house style; the reasoning is in
`obsidian-vault/02 Concepts/Case-Study-Craft.md`.

### Images

One line, wherever the image belongs in the flow:

```njk
{% figure "/img/spacing-epic/figure-1.png", "The eight-step spacing scale" %}
```

The first argument is the image path, the second is alt text (required — describe what the image
shows, not "screenshot"). An optional third argument adds a caption below the panel:

```njk
{% figure "/img/spacing-epic/figure-2.png", "Density comparison", "Compact, comfortable and spacious modes from one scale" %}
```

The dark panel, rounded corners, border, WebP conversion, `srcset`, explicit dimensions and
lazy-loading are all handled for you. Just drop the file in `src/img/<slug>/` and point at it.

A case study with **no** figures is fine — the template doesn't require any.

---

## Worked example

```markdown
---
title: "Transforming customer insights with AI-driven profiling"
deck: "Creating an AI-driven profiling solution in a complex banking environment"
topics:
  - "Agentic design"
  - "Product design"
  - "UX design"
hero: "/img/ai-driven-profiling/hero.png"
heroAlt: "The profiling product's intent-based insight view"
order: 1
---

## Spotting an opportunity to enhance our profiling service

Our profiling services delivered valuable insights but presented opportunities for
improvement in how customers experienced them. As the sole designer, I identified
several ways we could enhance our approach.

- The service required significant resources for delivery and support
- Analysts spent considerable time on analysis that sometimes yielded limited insight

{% figure "/img/ai-driven-profiling/figure-1.png", "The three user archetypes we designed against" %}

## The breakthrough — from metrics to intent

The most significant innovation was a shift in our thinking...
```

---

## Coming from a `/case-study` draft?

The `ux-case-study` skill writes in an **authoring** format, which is deliberately medium-agnostic
and stays that way. Map it across like this:

| Authoring format (`templates/case-study-template.md`) | Here |
|---|---|
| `**Title:**` | `title` |
| `**Tagline:**` | `deck` |
| Type lenses / discipline emphasis | `topics` |
| `Artefact slot:` | `{% figure %}` |
| Section headlines (insight-led) | `## Headings` — unchanged |
| `**Role:**`, `**Timeframe:**`, `**Team:**`, spine note | Not published. Working notes; leave them in the draft. |

Keep the draft in `/workspace/Case studies/<project>/` — drafts and transcripts stay out of this
public repo. Only the published version belongs here.

If you already have an "as-published" capture (the `# Title` / `**Hero subtitle:**` / `**Tags:**`
shape), don't retype it — run the importer, which copies the prose through byte-for-byte:

```bash
node tools/import-case-study.mjs "/path/to/captured.md" --slug=my-case-study --order=6
```

---

## Before you push

```bash
npm start     # http://localhost:8080 — check it locally
npm run build # confirm the build passes
```

Then commit and push to `main`. GitHub Actions builds and deploys; the change is live in a few minutes.
