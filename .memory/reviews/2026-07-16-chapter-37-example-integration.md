---
title: "第 37 章 Example Implementation"
chapter: "37"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-16"
---

# 第 37 章 Example Implementation

- 交付：`memory-skill-boundary-assessment.mjs`、同名 Node 内置测试和 [示例计划](../../docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.example-plan.md)。
- RED：`node --test examples/agent/memory-skill-boundary-assessment.test.mjs` 在模块创建前以 `ERR_MODULE_NOT_FOUND`、退出码 1 结束。
- GREEN：同一命令在实现后为 8 项通过、0 项失败；演示输出 `ready_for_isolated_example / memory_skill_boundary_ready / continue_read_only_assessment / executionPerformed: false`。
- 集成：`test:memory-skill-boundary-assessment` 与 `example:memory-skill-boundary-assessment` 已写入 `package.json`，总校验会运行该测试组。
- 边界：只检查注入的任务、证据、Skill、生命周期与执行字段；不读取或保存记忆、发现或运行 Skill、同步、授权或执行外部动作。
