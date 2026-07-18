---
title: "第 28 章 Research Brief：从零搭建最小 Harness"
chapter: "28"
status: "completed"
updated_at: "2026-07-16"
---

# 第 28 章 Research Brief：从零搭建最小 Harness

## 研究问题

读者已经在前文见过指令、状态、Tool、环境、评估和证据。本章只解决一个更窄的问题：在不引入真实模型、网络、文件写入、凭证或产品运行时的前提下，怎样从零做出一个能拒绝不完整任务的最小 Harness？

这里的“搭建”不是把一个聊天循环包装成产品，也不是承诺一个真实 Agent 已能工作。它是把五项最小、可检验的职责装进一个纯内存准入器：输入契约、任务状态、Tool 准入、证据计划和停止条件。只有这些输入同时成立，教学任务才可以进入后续的内存求值步骤。

## 读者与前置

- 读者：能阅读 JavaScript 对象和条件分支的工程、测试或 AI 从业者。
- 必需前置：第 01 章的“提议、行动、验证”区分；第 10 章的状态；第 11、12 章的 Tool 与环境边界；第 17 章的验收；第 18 章的停止与恢复。
- 不要求：模型账户、API 密钥、MCP Server、Docker、浏览器、真实文件或网络访问。

## 可归因材料与允许用途

| 本地键 | 一手来源 | 写作日核验到的有限内容 | 本章允许用途 | 不可外推 |
| --- | --- | --- | --- | --- |
| CH28-REF-01 | Lilian Weng，《Harness Engineering for Self-Improvement》 | 作者把 Harness 描述为围绕基础模型、协调执行、工具、上下文、工件与评估的系统。 | 说明本书为何把最小 Harness 写成“围绕模型的工程结构”，而非单个 Prompt。 | 不是本章数据结构、Node 实现、产品行为或可靠性证明。 |
| CH28-REF-02 | Node.js Test Runner 官方文档 | 官方文档说明 `node:test` 可用于定义测试，`node --test` 可执行测试文件。 | 解释本章用 Node 内置测试记录纯函数的红绿验证。 | 不证明生产 Harness、并发安全、外部 I/O、端到端流程或任何 Agent 产品能力。 |
| CH28-REF-03 | NIST AI RMF Core | 页面说明其框架为自愿性指导，行动不是必须按序执行的清单，并强调记录与测量的风险管理语境。 | 提醒读者：本章五个字段不是合规清单，风险更高时仍需按场景扩展。 | 不把 NIST 框架写成最小 Harness 规范、认证标准或法律结论。 |

具体 URL、访问日期、状态和正式引用登记要求见 [本章参考资料](28-minimal-harness-from-scratch.references.md)。正式 `REF-NNN` 由主线程统一分配前，本章只使用以上本地键。

## 本书工程模型

以下模型是本书的原创教学设计，不是三项来源给出的 schema：

| 工件 | 最小字段 | 它回答的问题 | 它故意不回答的问题 |
| --- | --- | --- | --- |
| Task Contract | `id`、`objective`、`state`、`allowedCapabilities` | 这是不是一个能被判断的任务？ | 真实需求是否完整、优先级是否正确。 |
| Tool Request | `id`、`capability`、`effect`、`target`、`input` | 请求是否在任务允许范围内？ | Tool 是否真实存在、是否可调用。 |
| Evidence Plan | `correlationId`、`observation`、`acceptance` | 后续要留下什么观察与验收条件？ | 已获得证据或外部效果已发生。 |
| Stop Conditions | 三类缺失的 `stop` 决策 | 输入不足时是否保守停止？ | 停止后的人工处理、恢复或重试策略。 |
| Admission Decision | `ready` 或 `stopped`、原因码、下一步 | 能否进入内存求值器？ | 任务是否完成。 |

## 核心论点与验证策略

1. **最小不等于省略边界。** 最小 Harness 可以不调用模型或真实 Tool，但不能把“目标、准入、证据、停止”塞回一段自由文本。
2. **准入、执行和完成是三种状态。** 本章函数只产生 `ready` 或 `stopped`，且明确 `executionPerformed: false`；它不执行 Tool，也不宣布任务完成。
3. **证据计划不是证据结果。** `Evidence Plan` 只声明何时、以什么关联标识、观察什么、如何验收；真实结果要在动作之后独立记录。
4. **保守停止是可解释结果。** 合同、范围、证据计划或停止条件缺失时，返回具体原因码比默认继续更适合教学和交接。

## 计划交付与验证

| 交付物 | 路径 | 可检查条件 |
| --- | --- | --- |
| 正文 | `28-minimal-harness-from-scratch.md` | 原创说明、案例、边界、图示和示例说明齐全。 |
| 研究与提纲 | 本文件与 `.outline.md` | 事实、工程模型和未覆盖范围分开。 |
| 示例 | `examples/agent/minimal-harness-admission-assessment.{mjs,test.mjs}` | 先记录模块缺失红灯，再运行 7 项 Node 测试与演示。 |
| 图示 | `chapter-28-minimal-harness-loop.mmd` 与导出图 | 图文同名、可渲染，清楚呈现 `ready` 与 `stopped` 分支。 |
| 核验与审查 | `.fact-check.md` 与五份 review | 每项来源、示例、图示与语言边界可追溯。 |

## 研究结论与写作边界

本章把“最小 Harness”限制为**纯内存准入闭环**：检查任务合同、检查 Tool 请求、要求证据计划、要求停止条件，并返回可解释的下一步。它不构造真实模型、Agent、Tool、文件、网络、沙箱、队列、数据库、审批系统或持续状态。读者要扩展到有副作用的环境时，应转向第 11、12、14、17、18 与第 41 章的专门边界，而不是把本章示例直接当成生产基线。
