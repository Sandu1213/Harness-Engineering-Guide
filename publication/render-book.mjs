import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
}

function chapterDiagramStem(markdown, sourcePath) {
  const diagramPath = markdown.match(
    /\.\.\/\.\.\/diagrams\/mermaid\/([a-z0-9-]+)\.mmd/,
  )?.[1];
  if (!diagramPath) {
    throw new Error(`Missing chapter diagram declaration in ${sourcePath}`);
  }
  return diagramPath;
}

function transformBody(markdown, entry, diagramStem) {
  const lines = stripFrontmatter(markdown).split("\n");
  const output = [];
  let firstHeadingRemoved = false;
  let insideFence = false;
  let skippingMermaid = false;
  let diagramInserted = false;

  for (const line of lines) {
    if (
      diagramStem &&
      line.startsWith("![") &&
      line.includes(diagramStem) &&
      /\.(png|svg)\)/.test(line)
    ) {
      continue;
    }

    if (!insideFence && /^\s*```mermaid\s*$/.test(line) && diagramStem) {
      output.push(
        `![${entry.title} 主图](diagrams/exported/${diagramStem}.png)`,
      );
      insideFence = true;
      skippingMermaid = true;
      diagramInserted = true;
      continue;
    }

    if (skippingMermaid) {
      if (/^\s*```\s*$/.test(line)) {
        insideFence = false;
        skippingMermaid = false;
      }
      continue;
    }

    if (/^\s*```/.test(line)) {
      insideFence = !insideFence;
      output.push(line);
      continue;
    }

    if (!insideFence && !firstHeadingRemoved && /^#\s+/.test(line)) {
      firstHeadingRemoved = true;
      continue;
    }

    if (!insideFence && /^(#{1,5})\s+/.test(line)) {
      output.push(`#${line}`);
      continue;
    }

    output.push(line);
  }

  if (diagramStem && !diagramInserted) {
    output.unshift(
      `![${entry.title} 主图](diagrams/exported/${diagramStem}.png)`,
      "",
    );
  }

  return output
    .join("\n")
    .replaceAll("../../diagrams/exported/", "diagrams/exported/")
    .trim();
}

async function renderEntry(rootPath, entry) {
  const markdown = await readFile(path.join(rootPath, entry.sourcePath), "utf8");
  const diagramStem =
    entry.kind === "chapter"
      ? chapterDiagramStem(markdown, entry.sourcePath)
      : undefined;
  const body = transformBody(markdown, entry, diagramStem);
  return `## ${entry.title} {#${entry.slug}}\n\n${body}`;
}

/** Render the canonical 47-chapter and 12-appendix publication source. */
export async function renderPublicationMarkdown(rootDir, manifest) {
  const rootPath = rootDir instanceof URL ? fileURLToPath(rootDir) : rootDir;
  const sections = [];

  for (const part of manifest.parts) {
    sections.push(`# ${part.title}`);
    for (const chapter of part.chapters) {
      sections.push(await renderEntry(rootPath, chapter));
    }
  }

  sections.push("# 附录");
  for (const appendix of manifest.appendices) {
    sections.push(await renderEntry(rootPath, appendix));
  }

  return `\`\`\`{=typst}\n#pagebreak()\n\`\`\`\n\n${sections.join("\n\n")}\n`;
}
