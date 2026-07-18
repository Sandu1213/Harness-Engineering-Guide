---
chapter: "28"
review_type: "example-integration"
status: "passed"
reviewed_at: "2026-07-16"
---

# 第 28 章 Example Integration Review

## 红绿记录

1. 先创建 `minimal-harness-admission-assessment.test.mjs`，其 import 指向尚不存在的模块。
2. 实际运行 `node --test examples/agent/minimal-harness-admission-assessment.test.mjs`，得到退出失败和 `ERR_MODULE_NOT_FOUND`。
3. 创建 `assessMinimalHarnessAdmission` 后，实际重跑同一命令：7 项通过、0 项失败。
4. 实际运行 `node examples/agent/minimal-harness-admission-assessment.mjs`，输出 `ready`、`minimal_harness_ready`、`run_in_memory_evaluator` 与 `executionPerformed: false`。

## 覆盖的行为

| 路径 | 结果 |
| --- | --- |
| 完整的内存候选 | `ready / minimal_harness_ready`，且未执行动作。 |
| 缺少 Task Contract | `stopped / missing_task_contract`。 |
| Task State 不是 `ready` | `stopped / task_not_ready`。 |
| 能力范围越界 | `stopped / tool_out_of_scope`。 |
| 副作用不是 `none` | `stopped / effect_not_allowed`。 |
| Evidence Plan 关联不匹配 | `stopped / evidence_plan_not_linked`。 |
| Stop Condition 缺失 | `stopped / missing_stop_condition`。 |

## 边界

测试只覆盖纯函数对构造对象的分类，未执行模型、Tool、文件、网络、浏览器、数据库、权限、审批、日志或外部观察；不能据此宣称真实 Harness、Agent 或生产流程已验证。
