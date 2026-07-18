---
title: "第 40 章示例计划：资源优化评估"
chapter: "40"
status: "completed"
updated_at: "2026-07-17"
---

# 第 40 章示例计划：资源优化评估

## 目标与边界

`assessResourceOptimization(input)` 只检查调用方注入的 Resource Budget、基线与候选 Resource Records、Latency Path、Rate Snapshot、Optimization Candidate 和 Quality Non-regression Gate。它返回受限的教学状态，不调用模型、计费、缓存、批处理、并发、网络、文件、时钟、账户、凭证或任何外部系统。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象、比较已注入的身份与状态、返回确定性教学路由、打印演示 JSON。 | 读取真实用量或费率、计算账单、测量延迟、创建缓存、启动并行／批处理、调用模型或声称候选已部署。 |

示例中的 `teaching_units`、次数和数量都是为验证分支而注入的虚构数据，不代表 Token、金额、费率、延迟、缓存命中率或任何供应商测量。函数只判断当前输入是否具备比较条件；即使返回 `ready_for_comparison`，也不说明候选更优、已获批准或已执行。

## 接口草图

```js
assessResourceOptimization({
  budget: { taskId, trialId, scope, retryLimit, retriesUsed },
  baselineRecords: [{ taskId, trialId, scope, kind, unit, amount }],
  candidateRecords: [{ taskId, trialId, scope, kind, unit, amount }],
  latencyPath: { dependencies: [{ step, dependsOn }] },
  rateSnapshot: { status, scope, unit },
  optimizationCandidate: {
    id,
    taskId,
    scope,
    type,
    changesOneVariable,
    cacheIdentity,
    parallelSteps,
  },
  qualityGate: { status, taskId, scope, requiredEvidenceComplete },
});
```

返回对象固定包含 `status`、`code`、`candidateId`、`next` 与 `executionPerformed: false`。质量门先于资源比较：质量失败直接拒绝候选，不能由更低的教学数量覆盖。

## 红绿过程

1. **RED：** 先只创建测试并运行 `node --test examples/agent/resource-optimization-assessment.test.mjs`。模块尚不存在，命令以退出码 1 结束并报告 `ERR_MODULE_NOT_FOUND`；这只证明预期教学模块尚未创建。
2. **GREEN：** 创建纯内存函数后重跑同一命令。实际结果为退出码 0，8 项通过、0 项失败，且所有路径固定 `executionPerformed: false`。
3. **EXECUTE：** 运行 `node examples/agent/resource-optimization-assessment.mjs`。实际输出为 `ready_for_comparison / comparable_evidence_ready / compare_without_deployment / executionPerformed: false`；演示只打印注入对象的受限状态，没有读取或改变外部系统。

## 测试矩阵

| 路径 | 预期状态 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 基线或候选只有估算，没有完整观察。 | `needs_measurement` | 请求实际记录。 | 缺失值为零或已有真实账单。 |
| Rate Snapshot 过期或范围不一致。 | `rate_stale` | 请求刷新适用规则。 | 当前公开价适用于合同或历史任务。 |
| 观察单位与费率单位不一致。 | `unit_mismatch` | 禁止派生比较。 | 任一单位可自动换算。 |
| 缓存候选缺少已观察命中。 | `cache_evidence_missing` | 候选设计不等于命中。 | 缓存已创建、内容正确或来源新鲜。 |
| 并行候选中的一个步骤依赖另一个。 | `dependency_conflict` | 不能把依赖步骤标为独立。 | 真实调度器已检查或执行。 |
| 重试用量超过预算。 | `requires_approval` | 只能请求预算审批。 | 审批已发送、获得或重试已发生。 |
| Quality Non-regression Gate 失败。 | `quality_regression` | 资源字段不能覆盖质量失败。 | 失败候选已经回滚。 |
| 同任务、同范围、同单位、观察和质量证据完整。 | `ready_for_comparison` | 最多允许进入教学比较。 | 候选更优、获批、切流或部署。 |

## 运行前提与命令

- 只需要本仓 Node.js；不需要模型、供应商 API、账单、缓存、批处理、网络、文件、时钟、账户或凭证。

```bash
node --test examples/agent/resource-optimization-assessment.test.mjs
node examples/agent/resource-optimization-assessment.mjs
```

两条命令只验证纯内存教学对象，不构成真实资源测量、计费、缓存命中、并行、批处理、优化批准或部署证据。
