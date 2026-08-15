import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "html-minifier-terser";
import { readdirSync, rmSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

/**
 * Social cards are 1200x630 (1.91:1) but the hero panels are 2.83:1, so handing
 * a hero straight to LinkedIn/Slack centre-crops it and throws away the top and
 * bottom third — exactly where the artwork sits.
 *
 * This letterboxes each hero onto the panel's own edge colour (#2f2f2f) instead.
 * The panels have rounded corners with transparency, so flattening onto the same
 * colour makes the padding invisible — it just reads as a taller panel.
 *
 * Runs before every build, so a new case study gets a correct card for free.
 */
const OG_BG = { r: 47, g: 47, b: 47, alpha: 1 };

async function buildOgCards(imgDir) {
  if (!existsSync(imgDir)) return 0;
  let made = 0;
  for (const entry of readdirSync(imgDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const hero = join(imgDir, entry.name, "hero.png");
    const og = join(imgDir, entry.name, "og.png");
    if (!existsSync(hero)) continue;
    // Only regenerate when the hero is newer, so builds stay fast.
    if (existsSync(og) && statSync(og).mtimeMs >= statSync(hero).mtimeMs) continue;
    await sharp(hero)
      .resize(1200, 630, { fit: "contain", background: OG_BG })
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
