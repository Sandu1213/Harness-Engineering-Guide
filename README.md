# Harness Engineering Guide

> 《Harness Engineering：构建可持续进化的 AI Agent》——以软件工程方式维护的中文技术书，以及可复用的 AI Technical Book Factory。

## 项目状态

全书 47 章和 12 个附录的内容生产已经完成。每章均完成 Research、Outline、原创 Draft、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review，并具有可追溯的来源、示例、图示和审查记录；附录 A–L 已按三组完成独立终审。47 组 Node.js 示例和 47 组 Mermaid/SVG/PNG 图示均已接入工程。出版管线收口后的全仓 Validation 以退出码 0 完成：628 个源 Markdown 文件、0 个 lint 错误，全部本地链接、47 组章节测试与 47/47 章节状态检查通过；共享参考表的 132 个外部来源和另行汇总的 421 项示例断言也全部通过。

网站、PDF 与 EPUB 的构建管线已经实现：VitePress 站点生成 308 个 HTML 页面并通过产物级本地链接检查；PDF 为 A4、497 页且中文字体嵌入，已由 Poppler 渲染抽检；EPUB 3.3 通过 EPUBCheck，0 个错误或警告。三种形态共享同一份 47 章 + 12 附录内容清单。GitHub Pages 会在 `main` 更新后部署在线阅读站，每次 GitHub Release 发布后会自动附加该标签对应的 PDF 与 EPUB。

## 为什么这是一个 Harness

本项目把写书视为可验证的工程系统：规则决定输入边界，上下文文件保存长期状态，模板约束交付物，校验脚本检查 Markdown，审查流程让每章在研究、编写、核验与改进之间闭环。书本身既解释 Harness Engineering，也用 Harness Engineering 被持续生产。

## 仓库结构

| 路径 | 用途 |
| --- | --- |
| `docs/` | 面向发布的正式书稿与目录 |
| `.context/` | 项目目的、决策、当前状态和交接信息 |
| `.memory/` | 可追溯的决策、审查和经验记录 |
| `.ai/` | AI 写作配置、术语、引用、任务进度与提示词 |
| `templates/` | 章节、研究、评审和工作流的可复用模板 |
| `examples/` | 随章节演进的可运行示例 |
| `diagrams/` | Mermaid 源码与导出图 |
| `scripts/` | 创建章节和质量校验脚本 |
| `publication/` | 网站、PDF 与 EPUB 共用的出版清单、样式和转换规则 |
| `output/` | 本地生成的 PDF/EPUB（构建产物，不纳入 Git） |

## AI 如何加入

Codex 从 [AGENTS.md](AGENTS.md) 开始；Claude Code 从 [CLAUDE.md](CLAUDE.md) 开始。两者随后都必须阅读 [AI_BOOTSTRAP.md](AI_BOOTSTRAP.md) 和 [BOOK_RULES.md](BOOK_RULES.md)，再根据 `.context/NEXT_TASK.md` 领取一个可验收任务。

## 人类贡献者如何加入

请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)、[BOOK_RULES.md](BOOK_RULES.md) 与 [STYLE_GUIDE.md](STYLE_GUIDE.md)。章节或更正建议可使用 GitHub Issue 模板；所有内容都需要原创性、技术准确性和链接校验。

## 创建章节

```bash
./scripts/create-chapter.sh 02 agent-harness-runtime docs/part-01-foundations
```

该命令复制章节模板、生成带编号的 Markdown 文件。创建后需更新 `docs/SUMMARY.md`、`.ai/outline.md` 和 `.ai/progress.md`。

## 运行校验

```bash
npm install
npm run validate
npm run check:reference-links
node --test examples/agent/*.test.mjs
```

`validate` 会执行 Markdown lint、全仓本地链接检查、47 组 Node.js 章节示例测试和章节任务状态检查；不稳定的外部来源可达性由 `check:reference-links` 独立检查。macOS 用户也可以直接运行 `./scripts/validate.sh`；`node --test examples/agent/*.test.mjs` 用于一次汇总全部示例断言。单组示例可使用 `npm run test:<名称>` 或 `npm run example:<名称>`，具体名称见 [`package.json`](package.json) 与[示例索引](examples/agent/README.md)。

## 构建网站、PDF 与 EPUB

本机构建需要 Node.js；PDF/EPUB 另需 Pandoc，PDF 还需 Typst。macOS 可安装完整验收工具链：

```bash
brew install pandoc typst poppler epubcheck
npm install
npm run release:build
```

常用命令：

```bash
npm run site:dev          # 本地阅读网站，默认 http://127.0.0.1:5173/
npm run site:build        # 生成 docs/.vitepress/dist/
npm run site:check        # 检查生产站点的本地链接
npm run publication:pdf  # 生成 output/pdf/harness-engineering-guide.pdf
npm run publication:epub # 生成 output/epub/harness-engineering-guide.epub
```

`npm run publication:all` 同时生成 PDF 与 EPUB；`npm run release:build` 构建网站及两种离线版本。生成目录均已加入 `.gitignore`。

## 在线站点与 Release 归档

仓库包含两个独立的发布工作流：

1. `.github/workflows/deploy-pages.yml` 在 `main` 更新后构建 VitePress、检查 308 个页面的站内链接并部署 [GitHub Pages 在线站点](https://sandu1213.github.io/Harness-Engineering-Guide/)。
2. `.github/workflows/release-publications.yml` 在 GitHub Release 发布后检出该 Release 的标签提交，使用固定版本的 Pandoc 与 Typst 生成 PDF/EPUB，校验文件后上传到对应 Release。

工作流不会自行创建标签或 Release。Pages 已通过 `Deploy reading site` 工作流上线；当前中文版 [`v0.2.0`](https://github.com/Sandu1213/Harness-Engineering-Guide/releases/tag/v0.2.0) 已按 MIT 许可证发布，可下载 PDF 与 EPUB。

## 当前 Roadmap

1. 47 章、12 个附录、共享状态、最终全仓 Validation、完成审计、网站/PDF/EPUB 本地构建，以及 Pages/Release 自动化均已完成。
2. 后续候选是先以首页、出版说明、目录和一章正文试点 English 版本与中英文切换，再决定是否扩展到全书和英文 PDF/EPUB。

详见 [.context/ROADMAP.md](.context/ROADMAP.md)。

## 版权与来源

本仓库采用 [MIT License](LICENSE) 维护代码、模板和项目基础设施；书稿的发布许可证将在首次发布前单独决定并记录。Lilian Weng 的《Harness Engineering for Self-Improvement》是本书的思想来源之一，**不是**待翻译的原稿。本书以自己的结构、案例、图示和工程扩展重新创作；每项可归因事实都必须记录到 [.ai/references.md](.ai/references.md)。

## 后续发布目标

Markdown 是唯一源文件；VitePress 网站、Typst PDF 与 EPUB 3 已从同一份 47 章 + 12 附录清单生成并验证。后续发布目标是确定书稿许可证与版本号，启用 GitHub Pages，并发布首个带 PDF/EPUB 归档的 GitHub Release。
