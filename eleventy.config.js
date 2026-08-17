import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "html-minifier-terser";
import { readdirSync, rmSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

/**
 * Social cards, 1200x630 (1.91:1) from a 2.83:1 hero panel.
 *
 * Two earlier attempts failed on LinkedIn, and both are worth remembering:
 *
 * 1. Letterboxing the whole panel onto a flat bar. The Figma export's rounded
 *    corners are opaque WHITE — the page behind the rounded rect, not alpha — so
 *    flatten() never covered them and they showed as notches at all four corners.
 * 2. Cover-cropping the full panel. Corners gone and no seam, but the artwork only
 *    occupies 31-45% of the panel width, so at LinkedIn's thumbnail size it read as
 *    a tiny picture floating in a dark field.
 *
 * So the crop is content-aware: find the artwork's bounding box (ignoring a 60px
 * inset that clears the white corners), add breathing room, expand to the card
 * ratio around its centre, and clamp inside the panel. Each case study zooms by
 * whatever its own composition needs — measured 1.7x to 2.0x on the current five.
 */
const OG_BG = { r: 45, g: 45, b: 45 };
const OG_W = 1200;
const OG_H = 630;
const CORNER_INSET = 60; // clears the 48px white corner radius
const OG_PAD = 0.1; // breathing room around the artwork

/** Bounding box of pixels that are clearly not the dark panel background. */
async function artworkBox(file) {
  const img = sharp(file);
  const { width: W, height: H } = await img.metadata();
  const { data, info } = await img
    .extract({
      left: CORNER_INSET,
      top: CORNER_INSET,
      width: W - CORNER_INSET * 2,
      height: H - CORNER_INSET * 2,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  let minX = w, minY = h, maxX = 0, maxY = 0, found = false;
  for (let y = 0; y < h; y += 4) {
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const light = Math.max(r, g, b) > 90;
      const saturated = Math.max(r, g, b) - Math.min(r, g, b) > 25;
      if (light || saturated) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }
  if (!found) return null;
  return {
    minX: minX + CORNER_INSET, maxX: maxX + CORNER_INSET,
    minY: minY + CORNER_INSET, maxY: maxY + CORNER_INSET,
    W, H,
  };
}

/** Expand a box to the card ratio around its centre, clamped inside the panel. */
function cardCrop(box) {
  const ratio = OG_W / OG_H;
  let { minX, maxX, minY, maxY, W, H } = box;
  let bw = maxX - minX, bh = maxY - minY;
  minX -= bw * OG_PAD; maxX += bw * OG_PAD;
  minY -= bh * OG_PAD; maxY += bh * OG_PAD;
  bw = maxX - minX; bh = maxY - minY;
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  if (bw / bh < ratio) bw = bh * ratio;
  else bh = bw / ratio;

  const maxW = W - CORNER_INSET * 2, maxH = H - CORNER_INSET * 2;
  if (bw > maxW) { bw = maxW; bh = bw / ratio; }
  if (bh > maxH) { bh = maxH; bw = bh * ratio; }

  return {
    left: Math.round(Math.min(Math.max(cx - bw / 2, CORNER_INSET), W - CORNER_INSET - bw)),
    top: Math.round(Math.min(Math.max(cy - bh / 2, CORNER_INSET), H - CORNER_INSET - bh)),
    width: Math.round(bw),
    height: Math.round(bh),
  };
}

async function buildOgCards(imgDir) {
  if (!existsSync(imgDir)) return 0;
  let made = 0;
  for (const entry of readdirSync(imgDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const hero = join(imgDir, entry.name, "hero.png");
    const og = join(imgDir, entry.name, "og.png");
    if (!existsSync(hero)) continue;
    if (existsSync(og) && statSync(og).mtimeMs >= statSync(hero).mtimeMs) continue;

    const box = await artworkBox(hero);
    const pipeline = sharp(hero);
    if (box) pipeline.extract(cardCrop(box));
    await pipeline
      .resize(OG_W, OG_H, { fit: "cover", position: "centre" })
      .flatten({ background: OG_BG })
      .png({ compressionLevel: 9 })
      .toFile(og);
    made++;
  }
  return made;
}

/**
 * Required frontmatter for every case study.
 * A missing or empty key fails the build loudly, naming the file — so a malformed
 * case study can never ship a broken card or a blank social preview.
 * See CASE-STUDY-TEMPLATE.md for the annotated contract.
 */
const REQUIRED_CASE_STUDY_KEYS = ["title", "deck", "topics", "hero", "order"];

function isEmpty(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

export default function (eleventyConfig) {
  // --- Static passthrough -------------------------------------------------
  // CSS, JS, the CV PDF, fonts and source images are copied verbatim.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });

  // Custom domain. This file must ship in every build — an Actions deploy without
  // it would clear the domain setting on the repo.
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addWatchTarget("src/assets/");

  // Generate the 1200x630 social cards before anything is copied or rendered.
  eleventyConfig.on("eleventy.before", async () => {
    const made = await buildOgCards("src/img");
    if (made > 0) console.log(`[og] generated ${made} social card(s) at 1200x630`);
  });

  // --- Images -------------------------------------------------------------
  // Optimises every <img> in the output HTML: generates WebP, builds a srcset,
  // and stamps explicit width/height to prevent layout shift. Authors just
  // write a normal <img>; this handles the rest at build time.
  // WebP only. Support is universal in anything that can render the rest of this
  // CSS, and emitting a second PNG ladder at every width doubled the deploy for
  // variants no browser would ever request.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: [480, 960, 1440, "auto"], // "auto" = the 2x source, for retina
    failOnError: false, // a missing image warns rather than killing the whole build
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 860px) 100vw, 1336px",
    },
  });

  // --- Collections --------------------------------------------------------
  // The single source of truth for every listing on the site. Home cards,
  // All-work cards, tag counts and next/prev links all derive from this,
  // so adding a markdown file is genuinely the only step.
  eleventyConfig.addCollection("caseStudies", (collectionApi) => {
    const items = collectionApi.getFilteredByTag("case-study");

    for (const item of items) {
      const missing = REQUIRED_CASE_STUDY_KEYS.filter((key) => isEmpty(item.data[key]));
      if (missing.length > 0) {
        throw new Error(
          `\n\n  Case study "${item.inputPath}" is missing required frontmatter: ${missing.join(", ")}.\n` +
            `  Every case study needs: ${REQUIRED_CASE_STUDY_KEYS.join(", ")}.\n` +
            `  Copy CASE-STUDY-TEMPLATE.md and fill it in.\n`
        );
      }
    }

    return items.sort((a, b) => Number(a.data.order) - Number(b.data.order));
  });

  // Topic tags with counts, for the All-work filter chips. Derived, never hand-maintained.
  eleventyConfig.addCollection("topics", (collectionApi) => {
    const counts = new Map();
    for (const item of collectionApi.getFilteredByTag("case-study")) {
      for (const topic of item.data.topics || []) {
        counts.set(topic, (counts.get(topic) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  });

  // --- Filters ------------------------------------------------------------
  // Reading time, matching the design's "3 min read" chip. Computed from the
  // raw markdown so it never needs to be written by hand.
  eleventyConfig.addFilter("readingTime", (raw) => {
    if (!raw) return 1;
    const text = String(raw)
      .replace(/^---[\s\S]*?---/, "") // drop frontmatter
      .replace(/\{%[\s\S]*?%\}/g, "") // drop shortcodes
      .replace(/<[^>]+>/g, " ") // drop any html
      .replace(/[#*_>`\[\]()!-]/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Next case study in the running order, wrapping at the end.
  eleventyConfig.addFilter("nextCaseStudy", (collection, currentUrl) => {
    if (!Array.isArray(collection) || collection.length < 2) return null;
    const index = collection.findIndex((item) => item.url === currentUrl);
    if (index === -1) return collection[0];
    return collection[(index + 1) % collection.length];
  });

  // Turn a topic name into a safe attribute/class token (e.g. "UX design" -> "ux-design").
  eleventyConfig.addFilter("slugifyTopic", (value) =>
    String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );

  // /img/<slug>/hero.png -> /img/<slug>/og.png (the letterboxed 1200x630 card).
  eleventyConfig.addFilter("toOgCard", (heroPath) =>
    typeof heroPath === "string" ? heroPath.replace(/\/hero\.(png|jpe?g|webp)$/i, "/og.png") : heroPath
  );

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    try {
      return new URL(path, base).href;
    } catch {
      return base;
    }
  });

  // --- Shortcodes ---------------------------------------------------------
  // A figure inside a case study: the designed dark panel with the artefact
  // inset. Authors write one line; the panel, radius, border and lazy-loading
  // come from here. Alt text is required — an empty alt is a build-time nudge.
  eleventyConfig.addShortcode("figure", function (src, alt = "", caption = "") {
    if (!src) {
      throw new Error("The {% figure %} shortcode needs an image path as its first argument.");
    }
    // Security: escape author-supplied strings before interpolating into HTML,
    // so a stray quote or angle bracket in a caption cannot break out of the attribute.
    const esc = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const figcaption = caption ? `<figcaption class="figure__caption">${esc(caption)}</figcaption>` : "";
    return `<figure class="figure">
  <div class="panel">
    <img src="${esc(src)}" alt="${esc(alt)}" class="panel__media">
  </div>
  ${figcaption}
</figure>`;
  });

  // --- Output transforms --------------------------------------------------
  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
    if (process.env.ELEVENTY_RUN_MODE === "serve") return content; // keep dev output readable
    return minify(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      useShortDoctype: true,
    });
  });

  // Source images have to be copied into the output for the image transform to
  // resolve them, but once it has run every reference points at a generated WebP.
  // The leftover originals are dead weight in the deploy — except the heroes,
  // which og:image links to directly for social previews.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const imgDir = join(dir.output, "img");
    if (!existsSync(imgDir)) return;
    let removed = 0;
    for (const entry of readdirSync(imgDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const slugDir = join(imgDir, entry.name);
      for (const file of readdirSync(slugDir)) {
        // hero.* is the source of truth for the card; og.* is what og:image serves.
      if (file.startsWith("hero.") || file.startsWith("og.")) continue;
        rmSync(join(slugDir, file));
        removed++;
      }
    }
    if (removed > 0) console.log(`[img] pruned ${removed} unreferenced source images from the build`);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
