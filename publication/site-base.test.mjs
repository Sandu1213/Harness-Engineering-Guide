import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeSiteBase,
  removeSiteBase,
} from "./site-base.mjs";

test("normalizeSiteBase returns a VitePress-compatible root or repository base", () => {
  assert.equal(normalizeSiteBase(), "/");
  assert.equal(normalizeSiteBase("/"), "/");
  assert.equal(normalizeSiteBase("Harness-Engineering-Guide"), "/Harness-Engineering-Guide/");
  assert.equal(normalizeSiteBase("/Harness-Engineering-Guide/"), "/Harness-Engineering-Guide/");
});

test("removeSiteBase maps deployed URLs back to build-output paths", () => {
  const base = "/Harness-Engineering-Guide/";

  assert.equal(removeSiteBase("/Harness-Engineering-Guide/", base), "/");
  assert.equal(
    removeSiteBase("/Harness-Engineering-Guide/SUMMARY.html", base),
    "/SUMMARY.html",
  );
  assert.equal(removeSiteBase("/favicon.svg", base), "/favicon.svg");
});
