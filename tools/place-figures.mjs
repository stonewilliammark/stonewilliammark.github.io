#!/usr/bin/env node
/**
 * place-figures.mjs
 *
 * One-off: inserts {% figure %} calls into the imported case studies at the
 * positions the Figma design puts them.
 *
 * Why this exists: the captured source markdown only flagged *some* artefacts
 * with `*[Visual: …]*` markers — 10 across five files, where the design actually
 * has 31. The mapping below was derived from the Figma document order on the
 * Dev handover page (node 2227:7925) by walking each case study frame and
 * pairing every 1336x472 panel with the section heading that precedes it.
 *
 * Figures are appended at the end of the section they belong to, matching the
 * design, where the artefact follows the prose it illustrates.
 *
 * Alt text below is written from section context and the design review. It is
 * deliberately specific rather than "screenshot", but it should be checked by
 * someone who knows exactly what each artefact shows.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PLACEMENTS = {
  "ai-driven-profiling": [
    ["Using archetypes to focus our innovation", [[1, "The three user archetypes — Experts, Explorers and So Whater's — used to scope the proof of concept"]]],
    ["Creating alignment through collaborative discovery", [[2, "The full-day discovery workshop bringing the team together around the problem"]]],
    ["The breakthrough - from metrics to intent", [[3, "The shift from metric-led profiles to intent-based profiles"]]],
    ["Using AI tools to enhance our design process", [[4, "The AI-assisted design workflow, from requirements through to front-end prototype"]]],
  ],
  "cultural-transformation": [
    ["User archetypes transform product thinking", [
      [1, "The product archetypes illustration cards introduced to the organisation"],
      [2, "Archetype card detail — the Experts profile"],
      [3, "Archetype card detail — the Explorers profile"],
      [4, "Archetype card detail — the So Whater's profile"],
    ]],
    ["The insight that changed everything", [[5, "\"Imagine trying to build a product for everyone?\" — the bullseye illustration that reframed the conversation"]]],
    ["Workshop-driven collaboration builds momentum", [[6, "Cross-functional workshops that built momentum behind user-centred practice"]]],
    ["Impact on product development", [[7, "From data to insight-led solution — a spreadsheet export alongside the insight-led product interface"]]],
  ],
  "service-blueprinting": [
    ["Creating visibility through service blueprinting", [
      [1, "The end-to-end service blueprint mapping the delivery workflow"],
      [2, "Blueprint detail showing hand-offs between teams"],
    ]],
    ["Uncovering systemic opportunities for improvement", [[3, "Systemic issues surfaced by the blueprint — workarounds that had become normal practice"]]],
    ["From mapping to action", [
      [4, "Future-state vision — the client portal"],
      [5, "Future-state vision — invoicing"],
      [6, "Future-state vision — CRM"],
    ]],
  ],
  "design-system-cultural-change": [
    ["The challenge", [[1, "Symptomatic, isolated designing had produced disjointed component styles across products"]]],
    ["Introducing the EPIC framework", [
      [2, "The design system EPIC roadmap"],
      [3, "The design system high-level plan"],
      [4, "Colour epic planning"],
    ]],
    ["Results and impact", [[5, "Collaborative problem solving in practice — workshop output from the team"]]],
  ],
  "spacing-epic": [
    ["Building a collaborative approach", [[1, "The team whiteboarding session that established shared ownership of the problem"]]],
    ["Key breakthroughs", [
      [2, "The half-base-unit spacing scale"],
      [3, "Semantic spacing tokens mapped to interface relationships"],
      [4, "Spatial relationships — how spacing communicates grouping"],
    ]],
    ["Education and adoption", [
      [5, "Why spacing matters — the case made to the wider team"],
      [6, "Establishing type and spacing together"],
      [7, "Levels of density — compact, comfortable and spacious"],
      [8, "Applying the model across real product screens"],
      [9, "The documented spacing guidance the team adopted"],
    ]],
  ],
};

function place(slug, placements) {
  const path = resolve(process.cwd(), "src", "work", `${slug}.md`);
  const lines = readFileSync(path, "utf8").split("\n");

  // Drop any figures already present (from the partial `*[Visual:]*` markers),
  // so this script is the single source of truth and is safe to re-run.
  const cleaned = lines.filter((line) => !/^\{%\s*figure\s/.test(line));

  const wanted = new Map(placements);
  const out = [];
  let currentHeading = null;
  let inserted = 0;

  function flush() {
    if (!currentHeading || !wanted.has(currentHeading)) return;
    while (out.length && out[out.length - 1].trim() === "") out.pop();
    out.push("");
    for (const [n, alt] of wanted.get(currentHeading)) {
      out.push(`{% figure "/img/${slug}/figure-${n}.png", "${alt.replace(/"/g, '\\"')}" %}`);
      inserted++;
    }
    wanted.delete(currentHeading);
  }

  for (const line of cleaned) {
    const heading = line.match(/^##\s+(.*?)\s*$/);
    if (heading) {
      flush(); // close out the previous section before starting the next
      out.push("");
      currentHeading = heading[1];
    }
    out.push(line);
  }
  flush();

  if (wanted.size > 0) {
    throw new Error(
      `${slug}: could not find these headings: ${[...wanted.keys()].map((h) => `"${h}"`).join(", ")}`
    );
  }

  const body = out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  writeFileSync(path, body, "utf8");
  return inserted;
}

let total = 0;
for (const [slug, placements] of Object.entries(PLACEMENTS)) {
  const n = place(slug, placements);
  total += n;
  console.log(`✓ ${slug}: ${n} figures placed`);
}
console.log(`\n${total} figures placed across ${Object.keys(PLACEMENTS).length} case studies.`);
