---
title: "第 36 章事实核验：Harness Design Patterns"
chapter: "36"
status: "completed"
updated_at: "2026-07-26"
---

# 第 36 章事实核验：Harness Design Patterns

## 核验范围

本轮逐项重读正文中可归因给 Anthropic、OpenAI Agents SDK、AWS Step Functions、CloudEvents 与 Node.js 的陈述。模式卡（Pattern Card）、结果所有者（Result Owner）、五种模式的选择条件、升级阈值、停止规则、教学状态与虚构文件修复请求均是本书工程模型或注入的教学输入，不归因于外部资料。

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-36-01 | Anthropic 区分由预定义代码路径编排 LLM 与工具的 workflow，和由 LLM 动态决定过程及工具使用的 agent；该文章建议先找最简单的方案，只在需要时增加复杂度。 | REF-029，2026-07-16 通过 AgentReach 的网页读取路径重读官方工程文章。 | 可作为 workflow／agent 区分与复杂度取舍的有限工程建议；不支持跨产品分类标准、固定选型算法、性能、成本、延迟、安全或真实运行结论。 |
| FC-36-02 | OpenAI Agents SDK 的 Python 文档把编排分为 LLM 决策与代码编排；其 `Agent.as_tool()` 的 manager、handoff、串联、评估循环和独立任务并行都在该 SDK 语境中说明。 | REF-030，2026-07-16 通过 AgentReach 重读 OpenAI 官方 SDK 文档。 | 可作为产品特定的编排例子；不支持其他 SDK 具有同一接口、handoff 安全、并发隔离、任务完成或真实运行。 |
| FC-36-03 | AWS Step Functions 将 workflow 描述为一组事件驱动步骤的状态机，并说明 Choice、Wait、Map 与 Parallel 等流控制状态。 | REF-031，2026-07-16 通过 AgentReach 重读 AWS 官方文档。 | 可作为该产品中状态机和流控制的背景；不支持把 Amazon States Language、执行、数据传递、错误处理或恢复语义写成通用 Harness 契约。 |
| FC-36-04 | CloudEvents 将 event 定义为表达一次发生及其上下文的数据记录，并定义 producer、consumer 与 intermediary。 | REF-114，2026-07-16 通过 AgentReach 读取 CloudEvents 规范的原始文件；页面标示为 `1.0.3-wip`。 | 可作为事件记录、上下文和角色术语的规范背景；不支持投递顺序、至少一次／恰好一次、去重、重试、授权、事件总线可用性或任何生产实现结论。 |
| FC-36-05 | Node.js `EventEmitter` 使用命名事件；在该运行时中，触发事件时监听器按注册顺序同步调用。 | REF-115，2026-07-16 通过 AgentReach 重读 Node.js 官方 API。 | 可作为 Node.js 特定的监听器语义；不支持消息队列、浏览器事件、CloudEvents、云服务或其他运行时的顺序、异步、可靠性或错误传播结论。 |
| FC-36-06 | pi 公开资料展示了极小默认工具面、可见提示词、有意省略部分内置能力，以及将隔离和权限交给外部环境的设计。 | REF-148、REF-149，2026-07-26 已读取项目 README 与作者构建札记。 | 可作为“减少常驻 Harness 面积并逐项证明必要性”的设计样本；不支持四工具适用于所有任务、无权限系统更安全或更短提示词必然更好。 |
| FC-36-07 | 作者在特定环境中比较 MCP 工具定义与 CLI README 的 token 占用，并主张按需读取文档的渐进披露路径。 | REF-150，2026-07-26 已读取作者原文。 | 可支持矩阵中的 CLI 加文档候选路径；实验数字只属于作者当时环境，不支持“MCP 总是更差”。 |
| FC-36-08 | pi 官方文档描述扩展事件与注册面、JSONL 会话树、分支／恢复及结构化 compaction；第三方文章描述最小内核加可持久扩展和代理生成扩展的使用观察。 | REF-151、REF-152，2026-07-26 已读取文章与官方文档。 | 可支持扩展、会话隔离和压缩的访问日设计样本；不支持扩展已安全、压缩无损、其他 Harness 接口相同或动态细节长期不变。 |
| FC-36-09 | 作者构建札记讨论供应商线协议差异、跨供应商上下文转换、中止、部分结果与 best-effort 用量计量，并把提示词稳定性视为行为可复现的一部分。 | REF-149，2026-07-26 已读取作者原文。 | 可支持矩阵中的显式兼容层与提示词版本治理；不支持供应商可无差异替换、兼容性已经完成或作者评测等于本书评测。 |

CH36-REF-01 至 CH36-REF-05 分别映射 REF-029、REF-030、REF-031、REF-114、REF-115；上述映射只支持本表中的限定陈述。

CH36-REF-06 至 CH36-REF-10 分别映射 REF-148 至 REF-152。“Pi 借鉴矩阵”的采用建议、护栏与不照搬项是本书工程判断，不归因于任一来源，也不代表本仓库运行或移植过 pi。

## 本书工程模型与教学输入

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-36-01 | Pattern Card 的字段、Result Owner、受控单循环、计划—执行、监督者—工作者、流水线和事件驱动的比较条件。 | 是原创的控制流比较工具，不是 Anthropic、OpenAI、AWS、CloudEvents 或 Node.js 的 schema、API、部署设计或默认选型。 |
| EM-36-02 | `insufficient_contract`、`conservative_stop`、`requires_approval`、`requires_human_review`、`ready` 与升级记录。 | 是本章教学路由，不代表批准、投递、执行、恢复、外部效果或任何产品状态。 |
| EM-36-03 | 虚构只读文件修复请求、`analysis_ready`、工作者、阶段、消费者与模式提案。 | 只接受注入的教学对象；不对应真实仓库、文件、错误、测试、队列、账户、凭证或外部系统。 |
| EM-36-04 | 纯内存 `assessHarnessPatternSelection(card)`、模式选择图与其 `ready` 结果。 | 只检查注入字段与固定的无执行标记，不调度 Agent、工作者、计划、流水线、事件、队列、工作流、并发、工具或外部 I/O。 |

## 本次实证与未核验范围

- 已运行 `node --test examples/agent/harness-pattern-selection-assessment.test.mjs`：8 项通过、0 项失败。
- 已运行 `node examples/agent/harness-pattern-selection-assessment.mjs`：只输出 `ready`、`controlled_single_loop_ready`、`continue_controlled_single_loop` 与 `executionPerformed: false`。
- 2026-07-26 已运行全仓 `npm run validate`：退出码 0；629 个 Markdown 文件 lint 0 错误，链接、47 组章节示例测试与 47/47 章节状态检查通过。
- 2026-07-26 已运行 `npm run site:build` 与 `npm run site:check`：构建成功，308 个 HTML 页面无缺失本地链接；Playwright 打开第 36 章、观察 Pi 借鉴矩阵并点击“第 5 章”，最终进入对应正文且控制台 0 错误。
- `impeccable detect` 对第 36 章构建 HTML 报告 1 项破折号用量 warning 与 1 项编号标记 advisory；前者来自全章既有模式术语，后者来自站点章节编号，均为非阻塞设计建议。
- 除上述本地在线阅读验证外，未运行或模拟真实 Agent、模型、工作者、队列、事件总线、调度器、工作流、并发、外部工具、Git、CI、文件修改、网络服务、账户、凭证、审批、事件投递、文件修复或外部系统。
