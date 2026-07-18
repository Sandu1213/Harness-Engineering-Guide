---
title: "第 2 章技术审查记录"
chapter: "02"
review_type: "technical-and-citation"
status: "approved-for-next-stage"
reviewed_at: "2026-07-15"
---

# 第 2 章技术审查记录

## 审查范围

- 工件：`02-agent-harness-runtime.md`、Research Brief、Outline、事实核验清单、候选参考资料、Mermaid 源文件与全局引用登记。
- 审查类型：技术、引用、责任边界、图示与读者体验。
- 规则：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`、第 2 章 `FC-*` 清单。
- 来源复核：2026-07-15 重新访问 REF-001、REF-003 原文与 REF-004 摘要页。

## 结论

**可进入下一阶段。** 本结论只表示 Technical Review 已完成；不把无可运行实现的接口草图标为 Example Implementation，也不将未渲染的 Mermaid 源文件标为 Diagram Review 通过。

四层责任表、故障归因表、接口字段和只读/可写场景均清楚标识为本书工作模型或教学假设。REF-001 仅支持 Harness 的作者工作描述，REF-003 仅支持按规划、记忆、工具使用组织的系统概览，REF-004 仅支持交错推理、动作与外部环境交互的研究背景；正文没有使用性能数字或动态产品能力。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 | 结果 |
| --- | --- | --- | --- | --- |
| `02-agent-harness-runtime.md` | 验证表仍将全仓校验写为“待执行”。 | 已有 2026-07-15 的真实校验记录，文档不得保留过期状态。 | 更新为最近一次 81 个 Markdown 文件的实际校验结果。 | 已修复。 |
| `02-agent-harness-runtime.md` | 概念接口草图说明了“不可运行”，但没有单列假设和预期观察。 | 不可运行示例必须解释原因、假设和预期。 | 补充 Harness/运行环境假设及权限拒绝、验证接受的预期观察。 | 已修复。 |
| `.ai/references.md` | 第 1 章分配引用的访问日期仍为 2026-07-14，且 REF-003、REF-004 的用途未反映第 2 章。 | 全局引用登记必须与已复核来源和章节分配一致。 | 同步为 2026-07-15，并标明第 1、2 章的限定用途。 | 已修复。 |

## 已确认事项

- 章节有单一目标：让读者按模型、Agent、Harness、运行环境的证据边界诊断失败，不把所有问题归咎于模型。
- 场景、责任表、Mermaid 图、五步排查、故障归因表和总结都围绕同一目标，且明确指出不能仅凭症状断定责任。
- 图示源文件第 3 至 15 行与正文 Mermaid 代码块第 108 至 120 行逐行一致；模型候选没有直接指向“完成”。
- 不引入具体 Sandbox、凭证或产品实现事实；这些内容仍留给后续章节和写作当日的官方来源核验。
- 安全边界覆盖权限提升、外发、敏感证据最小化和人工授权，未将教学场景叙述为真实事故记录。

## 已执行验证与未验证范围

| 项目 | 命令或方法 | 结果 |
| --- | --- | --- |
| 来源范围 | 访问 REF-001、REF-003 原文和 REF-004 摘要页。 | 2026-07-15 已复核；正文仅使用 `FC-01` 至 `FC-03` 的限定范围。 |
| Mermaid 一致性 | 比较源文件与正文代码块。 | 无差异。 |
| 章节状态一致性 | 检查正文、Fact Check、Outline、进度表。 | Technical Review 后续会标为完成；Examples、Diagrams、Fact Check、Final Review 保持未开始。 |
| 全仓 Markdown 校验 | `npm run validate`。 | 82 个 Markdown 文件 lint 为 0 错误；链接检查、4 项最小 Harness 测试和章节状态检查通过。 |
| Mermaid 渲染 | `mmdc`。 | 未执行：本机未检测到该命令；保留给 Diagram Review。 |
| 运行示例 | 专用代码与测试。 | 未执行：本章尚无可运行环境边界示例，不能用第 1 章最小 Harness 代替。 |

## 未覆盖阶段

- Example Implementation：需先定义真实环境、权限与可执行的验证命令。
- Diagram Review：需要可用 Mermaid 渲染器及渲染结果审查。
- Fact Check、Language Editing、Validation：仍须按章节工作流独立完成。
