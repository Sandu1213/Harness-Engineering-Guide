import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";

import { createBookManifest } from "../../publication/book-manifest.mjs";
import { normalizeSiteBase } from "../../publication/site-base.mjs";

const rootDir = new URL("../../", import.meta.url);
const manifest = await createBookManifest(rootDir);
const siteBase = normalizeSiteBase(process.env.SITE_BASE);

const relativeRepositoryPath = /^(?:\.\/)?(?:\.\.\/)+/;
const publicAssetPath = /^(diagrams|examples|templates)\//;
const repositoryOnlyPath = /^(?:\.(ai|memory|context)\/|(AGENTS|AI_BOOTSTRAP|BOOK_RULES|STYLE_GUIDE|CLAUDE)(?:\.md)?$)/;

const normalizedRepositoryTarget = (href) =>
  href.replace(relativeRepositoryPath, "");

const sidebar = [
  ...manifest.parts.map(({ title, chapters }) => ({
    text: title,
    collapsed: true,
    items: chapters.map(({ sitePath, title: chapterTitle }) => ({
      text: chapterTitle,
      link: sitePath,
    })),
  })),
  {
    text: "附录",
    collapsed: true,
    items: manifest.appendices.map(({ sitePath, title }) => ({
      text: title,
      link: sitePath,
    })),
  },
];

export default defineConfig({
  base: siteBase,
  lang: "zh-CN",
  title: "Harness Engineering",
  description: "构建可持续进化的 AI Agent",
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    publicDir: fileURLToPath(new URL("../../.site-public", import.meta.url)),
  },
  ignoreDeadLinks: [
    /^\/(diagrams|examples|templates)\//,
    /^(?:\.\/)?(?:\.\.\/)+(diagrams|examples|templates)\//,
    /^(?:\.\/)?(?:\.\.\/)+\.(ai|memory|context)\//,
    /^(?:\.\/)?(?:\.\.\/)+(AGENTS|AI_BOOTSTRAP|BOOK_RULES|STYLE_GUIDE|CLAUDE)(?:\.md)?/,
  ],
  head: [
    [
      "link",
      { rel: "icon", href: `${siteBase}favicon.svg`, type: "image/svg+xml" },
    ],
    ["meta", { name: "theme-color", content: "#173f35" }],
    ["meta", { name: "color-scheme", content: "light dark" }],
  ],
  markdown: {
    config(md) {
      const defaultLinkOpen =
        md.renderer.rules.link_open ??
        ((tokens, index, options, _environment, renderer) =>
          renderer.renderToken(tokens, index, options));

      md.renderer.rules.link_open = (
        tokens,
        index,
        options,
        environment,
        renderer,
      ) => {
        const token = tokens[index];
        const href = token.attrGet("href");
        if (href && relativeRepositoryPath.test(href)) {
          const target = normalizedRepositoryTarget(href);
          if (publicAssetPath.test(target)) {
            const publicTarget = /\.[a-z0-9]+(?:#.*)?$/i.test(target)
              ? target
              : `${target}.md`;
            token.attrSet("href", `/${publicTarget}`);
          } else if (repositoryOnlyPath.test(target)) {
            token.attrSet("href", "/publication-notes#repository-assets");
            token.attrJoin("class", "repository-only-link");
            token.attrSet("title", "查看网站版的仓库工件说明");
          }
        }
        return defaultLinkOpen(tokens, index, options, environment, renderer);
      };
    },
  },
  themeConfig: {
    logo: {
      light: "/diagrams/exported/chapter-01-prompt-to-harness.png",
      dark: "/diagrams/exported/chapter-01-prompt-to-harness.png",
      alt: "Harness Engineering",
    },
    nav: [
      { text: "开始阅读", link: "/part-01-foundations/01-prompt-to-harness" },
      { text: "全书目录", link: "/SUMMARY" },
      { text: "出版说明", link: "/publication-notes" },
    ],
    sidebar,
    search: { provider: "local" },
    outline: { level: [2, 3], label: "本页内容" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdated: { text: "最后更新" },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "外观",
    footer: {
      message: "从同一套 Markdown 书稿生成。",
      copyright: "版本与许可证以仓库 Release 和出版说明为准。",
    },
  },
});
