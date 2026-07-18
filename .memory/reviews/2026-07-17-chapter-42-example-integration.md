---
title: "第 42 章 Example Implementation：Harness 发布实验准入"
chapter: "42"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章 Example Implementation：Harness 发布实验准入

## 目标与边界

本轮实现纯内存 `assessHarnessReleaseExperiment(input)`，只判断调用方注入的 Manifest、兼容、比较、评价、暴露和回滚记录。模块不读取真实 Prompt、Skill、工作流、模型、任务集、价格、流量、监控或配置，不调用文件、网络、Git、CI、实验平台、特征开关、审批、发布或回滚工具。

## TDD 证据

| 阶段 | 命令 | 实际结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/harness-release-experiment-assessment.test.mjs` | 退出码 1；`ERR_MODULE_NOT_FOUND`，因为实现模块尚不存在。 |
| GREEN | 同一测试命令 | 退出码 0；十一项通过、零项失败。 |
| EXECUTE | `rtk node examples/agent/harness-release-experiment-assessment.mjs` | 退出码 0；输出 `ready_for_review / offline_candidate_ready / review_limited_exposure / executionPerformed:false`。 |

## 覆盖的公开行为

- 完整离线候选只进入有限暴露审查。
- Manifest、动态依赖和回滚目标缺失时补证。
- 破坏性变化没有迁移准备时进入兼容审查。
- 任务集、指标规格或共享状态不满足条件时标记不可比较。
- 守护指标失败只请求回滚；已应用记录缺回读时要求验证。
- 有限暴露请求只进入人工批准，所有路线均为 `executionPerformed: false`。

## 共享接入

- `package.json` 增加专用测试与演示命令。
- `scripts/validate.sh` 增加专用测试组。
- `examples/README.md` 与 `examples/agent/README.md` 登记示例和限制。
- 正文 front matter、示例段和完成检查表已从计划时态更新为实际结果。

## 未覆盖范围

测试和演示不能证明真实 Benchmark、模型质量、Token/成本、统计有效性、流量隔离、特征开关、监控、权限、批准、发布、回滚或外部效果。后续 Diagram Review 只可表达教学责任链，不能补造这些证据。
