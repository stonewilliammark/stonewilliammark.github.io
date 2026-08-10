import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "html-minifier-terser";

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

  // The custom domain is deliberately NOT deployed yet. A CNAME file makes GitHub
  // redirect the *.github.io URL to stonewilliam.com, so publishing it before DNS
  // resolves would take the site offline at both addresses. At cutover (once the
  // A/AAAA records are live), move CNAME.pending to src/CNAME and restore the
  // passthrough line below.
  // eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addWatchTarget("src/assets/");

  // --- Images -------------------------------------------------------------
  // Optimises every <img> in the output HTML: generates WebP, builds a srcset,
  // and stamps explicit width/height to prevent layout shift. Authors just
  // write a normal <img>; this handles the rest at build time.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    widths: [480, 960, 1440, "auto"],
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
