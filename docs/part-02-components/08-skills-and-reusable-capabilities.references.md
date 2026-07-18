---
title: "第 8 章候选参考资料"
chapter: "08"
status: "sources-rechecked"
updated_at: "2026-07-15"
---

# 第 8 章候选参考资料

本清单记录第 8 章可追溯的候选来源和允许用途。它不替代正文写作日的复核，也不将一个来源的产品行为外推给其他 Agent、插件或权限系统。全局登记见 [.ai/references.md](../../.ai/references.md)。

| ID | 来源 | 本章允许用途 | 不可用用途 | 复核状态 |
| --- | --- | --- | --- | --- |
| REF-024 | [Agent Skills Specification](https://agentskills.io/specification)。 | `SKILL.md` 最小目录、必填元数据、可选资源目录、渐进加载与实验性 `allowed-tools` 的规范范围。 | 宣称所有产品实现全部字段；把 `allowed-tools` 写成真实授权。 | 2026-07-15 已复核规范。 |
| REF-025 | Anthropic, [Extend Claude with skills](https://docs.anthropic.com/en/docs/claude-code/skills)。 | Claude Code 的 Skill 入口、按需正文加载、项目/个人/插件位置和产品特有发现或优先级。 | 外推为其他产品的目录、自动调用、优先级或安全保证。 | 2026-07-15 已复核官方文档。 |
| REF-026 | OpenAI, [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)。 | ChatGPT 对可复用工作流、支持资源、共享、上传扫描与工作区管理边界的限定说明。 | 把扫描或工作区权限写成充分安全保证；外推为 Codex 权限或所有 OpenAI 表面的同步行为。 | 2026-07-15 已复核官方帮助页。 |
| REF-027 | OpenAI, [Plugins in ChatGPT and Codex](https://help.openai.com/en/articles/20001256-plugins-in-codex)。 | OpenAI Plugin 中 Skill、App、App template 的组合，以及 App 与源系统权限仍然适用的限定说明。 | 断言所有 Plugin 有相同结构；把 Plugin 安装或 Skill 指令写成 App 或源系统授权。 | 2026-07-15 已复核官方帮助页。 |

## 引用使用约束

- 使用规范时写明“规范规定”或“规范建议”，并保留产品实现差异。
- 使用产品资料时写明产品和适用范围，不以其目录、安装或管理行为定义抽象 Skill。
- Skill Contract、生命周期、Markdown 审查案例、测试清单和权限分层均为本书原创工程模型。
- 后续需要新的产品事实时，先登记到 `.ai/references.md`，再写入正文。
