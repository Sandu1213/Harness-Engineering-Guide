---
title: "第 26 章候选参考资料：多 Agent 协作与任务隔离"
chapter: "26"
status: "registered"
updated_at: "2026-07-16"
---

# 第 26 章候选参考资料：多 Agent 协作与任务隔离

> 已完成全局映射：`CH26-REF-01` → `REF-030`、`CH26-REF-02` → `REF-085`、`CH26-REF-03` → `REF-001`。本章只使用来源直接支持的产品或作者观点；任务契约、所有权、交付包和集成门均为本书工程模型。

| 本地键 | 正式键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH26-REF-01 | REF-030 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 官方 SDK 文档 | 2026-07-16 | Python SDK 文档把编排分为由 LLM 决策与由代码确定流程两类；列出 manager（agents as tools）和 handoff 两种常见模式，并指出互不依赖的任务可并行以缩短时间。 | 不将 SDK 的 API、并行实现、性能、可恢复性、隔离、权限或默认安全行为写成跨框架事实；不表示本章运行了 SDK 或多个 Agent。 |
| CH26-REF-02 | REF-085 | [OpenAI Agents SDK：Handoffs](https://openai.github.io/openai-agents-python/handoffs/) | 官方 SDK 文档 | 2026-07-16 | Python SDK 的 handoff 将任务交给指定 Agent；文档说明可为 handoff 提供输入 schema 和 input filter，并明确 handoff 位于一次 run 内。 | 不将该 SDK 的会话历史、输入过滤、guardrail 顺序或 run 语义外推为本书交接包格式、跨会话交接、跨产品协议或真实消息系统。 |
| CH26-REF-03 | REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | 作者原始文章 | 2026-07-16 | 文章将 Harness 概括为协调 prompts、tool calls、subagents、control flow、memory 与 workflow logic 的代码；还强调可编辑面和权限控制应与改进循环分层。 | 不将文章所列研究、实验、性能或产品例子写成本章示例、任何真实多 Agent 系统或本书目录的实现事实。 |

## 使用规则

- `Task Contract`、`Ownership Claim`、`Delivery Package`、`Integration Gate` 和本章状态名均是本书工程模型，不是 SDK schema、文件锁、消息协议或 Git 工作流。
- 纯内存示例只能判断调用者传入的路径、所有者、共享工件和验收字段；它不会创建 Agent、子进程、worktree、文件锁、浏览器会话、消息、文件或网络访问。
- 产品与在线资料后续用于修订时，必须重新读取同一官方或作者原始页面，再决定是否保持当前限定陈述。

## 候选资料完成检查

- [x] 每条资料均记录固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 已登记本地键到 `.ai/references.md` 的正式映射。
- [x] 未用来源替代本章的工程模型，也未把产品机制写成真实运行证据。
