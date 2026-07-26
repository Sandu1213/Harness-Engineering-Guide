/** Normalize a deployment path for VitePress. */
export function normalizeSiteBase(value = "/") {
  const path = value.trim();
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

/** Remove the deployment base before resolving a built file on disk. */
export function removeSiteBase(urlPath, base = "/") {
  const normalizedBase = normalizeSiteBase(base);
  if (normalizedBase === "/") return urlPath;
  if (urlPath === normalizedBase.slice(0, -1)) return "/";
  if (!urlPath.startsWith(normalizedBase)) return urlPath;
  return `/${urlPath.slice(normalizedBase.length)}`;
}
