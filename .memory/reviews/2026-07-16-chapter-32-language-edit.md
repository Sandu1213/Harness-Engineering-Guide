---
title: "第 32 章语言审阅：自动分析失败并修复 Bug"
chapter: "32"
stage: "Language Editing"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章语言审阅：自动分析失败并修复 Bug

## 审阅范围

- 正文、Research Brief、参考资料、事实核验、示例计划、Technical／Example／Diagram Review，以及第 31、33 章的衔接。
- 术语首现、具体主语、阶段时态、图文表述，以及症状、候选根因、候选修复与已验证修复之间的结论边界。

## 修订

- 在目标与核心概念中统一可证伪检查（Falsifiable Check）和回归门（Regression Gate）的中文（English）形式，并沿用词表中的 Bug Investigation、Reproduction Contract、Hypothesis Record、Fix Candidate 与 Escalation Record。
- 将“修复后”统一为“候选变化后”，把候选修复与已验证修复的受限结论分开：只有原失败与候选变化后的预期行为均有独立证据时，才允许在覆盖范围内使用后者。
- 将图示后的断点说明改为中文主语，明确症状不等于根因、候选修复不等于已验证修复，`ready` 仍只表示可进入隔离实现。
- 保留第 31 章的测试证据边界，并将第 33 章的连接限定为保存已验证、可撤销的经验，不把猜测写入项目记忆。

## 未改变的范围

语言审阅没有新增来源事实、产品行为、工具调用、测试结论或外部执行描述；也未改变 CH32-REF-01 至 CH32-REF-04 的限定范围、`assessBugInvestigation` 接口、8 项 Node 测试结果、Mermaid 源码或导出图语义。Bug 修复、pytest、Playwright、浏览器、API、Git `bisect`、CI、环境、账户、凭证和外部系统仍为未运行范围。

## 本章级验证

- 已运行 `npx markdownlint-cli2 docs/part-05-case-studies/32-automated-failure-analysis-and-bug-fixing.md .memory/reviews/2026-07-16-chapter-32-language-edit.md`，退出码 0、0 个错误。
- 已运行 `git diff --check -- docs/part-05-case-studies/32-automated-failure-analysis-and-bug-fixing.md .memory/reviews/2026-07-16-chapter-32-language-edit.md`，退出码 0、无输出。
