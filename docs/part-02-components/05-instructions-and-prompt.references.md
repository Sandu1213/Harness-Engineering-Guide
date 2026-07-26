---
title: "第 5 章候选参考资料"
chapter: "05"
status: "sources-rechecked"
updated_at: "2026-07-26"
---

# 第 5 章候选参考资料

本清单记录第 5 章在 2026-07-15 实际访问的资料、允许用途和禁止外推范围。它不是 Prompt 模板库，也不表示具体产品能力在将来仍保持不变。全局登记见 [.ai/references.md](../../.ai/references.md)。

| ID | 来源 | 本章允许用途 | 不可用用途 | 复核状态 |
| --- | --- | --- | --- | --- |
| REF-010 | OpenAI, [Model Spec (2025-10-27)](https://model-spec.openai.com/2025-10-27)。 | 说明该公开 Spec 的 root、system、developer、user、guideline 权威链及“生产模型未必完全反映 Spec”的边界。 | 通用化为所有产品的消息优先级，或声称任何模型运行时必然遵从。 | 2026-07-15 已访问。 |
| REF-005 | OpenAI Codex Manual, [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md)。 | Codex 的项目指令发现、组合与目录邻近覆盖行为。 | Claude Code、其他 Agent、权限控制或通用消息角色行为。 | 2026-07-15 已重新访问。 |
| REF-006 | Anthropic, [How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory)。 | `CLAUDE.md` 作为持久项目指令上下文，与自动记忆的区分。 | Codex 的加载机制，或强制执行、安全边界的证明。 | 2026-07-15 已重新访问。 |
| REF-011 | Google, [Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)，2026-06-10 更新。 | 清晰具体指令、复杂 Prompt 组件化，以及复杂 JSON Schema 使用该产品 structured output 的建议。 | 跨模型正确性保证、Schema 语义保证或固定 API 字段。 | 2026-07-15 已访问。 |
| REF-012 | Google, [Structured outputs](https://ai.google.dev/gemini-api/docs/structured-output)，2026-07-07 更新。 | 语法正确 JSON 仍须由应用验证值和业务逻辑的边界。 | 产品 Schema 子集、SDK 行为或业务正确性的跨平台保证。 | 2026-07-15 已访问。 |
| REF-013 | Anthropic, [Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)。 | 清晰明确的输出和约束、用标签区分指令/上下文/示例/输入的建议。 | 将标签视为安全边界、通用语法或性能承诺。 | 2026-07-15 已访问；页面未显示稳定发布日期。 |
| REF-014 | OpenAI, [API Overview — Backwards compatibility](https://platform.openai.com/docs/api-reference/backward-compatibility)。 | 模型快照间 Prompt 行为可能变化、固定版本和运行 evals 的官方建议。 | 保证固定版本或评估消除输出变化，或作为其他产品的 API 承诺。 | 2026-07-15 已访问；页面未显示稳定发布日期。 |
| REF-148 | [pi 仓库 README](https://github.com/earendil-works/pi)。 | 以访问日文档为准，说明 pi 的默认 Agent 面只暴露四个工具，额外只读工具组默认关闭。 | 不外推为其他 Harness 的工具预算、长期默认值、安全属性或性能结果。 | 2026-07-26 已访问。 |
| REF-149 | Mario Zechner, [What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)。 | 作者关于系统提示词加工具定义低于 1000 token、四工具足够及最小指令面的构建自述。 | 不把作者自述写成跨模型保证、通用最佳值、Terminal-Bench 名次或本书实测结果。 | 2026-07-26 已访问。 |

## 使用约束

- 来源事实紧邻原始 URL 归因；其余结构、冲突矩阵、案例、图示和示例均以“本书工程扩展”或“教学设计”标明。
- 不复制来源的 Prompt 模板、长段示例或供应商专有字段。
- 正文写作当天重新核验动态产品事实，并把新建的字段级陈述补充到事实核验清单和全局引用登记。
- 已于 2026-07-26 通读 REF-148 与 REF-149；正文只使用四工具、默认关闭的只读工具组和作者自述的 Prompt/工具预算，不引入排名、动态统计或未登记细节。
