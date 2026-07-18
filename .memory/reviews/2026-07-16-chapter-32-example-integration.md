---
title: "第 32 章 Example Implementation"
chapter: "32"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章 Example Implementation

## 交付内容

- 示例计划：`docs/part-05-case-studies/32-automated-failure-analysis-and-bug-fixing.example-plan.md`。
- 纯内存实现：`examples/agent/bug-investigation-assessment.mjs`。
- Node 内置测试：`examples/agent/bug-investigation-assessment.test.mjs`。
- npm 入口：`test:bug-investigation-assessment`、`example:bug-investigation-assessment`，以及总校验中的同名测试组。

## 红绿与运行证据

1. **RED：** 先创建测试 import，运行 `node --test examples/agent/bug-investigation-assessment.test.mjs`。
   - 实际结果：退出码 1，Node 报告 `ERR_MODULE_NOT_FOUND`；1 个测试文件加载失败。
   - 边界：仅证明教学模块在实现前不存在，不涉及真实 Bug、pytest、Playwright、浏览器、API 或 Git。
2. **GREEN：** 添加 `assessBugInvestigation(investigation)` 后重跑同一测试。
   - 实际结果：退出码 0，8 项通过、0 项失败。
3. **EXECUTE：** 运行 `node examples/agent/bug-investigation-assessment.mjs`。
   - 实际结果：退出码 0，输出 `ready`、`bug_investigation_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。

## 覆盖的教学契约

- 完整的症状、复现契约、可证伪假设、关联候选修复和双分支回归门只进入隔离实现阶段。
- 缺少复现、预测、区分性检查、被支持假设关联、原失败检查或修复后观察时返回 `stopped`。
- 请求环境执行时返回 `requires_approval`，而不是假定真实目标、权限或运行结果存在。

## 非范围

实现只检查注入对象并打印 JSON；它不复现失败、不改动补丁、不调用 pytest、Playwright、Git `bisect`、浏览器、API、网络、文件、CI、账户、凭证或外部系统。`ready` 只表示教学计划可以进入隔离实现，不表示问题已经修复或可以发布。
