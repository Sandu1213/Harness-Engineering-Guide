---
title: "第 39 章示例计划：Harness 评估计划检查"
chapter: "39"
status: "completed"
updated_at: "2026-07-17"
---

# 第 39 章示例计划：Harness 评估计划检查

## 目标与边界

`assessHarnessEvaluationPlan(input)` 只检查调用方注入的评估套件、四类教学场景、试次记录、硬性门和基线／候选版本，保守判断计划是否具备进入离线 Benchmark 复核的条件。它不运行模型、Harness、工具、Benchmark、网络、文件、权限、日志、CI、发布或回滚，也不生成真实试次、分数或外部效果。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象、比较注入版本、返回确定性的教学路由、打印演示 JSON。 | 运行任务或评分器、访问外部系统、写入工件、计算真实 Benchmark、发布、回滚或声称外部执行已发生。 |

所有返回路径固定包含 `executionPerformed: false`。`ready_for_benchmark` 只表示注入对象可以进入离线复核，不表示 Benchmark、真实任务或任何外部验证已经运行。

## 接口草图

```js
assessHarnessEvaluationPlan({
  suite: { version, requiredScenarioTypes, requiredHardGateIds },
  environment: { id },
  scenarios: [{ id, type }],
  trials: [{ scenarioId, expectationMet, graderStatus }],
  hardGates: [{ id, baseline, candidate }],
  comparison: {
    baseline: { suiteVersion, environmentId, modelVersion, toolVersion, graderVersion, harnessVersion },
    candidate: { suiteVersion, environmentId, modelVersion, toolVersion, graderVersion, harnessVersion },
  },
  execution: { requested: false },
});
```

返回对象固定包含 `status`、`code`、`suiteVersion`、`next` 和 `executionPerformed: false`：

- 计划或执行边界缺失：`blocked`；
- 四类教学场景缺失：`needs_scenarios`；
- 某个场景没有试次记录：`needs_trials`；
- 套件、环境、模型、工具或评分器版本不一致：`not_comparable`；
- 候选硬性门由通过变为失败：`regression_detected`；
- 试次不可判定或硬性门记录不完整：`needs_review`；
- 条件完整且可比：`ready_for_benchmark`。

## 红绿过程

1. **RED：** 先创建测试并导入尚不存在的模块，运行 `node --test examples/agent/harness-evaluation-plan-assessment.test.mjs`。实际以退出码 1 和 `ERR_MODULE_NOT_FOUND` 失败，失败原因是教学模块尚未创建。
2. **GREEN：** 只添加满足公开行为的纯内存函数，重跑同一命令。实际以退出码 0 完成，8 项通过、0 项失败。
3. **EXECUTE：** 运行 `node examples/agent/harness-evaluation-plan-assessment.mjs`。实际输出 `ready_for_benchmark / evaluation_plan_ready / continue_to_offline_review / executionPerformed: false`。

这些结果只证明注入对象的确定性分类；它们不证明真实任务、评分器或 Benchmark 已执行。

## 测试矩阵

| 路径 | 预期决定 | 不证明 |
| --- | --- | --- |
| 四类场景、试次、硬性门和可比版本齐全。 | `ready_for_benchmark`。 | 真实 Benchmark 或任务已运行。 |
| 评估计划缺关键字段或请求执行。 | `blocked`。 | 外部执行请求已经取消或处理。 |
| 场景或试次不足。 | `needs_scenarios` 或 `needs_trials`。 | 缺失数据不存在或无法获得。 |
| 比较条件版本不一致。 | `not_comparable`。 | 任一候选更好或更差。 |
| 候选硬性门出现回归。 | `regression_detected`。 | 真实权限系统已验证或回滚已发生。 |
| 试次或硬性门无法判定。 | `needs_review`。 | 人工已经收到或完成复核。 |

## 运行前提与命令

只需要本仓 Node.js；不需要模型、Agent、工具服务、Benchmark 平台、文件、网络、账户、凭证、权限、CI、发布或回滚环境。

```bash
node --test examples/agent/harness-evaluation-plan-assessment.test.mjs
node examples/agent/harness-evaluation-plan-assessment.mjs
```

建议后续由主线程将其接入 `package.json` 时使用：

- `test:harness-evaluation-plan-assessment`
- `example:harness-evaluation-plan-assessment`
