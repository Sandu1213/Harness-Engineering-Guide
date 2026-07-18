import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PART_DEFINITIONS = [
  ["part-01-foundations", "Part 1：基础思想"],
  ["part-02-components", "Part 2：Harness 核心组件"],
  ["part-03-intelligence-loop", "Part 3：智能闭环"],
  ["part-04-engineering-practice", "Part 4：主流工程实践"],
  ["part-05-case-studies", "Part 5：真实案例"],
  ["part-06-design-and-evaluation", "Part 6：设计模式与评估"],
  ["part-07-future", "Part 7：Book Factory 与未来"],
];

const CHAPTER_FILE = /^\d{2}-[a-z0-9-]+\.md$/;
const APPENDIX_FILE = /^[a-l]-[a-z0-9-]+\.md$/;

function parseTitle(markdown, sourcePath) {
  const title =
    markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ??
    markdown.match(/^#\s+(.+)$/m)?.[1];
  if (!title) {
    throw new Error(`Missing frontmatter title in ${sourcePath}`);
  }
  return title;
}

async function readEntries(rootPath, directory, pattern, kind) {
  const absoluteDirectory = path.join(rootPath, "docs", directory);
  const fileNames = (await readdir(absoluteDirectory))
    .filter((fileName) => pattern.test(fileName))
    .sort((left, right) => left.localeCompare(right, "en"));

  return Promise.all(
    fileNames.map(async (fileName) => {
      const sourcePath = path.posix.join("docs", directory, fileName);
      const markdown = await readFile(path.join(rootPath, sourcePath), "utf8");
      return {
        kind,
        title: parseTitle(markdown, sourcePath),
        slug: fileName.slice(0, -3),
        sourcePath,
        sitePath: `/${directory}/${fileName.slice(0, -3)}`,
      };
    }),
  );
}

/** Return the canonical chapter and appendix order shared by all publication targets. */
export async function createBookManifest(rootDir) {
  const rootPath = rootDir instanceof URL ? fileURLToPath(rootDir) : rootDir;
  const parts = await Promise.all(
    PART_DEFINITIONS.map(async ([directory, title]) => {
      const chapters = await readEntries(
        rootPath,
        directory,
        CHAPTER_FILE,
        "chapter",
      );
      return { directory, title, chapters };
    }),
  );
  const appendices = await readEntries(
    rootPath,
    "appendices",
    APPENDIX_FILE,
    "appendix",
  );

  return {
    parts,
    chapters: parts.flatMap(({ chapters }) => chapters),
    appendices,
  };
}
