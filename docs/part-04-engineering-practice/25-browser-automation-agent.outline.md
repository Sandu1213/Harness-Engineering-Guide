---
title: "第 25 章详细提纲：浏览器自动化 Agent"
chapter: "25"
status: "outline-complete"
updated_at: "2026-07-16"
---

# 第 25 章详细提纲：浏览器自动化 Agent

## 章节目标与依赖

本章把浏览器自动化从“能点击页面”组织为一条可追溯 E2E 证据链。读者需要已理解工具调用（第 11 章）、环境边界（第 12 章）、人工审批（第 14 章）、观察（第 15 章）、评估（第 17 章）与恢复（第 18 章）。

它承接第 24 章的外部工具接入，下一章将把同一证据链扩展到多 Agent 任务隔离。

## 逐节蓝图

| 节 | 需要回答的问题 | 核心工件或结论 | 边界 |
| --- | --- | --- | --- |
| 场景 | 为什么页面加载与 API 成功都不能证明用户路径？ | 订单提交教学案例与成功准则 | 不使用真实站点。 |
| 1 | 浏览器自动化工具提供了什么能力？ | WebDriver、CDP、Playwright 的受限对照 | 不做产品榜单或跨工具兼容承诺。 |
| 2 | 为什么定位、动作与业务完成不同？ | Locator、actionability、动作记录和效果未知 | 动作前检查不等于业务成功。 |
| 3 | 什么是本书的 E2E Evidence Contract？ | 范围、前快照、主动作、后快照、预期状态、限制 | 不是任何协议对象。 |
| 4 | 如何形成不跳步的 E2E 流程？ | 探测、定位、前快照、点击、后快照、判定与升级 | “点击后重新快照”是本书规则。 |
| 5 | 如何选择定位与观察？ | 用户可见契约、测试 ID、断言和独立验收 | 选择器不自动代表用户意图。 |
| 6 | 失败时怎样保守处理？ | 未派发、定位歧义、超时、效果未知、后状态不匹配 | 不自动重试或重放副作用。 |
| 7 | 示例 | 纯内存 Evidence Contract 判断器 | 不启动浏览器或验证 UI。 |
| 8 | 安全与长期运行 | 会话隔离、数据最小化、批准、记录和恢复交接 | 不提供合规承诺。 |

## 计划图示

- 文件：`diagrams/mermaid/chapter-25-browser-e2e-evidence-loop.mmd`。
- 读者问题：动作之后为什么仍需要同一范围内的重新观察？
- 结论：只有前后快照、主动作和预期状态能关联，才能进入“已观察”；仍需第 17 章的独立验收。

## 计划案例与示例

- **工程案例：** 测试环境的订单提交按钮。目标是观察到 `submitted` 状态，不把 HTTP 200、按钮点击返回或截图文件存在写成订单完成。
- **最小示例：** `assessBrowserE2EEvidence` 只检查注入对象，覆盖主点击缺失、前快照不完整、动作未派发、效果未知、快照次序不合法、后快照推测、状态不匹配与接受路径。
- **计划图：** 前快照 → 主点击 → 后快照 → 证据判定；不足则补证、停止或转交恢复，而不是宣布通过。

## 章节工作流状态

| 阶段 | 状态 | 工件 |
| --- | --- | --- |
| Research Brief | 完成 | `25-browser-automation-agent.research.md` |
| Chapter Outline | 完成 | 本文件 |
| First Draft | 完成 | `25-browser-automation-agent.md` |
| Technical Review | 完成 | `.memory/reviews/2026-07-16-chapter-25-technical-review.md` |
| Example Implementation | 完成 | `examples/agent/browser-e2e-evidence-assessment.*` |
| Diagram Review | 完成 | `chapter-25-browser-e2e-evidence-loop.*` 与审查记录 |
| Fact Check | 完成 | `25-browser-automation-agent.fact-check.md` |
| Language Editing | 完成 | 语言审查记录 |
| Final Review | 完成 | 最终审查记录；共享校验待主线程执行 |
