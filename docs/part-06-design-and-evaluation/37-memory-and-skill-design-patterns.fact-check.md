---
title: "第 37 章事实核验：Memory 与 Skill Design Patterns"
chapter: "37"
status: "completed"
updated_at: "2026-07-16"
---

# 第 37 章事实核验：Memory 与 Skill Design Patterns

## 核验范围

本轮重读正文中可归因给 OpenAI Agents SDK、LangChain、Agent Skills Specification 与 Claude Code 的陈述。会话、任务、项目与事件记录的分类，Evidence Card、读写门、生命周期记录、项目适配层、只读／提议写入 Skill、教学状态、虚构案例、图示和纯内存评估器都是本书工程模型或注入的教学对象，不归因于外部资料。

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-37-01 | OpenAI Agents SDK 的 Sessions 在特定 session 的多次 run 间维护对话历史；运行器在每次 run 前取回历史、在 run 后保存该轮新产生的项，且不能在同一 run 中与 `conversation_id`、`previous_response_id` 或 `auto_previous_response_id` 叠加。 | REF-020，2026-07-16 通过 AgentReach 的网页读取路径重读 OpenAI 官方 SDK 页面。 | 可作为该 Python SDK 的会话历史边界；不支持通用长期记忆、项目知识库、跨项目复用、数据可靠性、审查、权限、隔离、保留、删除或真实执行结论。 |
| FC-37-02 | LangChain 的短期记忆页面将短期记忆表述为 thread-level persistence，并将跨对话信息指向长期记忆；长期记忆页面说明其用于跨不同对话保存与召回数据，并以 store 中的 JSON 文档为例。 | REF-022，2026-07-16 通过 AgentReach 重读 LangChain 的 short-term memory 与 long-term memory 官方页面。 | 可作为 thread 范围与跨对话数据的框架背景；不支持命名空间或存储自动完成授权、租户隔离、正确性、删除、隐私、跨框架兼容或本书 Evidence Card 的字段定义。 |
| FC-37-03 | Agent Skills Specification 规定最小 Skill 目录包含 `SKILL.md`，该文件含 YAML frontmatter 与 Markdown 内容；规范将 metadata、完整 `SKILL.md` 与可选资源描述为渐进加载层次。 | REF-024，2026-07-16 通过 AgentReach 重读一手规范页面。 | 可作为 Skill 信息组织与渐进加载的规范背景；不支持所有 Agent 的自动发现、工具授权、执行顺序、权限或安全行为。 |
| FC-37-04 | Claude Code Skills 页面说明项目与嵌套目录中的 Skill 发现、调用时完整内容加载及相关上下文生命周期；这些机制属于 Claude Code 的产品实现。 | REF-025，2026-07-16 通过 AgentReach 重读 Claude Code 官方文档。 | 可作为该产品的发现、激活与加载背景；不支持把 Skill 与常驻项目指令的关系外推为其他产品行为，也不支持权限、隔离、工具调用或写入已经发生。正文已将原先过宽的“与常驻项目指令区分”改为来源可直接支持的表述。 |

CH37-REF-01 至 CH37-REF-04 分别映射 REF-020、REF-022、REF-024、REF-025；上述映射只支持本表中的限定陈述。

## 本书工程模型与教学输入

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-37-01 | 会话历史、任务范围记忆、项目记忆、事件记录、决策记录、Evidence Card、读写门与生命周期记录。 | 是本书的责任模型，不是任何 SDK、框架或规范的 schema、存储设计、权限模型或自动治理能力。 |
| EM-37-02 | 只读／提议写入 Skill 契约、Project Adapter、`evidence_candidate`、`proposed_write`、`needs_refresh`、`needs_evidence` 与 `conservative_stop`。 | 是教学路由；不代表来源已读取、事实已核验、项目记忆已更新、审查已完成或外部效果已发生。 |
| EM-37-03 | 虚构事实核验请求、三张候选卡、图中节点与纯内存 `assessMemorySkillBoundary(card)`。 | 只处理注入字段；不读取真实项目、启动或发现 Skill、访问模型、网络、数据库、文件、Git、账户、凭证、同步、审批或外部系统。 |

## 本次实证与未核验范围

- 已运行 `node --test examples/agent/memory-skill-boundary-assessment.test.mjs`：8 项通过、0 项失败。
- 已运行 `node examples/agent/memory-skill-boundary-assessment.mjs`：只输出 `ready_for_isolated_example`、`memory_skill_boundary_ready`、`continue_read_only_assessment` 与 `executionPerformed: false`。
- 未运行全仓 `npm run validate`；共享 npm 入口、状态工件和全仓校验由主线程统一收口。
- 未运行或模拟真实 Session、项目记忆、向量检索、嵌入、Skill、模型、数据库、文件、网络、同步、账户、凭证、权限、审查、批准、Git、浏览器或外部系统。公开资料的只读获取不构成上述系统执行证据。
