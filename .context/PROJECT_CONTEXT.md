# Project Context

## 项目是什么

Harness Engineering Guide 是以 Markdown 维护的中文技术书项目，书名为《Harness Engineering：构建可持续进化的 AI Agent》。它同时是一套可复制的 AI Technical Book Factory：规则、上下文、模板、任务状态、审查清单、示例和校验共同构成可长期维护的写作 Harness。

## 本书解决的问题

读者需要的不只是“怎样写 Prompt”，而是如何把模型、指令、上下文、记忆、技能、工具、工作流、评估、权限和人类审批组合为可靠的软件系统。本书用工程实践解释这些部件的边界、接口、失败模式和验证方法。

## 内容边界

- 本书不是 Lilian Weng《Harness Engineering for Self-Improvement》的中文翻译或逐段改写。
- 该文章是思想来源之一；书稿以原创结构、案例和工程扩展呈现，且每个归因事实都需独立引用。
- 第 1 至 47 章均已完成 Research Brief、Outline、原创正文、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review；附录 A 至 L 已完成内容生产和分组独立终审。共享状态、最终全仓 Validation 与完成审计也已收口。网站、PDF、EPUB 本地管线与 GitHub Pages/Release 自动化已经实现；外部部署、版本标签、首个 Release 和书稿许可证仍需明确授权与真实验证。
- 动态的产品能力、API、版本、价格和策略在正式写作时必须查阅官方资料。

## 读者与交付格式

目标读者是工程、测试、AI 和技术管理人员，以及具备基础编程能力的学习者。源格式是 Markdown，需兼容 GitHub、Obsidian 和 VitePress，并为 PDF 与 EPUB 导出保留稳定结构。

## 内容与工程的事实来源

| 问题 | 首选事实来源 |
| --- | --- |
| 章节进度 | `.ai/progress.md` |
| 当前任务 | `NEXT_TASK.md` |
| 项目状态和阻塞 | `CURRENT_STATE.md` |
| 设计原因 | `DECISIONS.md` 与 `.memory/decisions/` |
| 书籍目录和依赖 | `.ai/outline.md` 与 `docs/SUMMARY.md` |
| 术语和引用 | `.ai/glossary.md` 与 `.ai/references.md` |
| 写作与验收规则 | `BOOK_RULES.md`、`STYLE_GUIDE.md` |

## 工作边界

一个任务只变更一类可验收产物，例如“第 1 章 Research Brief”或“链接校验脚本”。如变更会重排多个部分、改变目录、引入新的发布技术或改变许可证，先在 `DECISIONS.md` 记录理由和后果。
