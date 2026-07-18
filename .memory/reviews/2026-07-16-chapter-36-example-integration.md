---
title: "第 36 章 Example Implementation"
chapter: "36"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-16"
---

# 第 36 章 Example Implementation

- 交付：`harness-pattern-selection-assessment.mjs`、同名 Node 内置测试和 [示例计划](../../docs/part-06-design-and-evaluation/36-harness-design-patterns.example-plan.md)。
- RED：模块创建前测试以 `ERR_MODULE_NOT_FOUND`、退出码 1 结束。
- GREEN：`node --test examples/agent/harness-pattern-selection-assessment.test.mjs` 为 8 项通过、0 项失败；演示输出 `ready / controlled_single_loop_ready / continue_controlled_single_loop / executionPerformed: false`。
- 集成：`test:harness-pattern-selection-assessment` 与 `example:harness-pattern-selection-assessment` 已写入 `package.json`，总校验会运行该测试组。
- 边界：只比较注入模式卡；不启动 Agent、工作者、计划、事件、队列、工作流或并发，也不访问任何外部系统。
