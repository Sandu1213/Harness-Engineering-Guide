import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, ".site-public");
const assetDirectories = ["diagrams", "examples", "templates"];

await mkdir(publicDir, { recursive: true });

for (const directory of assetDirectories) {
  const destination = path.join(publicDir, directory);
  await rm(destination, { force: true, recursive: true });
  await cp(path.join(rootDir, directory), destination, { recursive: true });

  const copiedFiles = await readdir(destination, { recursive: true });
  for (const copiedFile of copiedFiles.filter((file) => file.endsWith(".md"))) {
    const markdownPath = path.join(destination, copiedFile);
    await cp(markdownPath, markdownPath.slice(0, -3));
  }
}

await cp(
  path.join(rootDir, "publication", "site-favicon.svg"),
  path.join(publicDir, "favicon.svg"),
);
await cp(
  path.join(rootDir, "publication", "site-favicon.svg"),
  path.join(publicDir, "favicon.ico"),
);

console.log(`Prepared site assets: ${assetDirectories.join(", ")}`);
