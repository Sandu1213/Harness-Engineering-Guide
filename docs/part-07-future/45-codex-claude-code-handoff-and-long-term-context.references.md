---
title: "第 45 章参考资料：Codex、Claude Code 接力与长期项目上下文"
chapter: "45"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章参考资料：Codex、Claude Code 接力与长期项目上下文

> 本文件保留 `CH45-REF-*` 作为局部追溯键。产品行为只按 2026-07-17 官方资料限定；Shared Project Contract、Tool Adapter Profile、Handoff Package、State Conflict Record 与 Resume Gate 均为本书工程模型。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH45-REF-01 | REF-140 | [OpenAI Codex：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | 官方产品文档 | 2026-07-17 | `AGENTS.md` 的仓库指导、命令、约束、完成定义和层级语境。 | Claude Code 行为、规则必然遵守、权限或本仓库已正确配置。 |
| CH45-REF-02 | REF-141 | [OpenAI Codex：Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) | 官方产品文档 | 2026-07-17 | 独立任务可交给 subagent，主线程收集结果并可检查局部线程。 | 自动正确拆分、文件隔离、跨会话持久或结果已集成。 |
| CH45-REF-03 | REF-142 | [Claude Code：How Claude remembers your project](https://code.claude.com/docs/en/memory) | 官方产品文档 | 2026-07-17 | `CLAUDE.md`、导入、规则作用域和 auto memory 的产品入口。 | Codex 行为、项目状态已同步、记忆事实正确或规则必然执行。 |
| CH45-REF-04 | REF-143 | [Claude Code：Common workflows](https://code.claude.com/docs/en/common-workflows) | 官方产品文档 | 2026-07-17 | 恢复会话、worktree 并行和委派研究的当前工作流入口。 | 完整交接、永久存档、无冲突并行或外部状态仍新鲜。 |
| CH45-REF-05 | REF-144 | [Claude Code：Create custom subagents](https://code.claude.com/docs/en/sub-agents) | 官方产品文档 | 2026-07-17 | 非 fork subagent 的隔离上下文、custom subagent 的提示/工具/权限配置、fork 继承例外和摘要返回主会话。 | 跨会话协作、共享状态一致、自动事实核验或结果已验收。 |

## 使用规则

- 产品资料用于描述各自入口和能力，不建立虚构的 Codex/Claude Code 共同 API。
- 会话恢复、auto memory、subagent 与 worktree 都是产品/运行层能力，不替代仓库中的目标、状态、证据和交接。
- 本章不声称当前会话已启动另一个产品、创建 worktree、同步记忆、授予权限或执行外部动作。
- 动态页面在 First Draft、Technical Review、Fact Check 和出版前重读；精确命令、路径和 UI 若没有当前来源就不写入稳定结论。

## 完成检查

- [x] 五条产品资料均有全局映射、访问日期、允许用途和不可外推范围。
- [x] Codex 与 Claude Code 的产品事实分开，不把相似名词写成相同行为。
- [x] 产品能力、本书接力工件、仓库案例和计划纯内存示例保持分层。
- [x] 未编造模型、版本、权限、路径、命令结果、会话状态或外部动作。
