---
title: "第 26 章候选参考资料：多 Agent 协作与任务隔离"
chapter: "26"
status: "registered"
updated_at: "2026-07-26"
---

# 第 26 章候选参考资料：多 Agent 协作与任务隔离

> 已完成全局映射：`CH26-REF-01` → `REF-030`、`CH26-REF-02` → `REF-085`、`CH26-REF-03` → `REF-001`。2026-07-26 补写追加 `CH26-REF-04` → `REF-148`、`CH26-REF-05` → `REF-149`（正式编号已在 `.ai/references.md` 登记）。本章只使用来源直接支持的产品或作者观点；任务契约、所有权、交付包和集成门均为本书工程模型。

| 本地键 | 正式键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH26-REF-01 | REF-030 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 官方 SDK 文档 | 2026-07-16 | Python SDK 文档把编排分为由 LLM 决策与由代码确定流程两类；列出 manager（agents as tools）和 handoff 两种常见模式，并指出互不依赖的任务可并行以缩短时间。 | 不将 SDK 的 API、并行实现、性能、可恢复性、隔离、权限或默认安全行为写成跨框架事实；不表示本章运行了 SDK 或多个 Agent。 |
| CH26-REF-02 | REF-085 | [OpenAI Agents SDK：Handoffs](https://openai.github.io/openai-agents-python/handoffs/) | 官方 SDK 文档 | 2026-07-16 | Python SDK 的 handoff 将任务交给指定 Agent；文档说明可为 handoff 提供输入 schema 和 input filter，并明确 handoff 位于一次 run 内。 | 不将该 SDK 的会话历史、输入过滤、guardrail 顺序或 run 语义外推为本书交接包格式、跨会话交接、跨产品协议或真实消息系统。 |
| CH26-REF-03 | REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | 作者原始文章 | 2026-07-16 | 文章将 Harness 概括为协调 prompts、tool calls、subagents、control flow、memory 与 workflow logic 的代码；还强调可编辑面和权限控制应与改进循环分层。 | 不将文章所列研究、实验、性能或产品例子写成本章示例、任何真实多 Agent 系统或本书目录的实现事实。 |
| CH26-REF-04 | REF-148 | [pi 仓库 README（badlogic/pi-mono，现迁移至 earendil-works/pi）](https://github.com/earendil-works/pi) | 开源项目 README | 2026-07-26 | pi 是 Mario Zechner（GitHub 用户名 badlogic）开发的开源极简编码代理，2025 年 8 月创建，MIT 协议；2026 年 4 月起仓库迁移至 earendil-works/pi。 | 不引用 GitHub stars、下载量等动态数字；不把 README 的运行模式或工具清单写成本章验证过的行为；不据此描述子代理相关立场（该立场归 CH26-REF-05）。 |
| CH26-REF-05 | REF-149 | [Zechner, Mario. What I learned building an opinionated and minimal coding agent（2025-11-30）](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) | 作者原始博文 | 2026-07-26 | pi 无内置子代理工具；作者批评子代理是“a black box within a black box”；作者主张上下文收集在独立会话完成、固化为可复用工件后冷启动实现，并称并行 spawn 子代理实现多特性是反模式；确需子代理时经 bash 以 `pi --print` 非交互自我生成、可放进 tmux 观测。 | 不把作者立场写成无主语的行业事实；不写 Terminal-Bench 具体名次或分数；不据此断言子代理机制在其他 harness 中有害，也不表示本章运行或验证了 pi 的行为。 |

## 写作前复核事项

- 已于 2026-07-26 通读 REF-148、REF-149 对应来源（pi README 与作者博文），新增小节仅使用写作简报核定的事实与英文原话；`pi --print` 等命令与产品细节以访问日（2026-07-26）文档为准。

## 使用规则

- `Task Contract`、`Ownership Claim`、`Delivery Package`、`Integration Gate` 和本章状态名均是本书工程模型，不是 SDK schema、文件锁、消息协议或 Git 工作流。
- 纯内存示例只能判断调用者传入的路径、所有者、共享工件和验收字段；它不会创建 Agent、子进程、worktree、文件锁、浏览器会话、消息、文件或网络访问。
- 产品与在线资料后续用于修订时，必须重新读取同一官方或作者原始页面，再决定是否保持当前限定陈述。

## 候选资料完成检查

- [x] 每条资料均记录固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 已登记本地键到 `.ai/references.md` 的正式映射。
- [x] 未用来源替代本章的工程模型，也未把产品机制写成真实运行证据。
