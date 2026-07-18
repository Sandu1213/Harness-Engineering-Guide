---
title: "第 8 章语言编辑记录"
chapter: "08"
review_type: "language-edit"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 8 章语言编辑记录

## 范围

- 正文：`docs/part-02-components/08-skills-and-reusable-capabilities.md`。
- 规则：`STYLE_GUIDE.md`、`.ai/glossary.md`、`BOOK_RULES.md`。
- 不在本次范围：REF-024 至 REF-027 的来源结论、`evaluateSkillSelection` 接口与测试、Mermaid 源和导出图。

## 完成的编辑

1. 将首次出现的“技能（Skill）”“提示词（Prompt）”“工具（Tool）”“工作流（Workflow）”“钩子（Hook）”“插件（Plugin）”统一为中文在前、英文在后的写法。
2. 拆分连续的来源陈述，保留 Agent Skills Specification、Claude Code 与 ChatGPT 的各自产品或规范边界。
3. 将外部动作的检查写为“授权证据”而非暗示 Contract 自身可检查或授予身份与环境权限。
4. 修正测试与验证小节中过期的图示阶段说明：图源、SVG/PNG 导出和视觉审查均已完成；真实 Markdown 审查仍未实施。
5. 拆分案例中的长句，并修复“见示例实现记录”的链接前空格。

## 结论

**通过。** 编辑只涉及术语首次呈现、段落节奏、主语和阶段时态。正文继续把规范或产品事实、本书 Skill Contract 模型和纯内存教学示例分开；不新增任何来源、产品能力、权限结论、示例行为或图示含义。

## 未覆盖阶段

- Final Review：仍需重新核对正文、事实核验、示例、Mermaid 源、导出图、审查记录和项目状态的一致性。
