---
title: "第 37 章 Fact Check"
chapter: "37"
stage: "Fact Check"
status: "completed"
updated_at: "2026-07-16"
---

# 第 37 章 Fact Check

## 范围

- 重读 REF-020、REF-022、REF-024 与 REF-025，并将可归因陈述、适用范围和不可外推边界记录到 `37-memory-and-skill-design-patterns.fact-check.md`。
- 核对正文把记忆分类、Evidence Card、契约、审查、生命周期、图示、示例与教学状态明确区分为本书模型或虚构输入。
- 复核实际纯内存示例状态；不修改共享 npm 入口、进度或上下文状态。

## 来源级结论

- REF-020 只支持 OpenAI Agents SDK Sessions 的特定 session 历史、每轮前后读取／保存顺序和与服务端延续机制不能叠加的限制。
- REF-022 只支持 LangChain 的 thread-level 短期记忆及跨对话长期数据的框架语境；不将 store、namespace 或 key 写成授权、隔离或正确性保证。
- REF-024 只支持 Agent Skills Specification 的 `SKILL.md` 目录、YAML frontmatter、Markdown 指令与资源渐进加载结构。
- REF-025 只支持 Claude Code 的 Skill 发现、激活与加载语义；不将其写成常驻项目指令的通用对比、跨产品行为、权限或执行证明。

## 正文修订

- 将三处 Claude Code 表述从“按需 Skill 与常驻项目指令的区分”收紧为该来源直接说明的 Skill 发现、激活与上下文加载；将“过程型 Skill 与常驻项目上下文分开审查”标识为本书工程约束。
- 新增事实核验链接，并将已完成的 Technical Review 与 Fact Check 从后续 Language Editing／Final Review 中分开勾选。

## 实际验证与限制

- `node --test examples/agent/memory-skill-boundary-assessment.test.mjs`：退出码 0，8 项通过、0 项失败。
- `node examples/agent/memory-skill-boundary-assessment.mjs`：退出码 0，只输出 `ready_for_isolated_example`、`memory_skill_boundary_ready`、`continue_read_only_assessment` 与 `executionPerformed: false`。
- 未运行全仓 `npm run validate`；没有运行或模拟真实 Session、项目记忆、向量检索、嵌入、Skill、模型、数据库、文件、网络、同步、账户、凭证、权限、审查、批准、Git、浏览器或外部系统。
