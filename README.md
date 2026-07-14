# Harness Engineering Guide

> 《Harness Engineering：构建可持续进化的 AI Agent》——以软件工程方式维护的中文技术书，以及可复用的 AI Technical Book Factory。

## 项目状态

项目骨架、治理规则、详细大纲和最小校验链路已经建立；书籍正文尚未开始。下一阶段是审查大纲，并为第一章建立 research brief。进度的唯一事实来源是 [.ai/progress.md](.ai/progress.md)。

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

## AI 如何加入

Codex 从 [AGENTS.md](AGENTS.md) 开始；Claude Code 从 [CLAUDE.md](CLAUDE.md) 开始。两者随后都必须阅读 [AI_BOOTSTRAP.md](AI_BOOTSTRAP.md) 和 [BOOK_RULES.md](BOOK_RULES.md)，再根据 `.context/NEXT_TASK.md` 领取一个可验收任务。

## 人类贡献者如何加入

请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)、[BOOK_RULES.md](BOOK_RULES.md) 与 [STYLE_GUIDE.md](STYLE_GUIDE.md)。章节或更正建议可使用 GitHub Issue 模板；所有内容都需要原创性、技术准确性和链接校验。

## 创建章节

```bash
./scripts/create-chapter.sh 01 从-prompt-到-harness docs/part-01-foundations
```

该命令复制章节模板、生成带编号的 Markdown 文件。创建后需更新 `docs/SUMMARY.md`、`.ai/outline.md` 和 `.ai/progress.md`。

## 运行校验

```bash
npm install
npm run lint:md
npm run check:links
npm run validate
```

`validate` 会执行所有已配置的 Markdown 校验。macOS 用户也可以直接运行 `./scripts/validate.sh`。

## 当前 Roadmap

1. 审查 47 章大纲、去除重复并确认依赖。
2. 为第一章完成 research brief 与章节 outline。
3. 建立首个可运行的最小 Harness 示例。
4. 以章节工作流逐步生产、审查、发布书稿。

详见 [.context/ROADMAP.md](.context/ROADMAP.md)。

## 版权与来源

本仓库采用 [MIT License](LICENSE) 维护代码、模板和项目基础设施；书稿的发布许可证将在首次发布前单独决定并记录。Lilian Weng 的《Harness Engineering for Self-Improvement》是本书的思想来源之一，**不是**待翻译的原稿。本书以自己的结构、案例、图示和工程扩展重新创作；每项可归因事实都必须记录到 [.ai/references.md](.ai/references.md)。

## 后续发布目标

Markdown 是唯一源文件，目标兼容 GitHub、Obsidian 与 VitePress；后续将从同一源生成网站、PDF 与 EPUB。
