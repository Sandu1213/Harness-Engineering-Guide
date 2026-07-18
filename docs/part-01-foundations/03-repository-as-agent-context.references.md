---
title: "第 3 章候选参考资料"
chapter: "03"
status: "sources-rechecked"
updated_at: "2026-07-15"
---

# 第 3 章候选参考资料

本清单记录第 3 章可用来源及其严格用途。已核验只表示 2026-07-15 可支持表中限定的陈述；产品文档可能变化，正式正文前必须再次复核。

| ID | 来源 | 本章允许用途 | 不可用用途 | 复核状态 |
| --- | --- | --- | --- | --- |
| REF-005 | [OpenAI Codex Manual：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | Codex 的 `AGENTS.md` 项目指令发现、目录层级和组合顺序的官方说明。 | 推断其他 Agent 的加载算法、安全保证或未列出的产品行为。 | 2026-07-15 通过当日更新的 Codex 官方手册复核。 |
| REF-006 | [Anthropic：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | `CLAUDE.md` 的项目持久指令角色，以及“上下文不等于强制配置”的边界。 | 推断 Codex 行为、将指令文件写成权限控制或复述未使用的产品细节。 | 2026-07-15 复核官方文档。 |
| REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | Harness 与上下文、工件、评估相关的思想背景。 | 将本书的仓库目录模式归为来源作者的固定架构。 | 2026-07-15 已复核原文。 |

## 引用使用约束

- Codex 和 Claude Code 的文档只支持各自产品的公开行为；章节必须明示工具差异，不能混为平台标准。
- `AGENTS.md`、`CLAUDE.md`、`.context/`、`.memory/` 和 `.ai/` 的协作方式是本书工程设计，不是外部文档的原话。
- 正式正文写作前，针对产品行为重新查询官方文档；若 URL、加载规则或限制发生变化，更新事实核验清单而不是沿用本 Brief 的状态。
