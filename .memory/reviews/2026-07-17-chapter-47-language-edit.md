---
title: "第 47 章 Language Editing"
chapter: "47"
stage: "Language Editing"
status: "completed"
updated_at: "2026-07-17"
---

# 第 47 章 Language Editing

## 审阅范围

本轮按 `STYLE_GUIDE.md` 与 `BOOK_RULES.md` 审阅第 47 章正文，覆盖术语首现、中英文一致性、具体主语、段落密度、阶段时态、来源边界、示例说明、图示替代描述和结语责任范围。

本轮不改变六项来源的允许用途与外推禁区，不修改示例接口、状态码、Mermaid 图源或事实核验结论，也不写入共享上下文文件。

## 语言修订

- 在场景和责任框架首次出现处补齐任务契约（Task Contract）、能力授予记录（Capability Grant Record）、交接包（Handoff Package）、工具结果（Tool Result）、观察（Observation）等中英文对应。
- 补齐上下文包、证据卡、记忆记录、知识库条目、工具契约、检查点、尝试轨迹、评估规格、回归矩阵和决定记录的中文首现。
- 将 Prompt Injection、Agent Asset Register、provenance、Human-in-the-loop、workflow 与 agent 分别补为中文主语加英文术语，避免结语重新创造近义名。
- 将 OWASP 来源段落的第二句改为明确主语，避免代词指向攻击还是指南不清。
- 将章节完成检查表更新为 Language Editing 已完成，同时保留 Final Review、共享同步和全仓 Validation 未完成。

## 语义保护

- 来源编号仍为 REF-014、REF-029、REF-117、REF-063、REF-125 与 REF-129，未新增或扩大来源 claim。
- 示例仍以 `assessAgentEngineeringReadiness(input)` 为唯一接口，并保留原有十类状态与 `executionPerformed: false`。
- Mermaid 正文代码块未编辑；`.mmd` 图源、示例模块和测试文件未修改。
- 未来陈述仍保持为开放问题或工程假设；批准、权限、安全、供应链、部署、发布和长期自治仍明确未运行。

## 验证

- 专用测试退出码为 0，11 项通过、0 项失败。
- 演示退出码为 0，返回 `ready_for_bounded_pilot_review` 与 `bounded_pilot_evidence_ready`，并明确 `executionPerformed: false`。
- 正文 Mermaid 块与 `.mmd` 图源执行 `diff -u` 无差异。
- 示例模块、测试文件和 Mermaid 图源的 SHA-256 与审阅前一致。
- `markdownlint-cli2` 检查正文与本记录共 2 个文件，0 个错误。
- `markdown-link-check` 检查正文 14 个链接，全部通过。
- 两份文本的行尾空白搜索无匹配；`git diff --check` 退出码为 0。
- Final Review 与最终全仓 Validation 仍由后续阶段完成。
