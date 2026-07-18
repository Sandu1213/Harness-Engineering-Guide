---
title: "第 37 章 Language Editing"
chapter: "37"
stage: "Language Editing"
status: "completed"
updated_at: "2026-07-16"
---

# 第 37 章 Language Editing

## 审阅范围

- 正文：`docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md`。
- 对照：第 37 章的 Research Brief、Outline、References、Technical Review、Example Implementation、Diagram Review、Fact Check、Mermaid 图源与纯内存示例。
- 规则：`BOOK_RULES.md`、`STYLE_GUIDE.md` 与 `.ai/review-checklist.md`。

## 编辑结论

本轮只编辑语言与读者可读性，不改变来源、工程模型、示例接口、图源、测试结果、状态语义或外部执行边界。正文现以中文（English）首次呈现会话历史、任务范围记忆、项目记忆、只读技能、提议写入技能、记忆／技能模式卡、会话、运行、命名空间、键、技能契约与上下文包；后续简称保持与图、示例和事实核验一致。

## 已核对的一致性

- REF-020 至 REF-025 仍仅作为产品或规范的受限背景；会话、任务、项目与事件记录、Evidence Card、读写门、生命周期、项目适配层及两类 Skill 契约仍明确为本书工程模型或虚构教学输入。
- 图文继续保持 `evidence_candidate ≠ fact_verified`、`proposed_write ≠ memory_updated` 与“审查记录不等于外部效果”的断点；未修改正文 Mermaid 块或 `chapter-37-memory-skill-boundaries.mmd`。
- 示例的 8 项 Node 测试、无副作用演示以及 `executionPerformed: false` 的既有事实均未改写；本轮未运行或模拟真实 Session、项目记忆、Skill、存储、检索、同步、权限、审批或外部系统。
- 章节完成检查表已单独勾选 Language Editing；Final Review 和全仓 `npm run validate` 仍由后续阶段与主线程验收。

## 定向校验

- 已执行 `rtk npx markdownlint-cli2 docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md .memory/reviews/2026-07-16-chapter-37-language-edit.md`：退出码 0，2 个文件、0 个错误。
- 已执行 `rtk git diff --check -- docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md .memory/reviews/2026-07-16-chapter-37-language-edit.md`：退出码 0、无输出。
- 未运行全仓 `npm run validate`；共享状态与全仓校验仍由主线程统一收口。
