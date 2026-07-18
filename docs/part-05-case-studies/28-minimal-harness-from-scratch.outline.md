---
title: "第 28 章详细提纲：从零搭建最小 Harness"
chapter: "28"
status: "completed"
updated_at: "2026-07-16"
---

# 第 28 章详细提纲：从零搭建最小 Harness

## 章节目标

读者完成本章后能够：

- 用 Task Contract、Tool Request、Evidence Plan 和 Stop Conditions 说明一个最小 Harness 的输入接口。
- 区分 `ready`、`stopped`、已执行和已完成四种不同陈述。
- 在 Tool 无副作用且目标为内存时，判断请求是否在任务允许范围内。
- 为输入缺失、状态不对、能力越界、副作用、证据关联错误和停止条件缺失建立可验证的拒绝路径。
- 说明这套最小教学实现离真实 Agent、Tool 和生产系统还缺什么。

## 核心问题

1. 什么才是最小而不失去工程边界的 Harness？
2. 为什么要在 Tool 调用前先检查合同、范围、证据计划和停止条件？
3. `ready` 为什么既不表示 Tool 已执行，也不表示用户目标已经完成？
4. 最小示例如何通过失败路径证明“不会默认继续”？
5. 哪些需求一出现就必须离开本章的纯内存范围？

## 章节结构

| 小节 | 主要论证 | 计划工件或读者产出 |
| --- | --- | --- |
| 为什么从最小闭环开始 | 先让边界可见，再增加模型或外部效果。 | 最小 Harness 与空 Prompt loop 的对照。 |
| 场景：内存标签分类 | 任务只允许一个无副作用的能力；成功不是“分类完成”，而是“可安全进入求值”。 | 任务、Tool、证据和停止表。 |
| 五个最小工件 | 分别说明 Task Contract、Tool Request、Evidence Plan、Stop Conditions、Decision。 | 字段—问题—非结论表。 |
| 准入、执行与完成 | 将状态强度分层，拒绝从 `ready` 推导出完成。 | 状态语义表。 |
| 准入流程 | 先合同，再状态、停止条件、范围、效果、证据关联。 | Mermaid 决策图与七条测试路径。 |
| 最小 Node 示例 | `assessMinimalHarnessAdmission` 仅分类输入。 | 7 项 Node 内置测试与演示命令。 |
| 逐步增强 | 按风险而不是按“功能清单”加真实 Tool、观察、持久化与审批。 | 升级触发表。 |
| 完整教学案例 | 用“标签分类准入”表现交接、拒绝和人工补充契约。 | 输入、决定、停止条件矩阵。 |
| 边界与练习 | 识别何时不能使用本章实现。 | 两道设计练习。 |

## 计划图示

- **问题：** 一个候选任务在什么条件下能进入内存求值？
- **图源：** `diagrams/mermaid/chapter-28-minimal-harness-loop.mmd`。
- **节点：** Task Contract、Task State、Stop Conditions、Tool Request、Evidence Plan、`ready`、`stopped`、In-memory Evaluator、Result Evidence。
- **关键关系：** 五项输入必须先通过准入；任何一项不足都进入带原因码的 `stopped`；`ready` 只允许后续求值，不能绕过证据记录。
- **明确边界：** 图不表示真实模型、工具调用、文件写入、网络、日志、数据库或生产状态机。

## 计划示例

- **模块：** `assessMinimalHarnessAdmission(candidate)`。
- **输入：** 调用者构造的 Task Contract、Tool Request、Evidence Plan 和 Stop Conditions。
- **接受条件：** 任务已 `ready`，请求能力在范围内，效果为 `none`、目标为 `in-memory`，证据计划可关联，三类停止条件显式为 `stop`。
- **拒绝条件：** 合同缺失、状态不是 `ready`、能力越界、副作用不是 `none`、证据无法关联或停止条件缺失。
- **验证：** `node --test examples/agent/minimal-harness-admission-assessment.test.mjs` 与 `node examples/agent/minimal-harness-admission-assessment.mjs`。
- **不可声明：** 示例不产生分类结果，不调用模型或 Tool，不产生外部效果，不证明安全、性能、并发或生产可用性。

## 前后章节关系

- **承接：** 第 01 章给出指令、状态、工具、验证和证据的概念闭环；第 10 至 18 章分别补充状态、Tool、环境、审批、观察、评估和恢复。
- **本章定位：** 用一个案例把这些概念压缩成可运行、可拒绝的最小入口，而不重复各专章的详细设计。
- **后续：** 第 29 至 35 章把 Harness 扩展到软件工程、交付、测试、Bug 修复、项目记忆、Skill Library 和企业架构；第 41 章会进一步处理安全、权限与审计。

## 预计交付物

- 章节正文、Research Brief、事实核验清单、参考资料候选清单与示例计划。
- Mermaid 源图及 SVG/PNG 导出图。
- 纯内存 Node 示例及 7 项单元测试。
- Technical Review、Example Integration、Diagram Review、Language Edit 与 Final Review 记录。
