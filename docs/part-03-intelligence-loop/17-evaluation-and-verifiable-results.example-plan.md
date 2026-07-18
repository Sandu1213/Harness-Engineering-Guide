---
title: "第 17 章示例实现记录：Evaluation Spec 质量门"
chapter: "17-evaluation-and-verifiable-results"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 17 章示例实现记录：Evaluation Spec 质量门

## 读者问题

在没有运行真实检查器的情况下，怎样验证“每项必需标准均有合适证据”这一判断逻辑，而不把自我报告或一个绿色勾选伪装成任务成功？

## 目的与边界

示例实现纯函数 `assessEvaluationSpec`。它读取注入的 `task`、`evidence` 与 `policy`，输出质量门的教学判定；不保存、不修改输入，也不执行任何外部检查。

示例不读取 Markdown、文件、环境变量、时钟、网络、账户、模型、浏览器、真实 lint、链接检查、测试框架、CI、数据库或评分服务。因此，`accepted` 不代表真实文档已更新、链接可访问、引用属实、读者理解、Agent 已执行或生产发布可接受。

## 环境、输入与输出

- **环境：** 已安装支持 `node:test` 的 Node.js。
- **实现路径：** `examples/agent/evaluation-spec-assessment.mjs`。
- **测试路径：** `examples/agent/evaluation-spec-assessment.test.mjs`。
- **输入：** 具有 `id`、`scope` 与 `successCriteria` 的 `task`；每条带 `criterionId`、`kind`、`scope`、`freshness`、`status` 的显式 `evidence`；描述允许证据种类、模型评判校准要求和 `requiredFreshness` 的 `policy`。
- **输出：** `{ status, code, taskId, criterionId? }`。输出只说明教学对象在本书质量门中的位置。

## 最小接口

```js
assessEvaluationSpec({
  task: {
    id: 'docs-update-evaluation',
    scope: 'chapter-17-docs',
    successCriteria: [
      { id: 'markdown', required: true },
      { id: 'links', required: true },
    ],
  },
  evidence: [
    {
      criterionId: 'markdown',
      kind: 'deterministic_check',
      scope: 'chapter-17-docs',
      freshness: 'fresh',
      status: 'passed',
    },
    {
      criterionId: 'links',
      kind: 'state_observation',
      scope: 'chapter-17-docs',
      freshness: 'fresh',
      status: 'passed',
    },
  ],
  policy: {
    acceptedEvidenceKinds: ['deterministic_check', 'state_observation'],
    requiresModelJudgeCalibration: true,
    requiredFreshness: 'fresh',
  },
});
```

## 判定顺序

| 顺序 | 条件 | 返回状态 / 代码 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 任务 ID、范围、成功标准或策略（含刷新要求）不完整 | `needs_spec` / `evaluation_spec_incomplete` | 任务永远不可完成。 |
| 2 | 必需标准没有记录；可选标准没有记录 | 分别为 `needs_evidence` / `criterion_evidence_missing`；`needs_review` / `optional_criterion_evidence_missing` | 标准一定失败或可选项可以被悄悄忽略。 |
| 3 | 证据为自我报告、种类不允许、范围不匹配、刷新条件不满足或模型评判未校准 | `needs_evidence` / 对应代码 | Agent 一定错误或模型评判没有价值。 |
| 4 | 证据状态缺失、`unknown` 或不受支持 | `needs_evidence` / `criterion_evidence_status_not_confirmed` | 标准已经失败。 |
| 5 | 必需标准的适用证据明确为 `failed` | `rejected` / `criterion_not_passed` | 真实任务已恢复、回滚或升级。 |
| 6 | 可选标准的适用证据明确为 `failed` | `needs_review` / `optional_criterion_needs_review` | 必需结果已自动被接受。 |
| 7 | 全部必需标准均有同范围、符合刷新要求且明确通过的证据 | `accepted` / `evaluation_accepted` | 外部系统、质量、权限或用户结果已经验证。 |

## 红绿验证计划

先只创建测试文件并运行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
```

实际红灯应是目标模块尚不存在而导致的 `ERR_MODULE_NOT_FOUND`；它只证明测试早于实现，不证明评估设计正确。

实现后运行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
```

实际结果将在[示例整合审查](../../.memory/reviews/2026-07-16-chapter-17-example-integration.md)中记录。

## 测试矩阵

| 路径 | 输入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 正常接受 | 两项必需标准均由允许证据通过 | `accepted` / `evaluation_accepted` | 真实检查已经运行。 |
| 规格缺失 | `successCriteria` 为空 | `needs_spec` / `evaluation_spec_incomplete` | Agent 不能提出新规格。 |
| 证据缺失 | 缺一个必需标准的记录 | `needs_evidence` / `criterion_evidence_missing` | 标准已失败。 |
| 自我报告 | 必需标准仅有 `self_report` | `needs_evidence` / `self_report_not_accepted` | Agent 故意欺骗。 |
| 状态未知 | 必需标准的允许证据为 `unknown` | `needs_evidence` / `criterion_evidence_status_not_confirmed` | 标准已经失败。 |
| 状态缺失 | 必需标准的允许证据没有 `status` | `needs_evidence` / `criterion_evidence_status_not_confirmed` | 记录可被当作通过。 |
| 范围不匹配 | 通过的状态观察缺少或不匹配 `scope` | `needs_evidence` / `evidence_scope_mismatch` | 其他对象的状态可支持当前任务。 |
| 证据不新鲜 | 通过的状态观察的 `freshness` 不符合策略 | `needs_evidence` / `evidence_not_fresh` | 旧观察可证明当前状态。 |
| 冲突证据 | 同一必需标准同时有通过与失败记录 | `needs_evidence` / `criterion_evidence_conflict` | 最新、真实或正确的外部状态。 |
| 必需标准失败 | 允许证据为 `failed` | `rejected` / `criterion_not_passed` | 已执行恢复。 |
| 未校准模型评判 | `model_judge` 未标校准 | `needs_evidence` / `model_judge_not_calibrated` | 模型评判必然无用。 |
| 校准模型评判 | 允许且已校准的 `model_judge` 通过 | `accepted` / `evaluation_accepted` | 人工复核已发生。 |
| 可选项待复核 | 必需项通过、可选项失败 | `needs_review` / `optional_criterion_needs_review` | 任务整体必然失败。 |
| 可选项缺证 | 必需项通过、可选项没有记录 | `needs_review` / `optional_criterion_evidence_missing` | 可选质量要求可被静默丢弃。 |

## 可选增强与升级触发

1. 当有真实检查器时，保存命令版本、输入快照、输出位置与退出状态；不要只保存 `passed` 文本。
2. 当出现随机性时，记录 trial、环境版本和重复次数；第 39 章再讨论 Benchmark 和统计报告。
3. 当质量门输出 `rejected`、`needs_evidence` 或 `needs_review` 时，把它交给第 18 章的恢复策略；不要在本函数里重试或修改目标。

## 完成检查

- [x] 函数只处理注入对象，未引入外部 I/O 或依赖。
- [x] 十四条教学判断路径都有精确、非重复的测试。
- [x] 代码、正文与图示均明确 `accepted` 的狭窄含义。
- [ ] 主线程决定是否将专用命令加入共享 `package.json` 和总校验脚本。
