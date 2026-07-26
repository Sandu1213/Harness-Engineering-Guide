---
title: "第 26 章 Fact Check：多 Agent 协作与任务隔离"
chapter: "26"
status: "completed"
sources:
  - "REF-030"
  - "REF-085"
  - "REF-001"
  - "REF-148"
  - "REF-149"
updated_at: "2026-07-26"
---

# 第 26 章 Fact Check：多 Agent 协作与任务隔离

## 来源级核验

| 本地键 | 写作日实际读取的来源 | 正文允许陈述 | 核验结论与外推禁区 |
| --- | --- | --- | --- |
| CH26-REF-01 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | Python SDK 文档区分 LLM 决策与代码编排，列出 manager/agents-as-tools、handoff，以及互不依赖任务可并行的限定建议。 | 正文不使用 SDK API 签名、性能数字、默认并发安全、恢复、隔离或权限结论；“任务契约”是本书模型。 |
| CH26-REF-02 | [OpenAI Agents SDK：Handoffs](https://openai.github.io/openai-agents-python/handoffs/) | Python SDK 文档将 handoff 描述为把任务交给指定 Agent 的机制，且可提供输入 schema 与 input filter；该机制留在一次 run 内。 | 正文不把 handoff 写成跨会话或跨工具交接，也不推导消息队列、文件锁、历史过滤或 guardrail 行为已在本章执行。 |
| CH26-REF-03 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | 文章将 Harness 概括为组织 prompts、tool calls、subagents、control flow、memory 与 workflow logic 的代码，并讨论将可编辑面与权限控制分层。 | 正文不使用文章的研究实验、模型、基准或系统细节来证明本书案例、示例或协作模式。 |
| CH26-REF-04 / REF-148 | [pi 仓库 README](https://github.com/earendil-works/pi) | pi 的开源项目背景与访问日文档入口。 | 不用 README 推断子代理立场、动态统计、长期产品结构或本章已运行 pi。 |
| CH26-REF-05 / REF-149 | [pi 作者构建札记](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) | 作者对内置子代理、上下文传递、并行生成和 `pi --print` 逃生路径的个人工程立场。 | 不写成多 Agent 的行业事实、其他 Harness 的缺陷、性能结论或本章运行证据。 |

## 本书模型核验

| 陈述 | 分类 | 核验方式 | 结论 |
| --- | --- | --- | --- |
| Task Contract 必含 owner、专属路径、验收和停止条件。 | 本书工程模型。 | 由示例输入与测试矩阵明确表达。 | 不是产品 schema、锁或真实权限。 |
| 一个共享工件应由 integration owner 收口。 | 本书工程模型。 | `requestedSharedWrites` 测试只路由到 `integration_owner`。 | 不说明集成者已经写入、被授权或通过全仓校验。 |
| 路径重叠应阻塞局部推进。 | 本书工程模型。 | 异 owner 重叠测试精确断言 `exclusive_path_already_claimed`。 | 不检测真实文件、语义冲突或外部资源竞争。 |
| Delivery Package 需要工件、验证、未覆盖范围和冲突。 | 本书工程模型。 | 正文、图示和案例对照同一字段。 | 不等于消息、提交、批准或集成接受。 |

## 实际执行核验

| 项目 | 命令或方法 | 实际结果 | 有限结论 |
| --- | --- | --- | --- |
| 红灯 | `node --test examples/agent/task-isolation-assessment.test.mjs`（模块创建前）。 | 退出码 `1`，`ERR_MODULE_NOT_FOUND`。 | 测试先于模块存在。 |
| 纯函数测试 | `node --test examples/agent/task-isolation-assessment.test.mjs`。 | 10 项通过、0 项失败。 | 仅证明注入对象上的确定性路由。 |
| 演示 | `node examples/agent/task-isolation-assessment.mjs`。 | 输出 `ready` / `isolated_task`。 | 不证明真实多 Agent、路径锁定或集成发生。 |
| 图示 | Mermaid CLI 导出 SVG/PNG，并人工查看 PNG。 | 见 Diagram Review。 | 图只表达本书工件流。 |

## 尚未声称的事实

- 本章没有创建、运行或观察真实多 Agent 协作、子进程、并行调度、worktree、文件锁、消息队列、浏览器会话或共享文件系统竞争。
- 本章没有验证任何产品的并发限制、会话隔离、文件发现、权限、外部写入、网络、凭证或恢复行为。
- 共享引用编号、词表、目录、npm 入口、项目状态与全仓校验由主线程统一更新；本地完成记录不能代替这些步骤。
- REF-148 与 REF-149 已于 2026-07-26 重读；正文将 pi 项目背景、作者反对子代理的立场与本书任务隔离模型分开，并明确未运行 pi。
