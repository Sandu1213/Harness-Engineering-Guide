---
title: "第 28 章示例计划：最小 Harness 准入评估"
chapter: "28"
status: "completed"
updated_at: "2026-07-16"
---

# 第 28 章示例计划：最小 Harness 准入评估

## 目标与边界

示例实现 `assessMinimalHarnessAdmission(candidate)`，只对调用者传入的 JavaScript 对象作确定性分类。它的目标不是执行任务，而是在任务进入一个**假想的内存求值器**之前，拒绝不完整或越界的输入。

| 允许 | 不允许 |
| --- | --- |
| 读取函数参数、检查对象字段、返回结构化决定、打印本地演示 JSON。 | 调用模型、真实 Tool、函数注入的 Tool、文件、网络、环境变量、子进程、数据库、浏览器、凭证、审批或写入。 |

## 接口草图

```js
assessMinimalHarnessAdmission({
  task: { id, objective, state, allowedCapabilities },
  toolRequest: { id, capability, effect, target, input },
  evidencePlan: { correlationId, observation, acceptance },
  stopConditions: {
    onMissingContract: 'stop',
    onDisallowedTool: 'stop',
    onMissingEvidencePlan: 'stop',
  },
});
```

成功时返回 `ready / minimal_harness_ready / run_in_memory_evaluator`，并固定返回 `executionPerformed: false`。拒绝时返回 `stopped`、原因码与 `next: 'stop'`。

## 红绿过程

1. **RED：** 先创建测试文件，使其 import 尚不存在的模块；运行 `node --test examples/agent/minimal-harness-admission-assessment.test.mjs`。
   - 实际结果：`ERR_MODULE_NOT_FOUND`，7 个测试尚未运行，进程失败。
   - 解释：这只证明被测模块缺失，并非真实 Agent 或 Tool 的失败。
2. **GREEN：** 创建纯函数模块，只实现合同、状态、停止条件、范围、效果和证据计划的检查。
   - 实际结果：同一命令 7 项通过、0 项失败。
3. **EXECUTE：** 运行 `node examples/agent/minimal-harness-admission-assessment.mjs`。
   - 实际结果：演示输出 `ready`，且 `executionPerformed: false`。
4. **REFACTOR 边界：** 不加入“模拟 Tool 调用”。若要验证真实动作，应在后续章节引入独立观察、环境准入与结果证据。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 合同完整、内存 Tool、证据计划可关联 | `ready` | 原因码、下一步、`executionPerformed: false`。 | Tool 已执行或分类正确。 |
| Task Contract 不完整 | `stopped / missing_task_contract` | 直接停止。 | 真实需求完整性。 |
| 任务尚未 `ready` | `stopped / task_not_ready` | 直接停止。 | 工作流或持久化状态。 |
| capability 越界 | `stopped / tool_out_of_scope` | 不进入求值。 | 真实权限拒绝。 |
| 请求声称 `write` 效果 | `stopped / effect_not_allowed` | `executionPerformed: false`。 | 文件或网络未被访问。 |
| 证据关联不匹配 | `stopped / evidence_plan_not_linked` | 直接停止。 | 后续观察真实存在。 |
| 缺少停止条件 | `stopped / missing_stop_condition` | 直接停止。 | 恢复或人工升级方案。 |

## 运行前提与命令

- 运行环境：本仓可用的 Node.js；本次实际运行版本为 `v24.16.0`。
- 无需安装额外依赖，无网络请求。

```bash
node --test examples/agent/minimal-harness-admission-assessment.test.mjs
node examples/agent/minimal-harness-admission-assessment.mjs
```

`node:test` 与 `node --test` 的机制背景见 [CH28-REF-02](28-minimal-harness-from-scratch.references.md)。实际结果以本页和 Fact Check 的命令记录为准。
