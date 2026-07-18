---
title: "第 43 章示例计划：章节完成准入"
chapter: "43"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章示例计划：章节完成准入

## 目标与边界

`assessBookChapterCompletion(input)` 只判断调用方注入的 Chapter Contract、十个阶段记录、来源/示例/图示/审查/验证证据、状态同步和出版请求。它不读取仓库、文件、环境变量或真实出版系统，也不调用模型、网络、Git、CI、构建、签名、上传、审批或发布工具。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象，返回确定性状态和原因码，打印无副作用演示 JSON。 | 遍历仓库、修改 Markdown、运行全仓校验、构建 PDF/EPUB、批准或发布内容。 |

## 接口草图

```js
assessBookChapterCompletion({
  chapterContract: {
    chapterId,
    contractVersion,
    objectivesDefined: true,
    scopeDefined: true,
  },
  stageRecords: [
    { stage: 'research', status: 'complete', evidenceId },
    { stage: 'outline', status: 'complete', evidenceId },
    { stage: 'draft', status: 'complete', evidenceId },
    { stage: 'technical_review', status: 'complete', evidenceId },
    { stage: 'example_implementation', status: 'complete', evidenceId },
    { stage: 'diagram_review', status: 'complete', evidenceId },
    { stage: 'fact_check', status: 'complete', evidenceId },
    { stage: 'language_editing', status: 'complete', evidenceId },
    { stage: 'validation', status: 'complete', evidenceId },
    { stage: 'completion', status: 'in_progress', evidenceId },
  ],
  sourceEvidence,
  exampleEvidence,
  diagramEvidence,
  reviewEvidence,
  validationEvidence,
  stateSync,
  publicationRequest,
});
```

返回对象固定包含 `status`、`code`、`chapterId`、`next` 和 `executionPerformed: false`：

- 阶段顺序错误、Research 至 Validation 任一阶段未完成，或硬性证据缺失：`needs_evidence`。
- 当前全仓验证失败或证据过期：`validation_failed`。
- 工件与共享状态不一致：`state_drift`。
- 九个前置阶段及硬性证据通过，Completion 尚未关闭：`ready_for_completion_review`。
- Completion 记录已由注入证据关闭：`chapter_complete`。
- 已完成章节请求出版：`publication_approval_required`，但不执行批准或发布。

## TDD 计划

1. **RED：** 已先创建测试并运行 `node --test examples/agent/book-chapter-completion-assessment.test.mjs`；退出码 1，Node.js 报告 `ERR_MODULE_NOT_FOUND`，原因是实现模块尚不存在。该失败来自目标行为缺失，而不是测试语法错误。
2. **GREEN：** 已创建最小纯函数并重跑同一测试；退出码 0，19 项通过、0 项失败，覆盖十个阶段边界、硬缺口、Validation、状态漂移和出版批准边界。
3. **EXECUTE：** 已运行模块中的教学演示；退出码 0，输出 `ready_for_completion_review / chapter_evidence_ready / review_completion_record / executionPerformed:false`。

## 实际运行结果

| 阶段 | 命令 | 退出码与结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/book-chapter-completion-assessment.test.mjs` | 1；1 项装配失败，`ERR_MODULE_NOT_FOUND` 指向尚未创建的实现模块。 |
| GREEN | 同一测试命令 | 0；19 项通过、0 项失败。 |
| EXECUTE | `rtk node examples/agent/book-chapter-completion-assessment.mjs` | 0；输出 `ready_for_completion_review`、`chapter_evidence_ready`、`review_completion_record` 与 `executionPerformed: false`。 |

## 测试矩阵

| 路径 | 预期状态 | 不证明 |
| --- | --- | --- |
| Research 至 Validation 任一阶段不是 `complete`。 | `needs_evidence` | 对应真实文件不存在或责任人未工作。 |
| 阶段名称或顺序与固定工作流不一致。 | `needs_evidence` | 自动修复了工作流或共享状态。 |
| 来源、示例、图示或审查硬证据缺失。 | `needs_evidence` | 其他通过项可以抵消缺口。 |
| Validation 失败或结果不新鲜。 | `validation_failed` | 函数实际运行了全仓命令。 |
| 状态同步记录不一致。 | `state_drift` | 函数读取或修改了状态文件。 |
| Completion 尚未关闭且其余证据完整。 | `ready_for_completion_review` | 章节已经完成或可出版。 |
| Completion 已关闭。 | `chapter_complete` | 全书可发布。 |
| 已完成章节请求出版。 | `publication_approval_required` | 批准请求已发送、批准已获得或发布已执行。 |

## 运行前提

只需要本仓 Node.js。测试和演示使用虚构的注入对象，不读取第 43 章真实阶段状态，不能作为动态事实新鲜、全仓 Validation、PDF/EPUB 构建、版权、批准或发布已经发生的证据。
