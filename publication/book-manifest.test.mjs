import assert from "node:assert/strict";
import test from "node:test";

import { createBookManifest } from "./book-manifest.mjs";
import { renderPublicationMarkdown } from "./render-book.mjs";

const rootDir = new URL("../", import.meta.url);

test("createBookManifest returns the 47 chapters and 12 appendices in publication order", async () => {
  const manifest = await createBookManifest(rootDir);

  assert.equal(manifest.parts.length, 7);
  assert.equal(manifest.chapters.length, 47);
  assert.equal(manifest.appendices.length, 12);
  assert.equal(manifest.chapters[0].slug, "01-prompt-to-harness");
  assert.equal(
    manifest.chapters.at(-1).slug,
    "47-agent-engineering-future-and-conclusion",
  );
  assert.equal(manifest.appendices[0].slug, "a-prompt-library");
  assert.equal(manifest.appendices.at(-1).slug, "l-references");
  assert.ok(
    manifest.chapters.every(
      ({ sourcePath }) => !sourcePath.match(/\.(research|outline|references|fact-check|example-plan|technical-review)\.md$/),
    ),
  );
});

test("renderPublicationMarkdown creates one portable source with all reviewed chapter diagrams", async () => {
  const manifest = await createBookManifest(rootDir);
  const markdown = await renderPublicationMarkdown(rootDir, manifest);

  assert.equal((markdown.match(/^# Part /gm) ?? []).length, 7);
  assert.equal((markdown.match(/^# 附录$/gm) ?? []).length, 1);
  assert.equal((markdown.match(/^## .+ \{#[a-z0-9-]+\}$/gm) ?? []).length, 59);
  assert.equal(
    (markdown.match(/^!\[.+ 主图\]\(diagrams\/exported\/.+\.png\)$/gm) ?? [])
      .length,
    47,
  );
  assert.equal((markdown.match(/^```mermaid$/gm) ?? []).length, 2);
  assert.doesNotMatch(markdown, /\.\.\/\.\.\/diagrams\/exported\//);
});
