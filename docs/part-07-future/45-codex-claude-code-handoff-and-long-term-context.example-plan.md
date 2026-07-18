---
title: "第 45 章示例计划：跨工具接力准入"
chapter: "45"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章示例计划：跨工具接力准入

## 目标与边界

`assessCrossToolHandoff(input)` 只判断调用方注入的 Shared Project Contract、来源与目标 Tool Adapter Profile、输入快照、Task Contract、Handoff Package、Capability Difference、State Conflict、Validation Evidence 和 Resume Request。它不读取仓库、文件、环境变量或会话，不启动 Codex、Claude Code、subagent、worktree、Git、测试、网络、浏览器、MCP、模型、审批或外部系统。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象，返回确定性状态和原因码，打印无副作用演示 JSON。 | 修改共享状态、执行 Integration Gate、恢复会话、领取任务、授予权限或执行外部动作。 |

所有返回对象固定包含 `status`、`code`、`taskRef`、`next` 和 `executionPerformed: false`。`ready_to_resume` 只表示注入记录允许领取下一项局部任务，不表示领取或执行已经发生。

## 接口草图

```js
assessCrossToolHandoff({
  sharedProjectContract,
  sourceToolProfile,
  targetToolProfile,
  inputSnapshot,
  taskContract,
  handoffPackage,
  capabilityDifferences,
  stateConflicts,
  validationEvidence,
  resumeRequest,
});
```

保守判定保留两扇 Gate：Handoff Package 先达到 `delivered`，再由注入的 Integration Gate 结果绑定 `integrated_snapshot_ready`；Resume Gate 随后检查输入新鲜度、目标工具能力、所有权、冲突、验证和下一任务。

## TDD 记录

1. **RED：** 先创建测试并运行 `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs`；退出码 1，Node.js 报告 `ERR_MODULE_NOT_FOUND`，因为实现模块尚不存在。
2. **GREEN：** 创建最小纯内存函数并重跑同一命令；退出码 0，15 项通过、0 项失败。
3. **EXECUTE：** 运行模块教学演示；退出码 0，输出 `ready_to_resume / cross_tool_handoff_ready / claim_next_task / executionPerformed:false`。

## 测试矩阵

| 行为 | 预期状态 | 不证明 |
| --- | --- | --- |
| Shared Project Contract 或 Context Read Protocol 不完整。 | `needs_context` | 函数读取或修复了项目工件。 |
| Tool Adapter Profile 缺失。 | `needs_context` | 产品入口已加载。 |
| 目标 Profile 过期或必需能力为 `unknown`。 | `capability_review_required` | 函数诊断、安装或授权了能力。 |
| 专属路径重叠或存在阻塞 State Conflict。 | `state_conflict` | 冲突已经裁决或共享状态已修改。 |
| 冲突需要价值取舍。 | `human_decision_required` | 决定请求已发送或人类已批准。 |
| Handoff Package 仍为 `draft`。 | `integration_required` | 局部 owner 已完成交付。 |
| Integration Gate 尚未产生 `integrated_snapshot_ready`。 | `integration_required` | 函数执行了集中集成或全仓验证。 |
| Task、Handoff 与当前输入版本不一致。 | `validation_required` | 旧结论已自动迁移。 |
| Validation Evidence 过期。 | `validation_required` | 函数运行了验证命令。 |
| 下一任务缺少验收条件。 | `needs_context` | 函数创建了 Task Contract。 |
| 工件、能力、冲突、集成与验证均满足条件。 | `ready_to_resume` | 会话已恢复、任务已领取或执行已开始。 |
| 请求执行外部动作。 | `human_decision_required` | 外部动作已执行。 |

## 实际运行结果

| 阶段 | 命令 | 退出码与结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs` | 1；测试装配失败，`ERR_MODULE_NOT_FOUND` 指向尚未创建的实现模块。 |
| GREEN | 同一测试命令 | 0；15 项通过、0 项失败。 |
| EXECUTE | `rtk node examples/agent/cross-tool-handoff-assessment.mjs` | 0；输出完整准入路径，且 `executionPerformed` 为 `false`。 |

## 运行前提

只需要本仓 Node.js。测试和演示全部使用虚构注入对象，不读取第 45 章真实状态，也不能证明真实 Codex、Claude Code、人工集成、仓库 Validation、会话恢复、权限或外部系统已经运行。
