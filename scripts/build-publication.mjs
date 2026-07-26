import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

import { createBookManifest } from "../publication/book-manifest.mjs";
import { renderPublicationMarkdown } from "../publication/render-book.mjs";

const execute = promisify(execFile);
const rootDir = path.resolve(import.meta.dirname, "..");
const mode = process.argv[2] ?? "all";
const supportedModes = new Set(["pdf", "epub", "all"]);

if (!supportedModes.has(mode)) {
  throw new Error(`Unsupported publication target: ${mode}`);
}

async function requireCommand(command) {
  try {
    await execute(command, ["--version"]);
  } catch {
    throw new Error(`${command} is required to build this publication target`);
  }
}

async function runPandoc(arguments_) {
  const { stderr, stdout } = await execute("pandoc", arguments_, {
    cwd: rootDir,
    maxBuffer: 16 * 1024 * 1024,
  });
  if (stdout.trim()) console.log(stdout.trim());
  if (stderr.trim()) console.error(stderr.trim());
}

await requireCommand("pandoc");
if (mode === "pdf" || mode === "all") await requireCommand("typst");

const manifest = await createBookManifest(rootDir);
const combinedMarkdown = await renderPublicationMarkdown(rootDir, manifest);
const temporaryDir = path.join(rootDir, "tmp", "pdfs");
const combinedPath = path.join(temporaryDir, "harness-engineering-guide.md");
const fontMetadata = [
  ["mainfont", process.env.PUBLICATION_MAIN_FONT],
  ["codefont", process.env.PUBLICATION_CODE_FONT],
]
  .filter(([, value]) => value?.trim())
  .map(([key, value]) => `--metadata=${key}:${value.trim()}`);

await mkdir(temporaryDir, { recursive: true });
await writeFile(combinedPath, combinedMarkdown);

const commonArguments = [
  combinedPath,
  "--from=markdown+yaml_metadata_block+task_lists+strikeout+autolink_bare_uris+raw_html",
  `--metadata-file=${path.join(rootDir, "publication", "metadata.yaml")}`,
  ...fontMetadata,
  `--resource-path=${rootDir}`,
  `--lua-filter=${path.join(rootDir, "publication", "publication-links.lua")}`,
  "--toc",
  "--toc-depth=2",
  "--number-sections",
];

if (mode === "pdf" || mode === "all") {
  const outputDirectory = path.join(rootDir, "output", "pdf");
  const outputPath = path.join(outputDirectory, "harness-engineering-guide.pdf");
  await mkdir(outputDirectory, { recursive: true });
  await runPandoc([
    ...commonArguments,
    "--pdf-engine=typst",
    `--include-in-header=${path.join(rootDir, "publication", "pdf-header.typ")}`,
    `--include-before-body=${path.join(rootDir, "publication", "pdf-before-toc.typ")}`,
    `--output=${outputPath}`,
  ]);
  console.log(`Created ${path.relative(rootDir, outputPath)}`);
}

if (mode === "epub" || mode === "all") {
  const outputDirectory = path.join(rootDir, "output", "epub");
  const outputPath = path.join(outputDirectory, "harness-engineering-guide.epub");
  await mkdir(outputDirectory, { recursive: true });
  await runPandoc([
    ...commonArguments,
    "--to=epub3",
    "--split-level=2",
    `--css=${path.join(rootDir, "publication", "epub.css")}`,
    `--output=${outputPath}`,
  ]);
  console.log(`Created ${path.relative(rootDir, outputPath)}`);
}
