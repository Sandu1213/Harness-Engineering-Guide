---
title: "第 32 章 Diagram Review：自动分析失败并修复 Bug"
chapter: "32"
stage: "Diagram Review"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章 Diagram Review：自动分析失败并修复 Bug

## 审查范围

- 工件：`diagrams/mermaid/chapter-32-bug-investigation-flow.mmd`、导出的 SVG/PNG、正文 Mermaid 块与替代说明。
- 问题：症状如何经过复现、最小化、假设、检查、候选修复和回归门，才得到受限结论或升级？

## 图示结论

图保留三条不可跳过的断点：症状不能直接成为根因；Fix Candidate 不能直接成为修复结论；`ready` 只进入隔离实现，不能替代真实观察、发布或人工验收。复现契约缺失和回归门缺项流向保守停止，不稳定、风险或被推翻／未决的假设流向 Escalation Record。真实环境请求先进入 `requires_approval`，获批后才可能产生图外不执行的实际观察。

## 已执行验证与未验证范围

- 已执行 `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-32-bug-investigation-flow.mmd -o diagrams/exported/chapter-32-bug-investigation-flow.svg -b white`，退出码 0。
- 已执行同版本 Mermaid CLI 导出 PNG（`-b white -s 2`），退出码 0；PNG 尺寸为 1518×2828。
- 已实际查看 PNG：主链、保守停止、Escalation Record、`requires_approval`、图外不执行的实际观察和 `ready` 均可读，没有文字截断。
- 已从正文提取 Mermaid 块并与 `.mmd` 逐字比较，退出码 0、无输出。
- 图只表达本书模型；没有运行 Bug 修复、pytest、Playwright、Git、浏览器、API、环境、CI、账户、凭证或外部系统。
