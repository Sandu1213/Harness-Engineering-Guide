---
title: "第 42 章示例计划：Harness 发布实验准入"
chapter: "42"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章示例计划：Harness 发布实验准入

## 目标与边界

`assessHarnessReleaseExperiment(input)` 只判断调用方注入的版本清单、兼容性、离线比较、守护指标、有限暴露和回滚记录是否足以进入下一教学状态。它不读取真实 Prompt、Skill、模型、任务集、价格、流量、监控或配置，也不调用模型、文件、网络、Git、CI、实验平台、特征开关、审批或回滚工具。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象、返回确定性状态和原因码、打印无副作用演示 JSON。 | 运行 Benchmark、随机分配、切换流量、发布候选、写入配置、执行回滚或声称外部效果。 |

## 接口草图

```js
assessHarnessReleaseExperiment({
  manifest: {
    candidateId,
    parentId,
    artifactDigest,
    modelSelection,
    evaluationSpecId,
    dependenciesResolved: true,
  },
  compatibility: { status: 'compatible', migrationReady: true },
  comparison: {
    baselineManifestId,
    candidateManifestId,
    taskSetVersion,
    candidateTaskSetVersion,
    metricSpecVersion,
    candidateMetricSpecVersion,
    sharedStateIsolated: true,
  },
  evaluation: { status: 'accepted', guardrailsPassed: true },
  exposure: { requested: false },
  rollback: { knownGoodManifestId, status: 'ready', readbackComplete: false },
  execution: { requested: false },
});
```

返回对象固定包含 `status`、`code`、`candidateId`、`next` 和 `executionPerformed: false`。所有状态只判断注入对象：

- 完整离线候选：`ready_for_review / offline_candidate_ready / review_limited_exposure`。
- Manifest、依赖或兼容迁移缺失：`needs_evidence` 或 `needs_compatibility_review`。
- 任务集、指标口径或共享状态不满足比较条件：`not_comparable`。
- 守护指标失败：`rollback_requested`；已应用但未回读：`rollback_verification_required`。
- 请求有限暴露或外部执行：`approval_required`。

## TDD 计划

1. **RED：** 先创建测试并运行 `node --test examples/agent/harness-release-experiment-assessment.test.mjs`。模块尚不存在时实际以退出码 1 和 `ERR_MODULE_NOT_FOUND` 失败。
2. **GREEN：** 创建最小纯函数并重跑同一测试，实际得到十一项通过、零项失败。
3. **EXECUTE：** 运行模块中的演示对象，实际输出 `ready_for_review`、`offline_candidate_ready`、`review_limited_exposure` 与 `executionPerformed: false`。

## 测试矩阵

| 路径 | 预期状态 | 不证明 |
| --- | --- | --- |
| 完整、可比、守护指标通过的离线候选。 | `ready_for_review` | 候选已发布或线上更优。 |
| Manifest 字段或依赖缺失。 | `needs_evidence` | 外部工件不存在。 |
| 破坏性变化没有迁移准备。 | `needs_compatibility_review` | 真实消费者一定受损。 |
| 任务集或指标规格不一致。 | `not_comparable` | 任一结果本身错误。 |
| 共享状态未隔离。 | `not_comparable` | 已检测到具体污染。 |
| 守护指标失败。 | `rollback_requested` | 回滚已授权或执行。 |
| 回滚已应用但未完成回读。 | `rollback_verification_required` | 旧版本未恢复。 |
| 请求有限暴露或真实执行。 | `approval_required` | 审批已发送或获得。 |

## 运行前提

只需要本仓 Node.js。命令只验证纯内存教学对象，不能作为真实模型、Benchmark、A/B 测试、流量、监控、发布、审批或回滚已经发生的证据。
