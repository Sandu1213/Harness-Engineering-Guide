---
chapter: "42"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 42 章 Diagram Review：Harness 发布实验与回滚验证

## 审查范围

- `diagrams/mermaid/chapter-42-harness-release-experiment-flow.mmd`
- `diagrams/exported/chapter-42-harness-release-experiment-flow.svg`
- `diagrams/exported/chapter-42-harness-release-experiment-flow.png`
- 正文 Mermaid 块、导出链接、替代说明和读图断点。

## 图示结论

图将版本身份、兼容矩阵、离线评价、可比性、发布决定、有限暴露请求与回滚验证拆开。身份缺失、破坏性变化无迁移、任务/指标/隔离不一致分别进入补证、兼容审查和 `not_comparable`；守护指标通过只到 `ready_for_review`，经 Exposure Plan 后仍停在 `approval_required`，没有“批准即发布”的箭头。

回滚路线分成两部分：守护指标失败只形成 `rollback_requested`；另一条独立路线只审查调用方注入的 `rollback_applied` 记录。没有回读或残留效果登记时返回 `rollback_verification_required`；即使证据完整，`rollback_verified` 也只限注入范围，最终仍在外部行动前停止。

## 已执行验证

- Mermaid CLI 11.16.0 以白色背景导出 SVG，退出码 0。
- 同版本 CLI 以白色背景和两倍缩放导出 PNG，退出码 0；`sips` 显示 1568×2012。
- 已实际查看 PNG：Manifest、Compatibility Matrix、Offline Evaluation、Release Decision、Exposure Plan、补证、不可比较、批准、回滚请求、回读验证和 `blocked` 均可读，无明显截断；箭头没有把候选接受、暴露请求或回滚记录画成真实外部动作。
- 以 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者均为 1808 个字符，逐字一致。
- 后续定向 Markdown lint 与 `git diff --check` 由主线程在新增审查记录后执行。

## 未验证范围

图未访问或模拟真实 Prompt、Skill、工作流、模型、任务集、实验平台、流量、监控、特征开关、权限、批准、发布、回滚或外部效果。图中的 `rollback_applied` 明确是注入记录，不是本轮执行行为。
