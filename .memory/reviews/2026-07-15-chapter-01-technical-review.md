---
title: "第 1 章技术审查记录"
chapter: "01"
review_type: "technical-and-citation"
status: "approved-for-next-stage"
reviewed_at: "2026-07-15"
---

# 第 1 章技术审查记录

## 审查范围

- 工件：`01-prompt-to-harness.md`、Research Brief、Outline、事实核验清单、计划示例、Mermaid 源文件与最小 Harness 示例。
- 审查类型：技术、引用、示例边界、章节边界与读者体验。
- 规则：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`、第 1 章 `FC-*` 清单。
- 来源复核：2026-07-15 重新访问 REF-001 至 REF-004 的原始页面或摘要页。

## 结论

**可进入下一阶段。** 本结论仅完成 Technical Review，不表示第 1 章的示例整合、图示审查、Fact Check、语言编辑或最终完成已经通过。

正文以来源归因支持 Prompt Engineering 的背景定义、Harness 的作者工作描述、规划/记忆/工具使用的系统概览和 ReAct 的研究对象；五组件模型、案例、图示与工程建议都明确为本书原创的工作模型或教学设计，没有写成来源标准或产品能力。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 | 结果 |
| --- | --- | --- | --- | --- |
| `01-prompt-to-harness.research.md` | 已进入正文阶段的 Research Brief 仍写着“不写完整章节正文”，且两个来源状态停在 2026-07-14。 | 状态必须与实际工件一致；研究规则要求可追溯访问日期。 | 改为链接正文并说明 Brief 不替代后续审查；将 REF-001、REF-002 更新为 2026-07-15 复核。 | 已修复。 |
| `01-prompt-to-harness.md` | 最小示例的导入路径不从 `docs/part-01-foundations/` 解析。 | 代码块只能展示存在且上下文说明的路径。 | 改为 `../../examples/agent/minimal-harness.mjs`。 | 已修复。 |
| `minimal-harness.test.mjs` | 测试名称声称空指令会在工具调用前被拒绝，但原断言没有观察工具是否被调用。 | 测试必须验证可观察行为，不能只靠名称。 | 使用调用标记并断言其保持 `false`。 | 已修复。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 | 结果 |
| --- | --- | --- | --- | --- |
| 第 1 章 Markdown 验证表 | 文件数量停留在 75。 | 已有后续书稿工件，数字容易过期。 | 改为本轮最近成功总校验的 80 个 Markdown 文件。 | 已修复。 |
| `.context/PROJECT_CONTEXT.md` | 内容边界只提到第 1 章初稿。 | 与已完成的第 2 章初稿不一致。 | 同步为第 1、2 章。 | 已修复。 |

## 已确认事项

- 学习目标、场景、五组件表、图示、最小示例、案例、边界、练习与总结都围绕“文本建议不等于已验证完成”这一问题。
- REF-002 的定义范围仅用于“不更新模型权重时通过输入引导行为”；REF-001 仅用于 Harness 的作者工作描述；REF-003 仅作一种系统概览；REF-004 仅作交错推理与动作的研究背景。
- 正文反复声明五组件与图示是本书的工作模型；示例不调用模型、网络、文件系统或真实密钥，不能证明生产可靠性。
- Mermaid 源文件第 2 至 19 行与正文中 Mermaid 代码块第 115 至 132 行逐行一致。

## 已执行验证与未验证范围

| 项目 | 命令或方法 | 结果 |
| --- | --- | --- |
| 来源范围 | 访问 REF-001 至 REF-004 原始页面或摘要页。 | 2026-07-15 已复核；仅使用事实核验清单定义的范围。 |
| 最小 Harness 测试 | `npm run test:harness` | 4 项通过。 |
| 最小 Harness 演示 | `npm run example:harness` | 输出 `state: "succeeded"`、`validator accepted tool output` 与三项预期事件。 |
| Mermaid 一致性 | 比较源文件与正文代码块。 | 无差异。 |
| Mermaid 渲染 | `mmdc`。 | 未执行：本机未检测到该命令；保留给 Diagram Review。 |
| 全仓 Markdown 校验 | `npm run validate`。 | 81 个 Markdown 文件 lint 为 0 错误；链接检查、4 项最小 Harness 测试和章节状态检查通过。 |

## 未覆盖阶段

- Example Implementation：第 1 章已有最小示例，但示例整合与扩展边界尚未完成。
- Diagram Review：只有文本一致性检查，尚无 Mermaid 渲染器验证。
- Fact Check、Language Editing、Validation：仍须按后续工作流独立完成。
