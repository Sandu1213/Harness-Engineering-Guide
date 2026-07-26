import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  normalizeSiteBase,
  removeSiteBase,
} from "../publication/site-base.mjs";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "docs", ".vitepress", "dist");
const siteBase = normalizeSiteBase(process.env.SITE_BASE);
const htmlFiles = (await readdir(distDir, { recursive: true }))
  .filter((file) => file.endsWith(".html"))
  .sort();
const missing = new Set();

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

for (const htmlFile of htmlFiles) {
  const absoluteHtmlPath = path.join(distDir, htmlFile);
  const html = await readFile(absoluteHtmlPath, "utf8");
  const pageDirectory = path.posix.dirname(`/${htmlFile}`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|data:|javascript:|#)/.test(reference)) continue;

    const withoutFragment = reference.split(/[?#]/, 1)[0];
    if (!withoutFragment) continue;
    const deployedUrlPath = decodeURIComponent(
      withoutFragment.startsWith("/")
        ? withoutFragment
        : path.posix.resolve(pageDirectory, withoutFragment),
    );
    const urlPath = removeSiteBase(deployedUrlPath, siteBase);
    const relativeTarget = urlPath.replace(/^\//, "");
    const candidates = [
      relativeTarget,
      `${relativeTarget}.html`,
      path.posix.join(relativeTarget, "index.html"),
    ];
    const found = await Promise.any(
      candidates.map(async (candidate) => {
        if (await exists(path.join(distDir, candidate))) return true;
        throw new Error(candidate);
      }),
    ).catch(() => false);

    if (!found) missing.add(`${htmlFile} -> ${reference}`);
  }
}

if (missing.size > 0) {
  console.error([...missing].join("\n"));
  throw new Error(`Found ${missing.size} missing site links`);
}

console.log(`Checked ${htmlFiles.length} HTML pages with no missing local links`);
