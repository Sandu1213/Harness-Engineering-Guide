---
title: "第 39 章 Example Implementation"
chapter: "39"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-17"
---

# 第 39 章 Example Implementation

- 交付：`harness-evaluation-plan-assessment.mjs`、同名 Node 内置测试和[示例计划](../../docs/part-06-design-and-evaluation/39-harness-testing-strategy-and-benchmark.example-plan.md)。
- RED：模块创建前运行 `node --test examples/agent/harness-evaluation-plan-assessment.test.mjs`，以 `ERR_MODULE_NOT_FOUND`、退出码 1 结束。
- GREEN：添加纯内存函数后，同一命令以退出码 0 完成，8 项通过、0 项失败。
- 演示：`node examples/agent/harness-evaluation-plan-assessment.mjs` 以退出码 0 输出 `ready_for_benchmark / evaluation_plan_ready / continue_to_offline_review / executionPerformed: false`。
- 边界：只检查注入的套件、场景、试次、硬性门和比较版本；不运行模型、Harness、工具、Benchmark、网络、文件、权限、日志、CI、发布、回滚或任何外部操作。
- 集成建议：主线程后续可在 `package.json` 增加 `test:harness-evaluation-plan-assessment` 与 `example:harness-evaluation-plan-assessment`；本阶段按任务边界未修改共享 npm 脚本和总校验。

`ready_for_benchmark` 只表示教学对象具备进入离线复核的条件，不表示真实 Benchmark、评分器、任务或外部验证已经运行。所有函数出口固定 `executionPerformed: false`。
