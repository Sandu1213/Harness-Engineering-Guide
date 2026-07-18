---
title: "第 27 章 Diagram Review：Git 变更准入证据流"
chapter: "27"
review: "diagram"
status: "completed"
updated_at: "2026-07-16"
---

# 第 27 章 Diagram Review：Git 变更准入证据流

## 审查范围

- `diagrams/mermaid/chapter-27-git-change-admission.mmd`。
- 导出 `diagrams/exported/chapter-27-git-change-admission.svg` 与 PNG。
- 正文 Mermaid 块、图示替代描述与工作流程。

## 结果

- Mermaid 源以 Mermaid CLI `11.16.0` 实际导出为白色背景、两倍缩放的 SVG 与 PNG。
- 已实际查看 PNG：纵向证据流中，候选意图、Change Contract、两个完整性检查、Worktree 声明、Evidence Package、人类审查、集成决定、集成者与停止出口均可读；箭头标签没有遮挡关键节点。
- 正文 Mermaid 块与 `.mmd` 源逐行比较后保持一致。图中 `Worktree 声明`、`Evidence Package`、`Human Review` 与 `Integration Decision` 与正文和示例术语一致。

## 边界结论

图中的箭头表示本书教学对象的证据流和停止路由，不表示真实 Git、worktree、diff、PR、CI、权限、审查、merge、发布或回滚发生。`Integration Decision` 被绘制为人类和集成责任的入口，而不是自动成功终点。
