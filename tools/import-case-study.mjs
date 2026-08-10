#!/usr/bin/env node
/**
 * import-case-study.mjs
 *
 * Converts an "as-published" case study markdown file (the shape captured back
 * out of Figma: `# Title`, `**Hero subtitle:**`, `**Tags:**`, then `## sections`)
 * into the site's publish format — YAML frontmatter plus body — and writes it to
 * src/work/<slug>.md.
 *
 * The point is fidelity: prose is copied through byte-for-byte. Only metadata,
 * capture notes and the captured page furniture are transformed or removed, so
 * approved copy can never drift through re-typing.
 *
 * Usage:
 *   node tools/import-case-study.mjs <source.md> --slug=<slug> --order=<n> [--hero=<path>] [--dry]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

/* Normalises the tag taxonomy. The captured files disagree on casing and carry
   one typo, which would otherwise produce duplicate filter chips. */
const TOPIC_ALIASES = new Map([
  ["ux design", "UX design"],
  ["ui design", "UI design"],
  ["product managment", "Product management"],
  ["product management", "Product management"],
  ["product design", "Product design"],
  ["agentic design", "Agentic design"],
  ["agentic workflows", "Agentic workflows"],
  ["service design", "Service design"],
  ["design systems", "Design systems"],
  ["cultural change", "Cultural change"],
  ["leadership", "Leadership"],
]);

function normaliseTopic(raw) {
  const trimmed = raw.trim();
  return TOPIC_ALIASES.get(trimmed.toLowerCase()) || trimmed;
}

function parseArgs(argv) {
  const args = { positional: [] };
  for (const arg of argv) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      args[key] = value === undefined ? true : value;
    } else {
      args.positional.push(arg);
    }
  }
  return args;
}

/** YAML-safe double-quoted scalar. */
function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function convert(source, { slug, order, hero }) {
  const lines = source.split("\n");

  // --- Metadata -----------------------------------------------------------
  const titleLine = lines.find((line) => /^#\s+/.test(line));
  if (!titleLine) throw new Error("No `# Title` heading found in the source file.");
  const title = titleLine.replace(/^#\s+/, "").trim();

  const deckLine = lines.find((line) => /^\*\*Hero subtitle:\*\*/.test(line));
  if (!deckLine) throw new Error("No `**Hero subtitle:**` line found in the source file.");
  const deck = deckLine.replace(/^\*\*Hero subtitle:\*\*/, "").trim();

  const tagsLine = lines.find((line) => /^\*\*Tags:\*\*/.test(line));
  if (!tagsLine) throw new Error("No `**Tags:**` line found in the source file.");
  const topics = tagsLine
    .replace(/^\*\*Tags:\*\*/, "")
    .split("·")
    .map(normaliseTopic)
    .filter(Boolean);

  // --- Body ---------------------------------------------------------------
  // Start after the metadata block; stop before the captured page furniture
  // (the "Page footer" navigation block and the in-image-text appendix), which
  // the site template generates for itself.
  const startIndex = lines.indexOf(tagsLine) + 1;
  let endIndex = lines.length;
  for (let i = startIndex; i < lines.length; i++) {
    if (/^#{2,4}\s+(Page footer|Appendix)/i.test(lines[i])) {
      endIndex = i;
      break;
    }
  }

  let figureCount = 0;
  const body = [];

  for (let i = startIndex; i < endIndex; i++) {
    const line = lines[i];

    // Drop the capture provenance blockquote — it is a note to us, not copy.
    if (/^>\s?/.test(line)) continue;

    // Drop the `---` rules that separated captured sections. The template
    // spaces sections itself, so these would be redundant markup.
    if (/^-{3,}\s*$/.test(line)) continue;

    // `*[Visual: … ]*` markers record exactly where an artefact sat on the
    // published page. Turn each into a figure with the description as alt text,
    // so Phase 4 only has to drop a file at the named path.
    const visual = line.match(/^\*\[Visuals?:\s*(.+?)\s*(?:—\s*see appendix.*?)?\]\*\s*$/i);
    if (visual) {
      figureCount += 1;
      const alt = visual[1].replace(/"/g, "'").trim();
      body.push(`{% figure "/img/${slug}/figure-${figureCount}.png", "${alt}" %}`);
      continue;
    }

    body.push(line);
  }

  // Collapse any run of blank lines left behind to a single blank line.
  const cleanedBody = body
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const frontmatter = [
    "---",
    `title: ${yamlString(title)}`,
    `deck: ${yamlString(deck)}`,
    `topics:`,
    ...topics.map((topic) => `  - ${yamlString(topic)}`),
    `hero: ${yamlString(hero || `/img/${slug}/hero.png`)}`,
    `heroAlt: ${yamlString(title)}`,
    `order: ${order}`,
    "---",
  ].join("\n");

  return { title, deck, topics, figureCount, output: `${frontmatter}\n\n${cleanedBody}\n` };
}

// --- CLI -------------------------------------------------------------------
const args = parseArgs(process.argv.slice(2));
const sourcePath = args.positional[0];

if (!sourcePath || !args.slug || !args.order) {
  console.error(
    "Usage: node tools/import-case-study.mjs <source.md> --slug=<slug> --order=<n> [--hero=<path>] [--dry]"
  );
  process.exit(1);
}

if (!existsSync(sourcePath)) {
  console.error(`Source file not found: ${sourcePath}`);
  process.exit(1);
}

const result = convert(readFileSync(sourcePath, "utf8"), {
  slug: args.slug,
  order: args.order,
  hero: args.hero,
});

const destination = resolve(process.cwd(), "src", "work", `${args.slug}.md`);

if (args.dry) {
  console.log(result.output);
} else {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, result.output, "utf8");
  console.log(`✓ ${args.slug}.md`);
  console.log(`  title    ${result.title}`);
  console.log(`  topics   ${result.topics.join(", ")}`);
  console.log(`  figures  ${result.figureCount} (expects /img/${args.slug}/figure-1..${result.figureCount}.png)`);
  console.log(`  hero     needs /img/${args.slug}/hero.png`);
}
