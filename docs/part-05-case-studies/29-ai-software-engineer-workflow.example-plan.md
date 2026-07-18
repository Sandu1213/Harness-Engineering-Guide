---
title: "第 29 章示例计划：软件变更交付包评估器"
chapter: "29-ai-software-engineer-workflow"
status: "complete"
updated_at: "2026-07-16"
---

# 第 29 章示例计划：软件变更交付包评估器

## 目的与边界

`assessSoftwareChangeDelivery` 是一个无副作用的 Node.js 教学函数。它只对调用者提供的对象做确定性分类：输入是否已具备请求审查的最小交付材料。它不会读取路径、运行测试、创建 diff、调用 Git、发起 PR、访问网络或写入任何文件。

## 输入、输出与状态

| 输入工件 | 关键字段 | 检查目标 |
| --- | --- | --- |
| Change Brief | `id`、`objective`、`acceptanceCriteria`、`nonGoals`、`allowedPaths` | 有可判断的目标、验收和范围。 |
| Exploration Record | `inspectedPaths`、`relevantBehavior`、`unknowns` | 不把未探索对象直接写成实现计划。 |
| Implementation Plan | `steps`、`plannedPaths` | 计划路径不超出声明范围。 |
| Verification Plan | `command`、`expectedEvidence`、`externalEffects` | 至少已声明如何验证，且示例保持无副作用。 |
| Documentation Decision | `impact`、`paths`、`rationale` | 文档影响不能保持未知。 |
| Review Package | `changedPaths`、`diffSummary`、`evidenceStatus`、`reviewState` | 审查前有可读摘要和范围一致性。 |

| 输出 | 含义 | 不表示 |
| --- | --- | --- |
| `ready_for_review / software_change_package_ready` | 注入对象满足本章教学准入规则。 | 代码已改、命令已运行、评审已批准或变更已合并。 |
| `stopped / <reason>` | 当前材料不足或范围矛盾。 | 真实系统已经拒绝、回滚或修复。 |

## 红绿记录

1. **Red：** 先创建测试文件，其中导入尚不存在的模块。
2. **实际红灯命令：** `node --test examples/agent/software-change-delivery-assessment.test.mjs`。
3. **实际红灯结果：** 2026-07-16 得到 `ERR_MODULE_NOT_FOUND`，因为实现模块尚未创建。
4. **Green：** 创建纯内存实现，重新运行同一测试命令。
5. **实际绿灯结果：** 2026-07-16，10 项通过、0 项失败。
6. **演示：** `node examples/agent/software-change-delivery-assessment.mjs` 实际输出 `ready_for_review`、`software_change_package_ready`、`request_review` 与 `executionPerformed: false`。

## 测试矩阵

| 场景 | 输入差异 | 预期代码 | 说明 |
| --- | --- | --- | --- |
| 交付包齐全 | 所有工件完整且范围一致。 | `software_change_package_ready` | 仅允许请求审查。 |
| 缺 Change Brief | `changeBrief` 缺失。 | `missing_change_brief` | 不能从后续计划反推需求。 |
| 缺验收条件 | `acceptanceCriteria` 为空。 | `missing_acceptance_criteria` | 目标没有可验证标准。 |
| 探索不足 | `relevantBehavior` 为空。 | `missing_exploration_record` | 未知代码行为不能直接进入计划。 |
| 计划越界 | `plannedPaths` 含未允许路径。 | `scope_expansion_detected` | 声明范围不应静默扩大。 |
| 缺实现计划 | `implementationPlan` 缺失。 | `missing_implementation_plan` | 没有步骤和计划路径就不能进入验证计划。 |
| 验证计划缺失 | 命令或预期证据为空。 | `missing_verification_plan` | 计划验证与实际验证保持分离。 |
| 文档影响未决定 | `impact: 'unknown'`。 | `documentation_impact_unknown` | 不把文档同步留为隐性后续。 |
| 审查包不足 | `diffSummary` 为空。 | `missing_review_package` | 不能把空对象提交给审查。 |
| 审查范围不一致 | `changedPaths` 含未允许路径。 | `review_scope_mismatch` | 审查包不能悄悄扩大实际改动范围。 |

## 未覆盖范围

- 不验证 `allowedPaths` 是否存在，也不读取任何真实仓库。
- 不执行 `verificationPlan.command`，不产生测试输出。
- 不调用 Git，`diffSummary` 只是输入文本。
- 不创建或审查 Pull Request，不代表任何平台的 approval。
- 不处理真实密钥、用户数据、发布、网络、Shell 或文件写入。
