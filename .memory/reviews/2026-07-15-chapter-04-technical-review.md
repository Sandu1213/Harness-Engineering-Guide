---
title: "第 4 章技术审查记录"
chapter: "04"
review_type: "technical-and-citation"
status: "approved-for-next-stage"
reviewed_at: "2026-07-15"
---

# 第 4 章技术审查记录

## 审查范围

- 工件：`04-reliable-agent-engineering-principles.md`、Research Brief、Chapter Outline、事实核验清单、候选参考资料、Example Plan 与 Mermaid 图源。
- 审查类型：技术、引用、责任边界、图文接口、示例阶段语义与章节依赖。
- 规则：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md` 与第 4 章 `FC-*` 清单。
- 当日来源复核：NIST AI RMF 原始页面、OpenAI《A practical guide to building agents》、Google SRE Canary 页面与 Lilian Weng 的 Harness 文章。

## 结论

**可进入下一阶段。** 正文将 NIST 的风险管理背景、OpenAI 的 Guardrails / 工具风险 / 人工介入建议、Google SRE 的 Canary 工程类比，以及本书的可靠性原则、教学案例明确分层。计划示例和图源仍如实标记为未运行实现与未完成视觉审查；本结论不提前完成它们的后续阶段。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 | 结果 |
| --- | --- | --- | --- | --- |
| 正文 front matter | `related_chapters` 中第 11 章 slug 写为 `11-tool-use-and-tool-protocols`，与第 2 章现有稳定约定 `11-tool-use-and-protocol` 不一致。 | 章节命名和交叉引用必须保持稳定。 | 改为既有 stable slug。 | 已修复。 |
| Chapter Outline 的“章节工件状态” | 已完成的 Fact Check、Mermaid 图源、Example Plan 与 First Draft 仍被列为待完成。 | 状态文件和工件必须反映实际阶段，不能让计划覆盖事实。 | 逐项更新为已完成，并标明 Technical Review 后续和未完成阶段。 | 已修复。 |
| 正文和 Chapter Outline 的原则结构 | Research Brief 与 Fact Check 定义六项原则，但正文和 Outline 只显式列出五项，将验证闭环隐含在其他段落中。 | 原创原则的数量、名称和章节契约必须在 Research、Outline、正文与审查记录中一致。 | 将“以独立验证闭环结束”补为原则二，并顺延后续编号。 | 已修复。 |
| `.context/PROJECT_CONTEXT.md` | 内容边界仍只描述第 1、2 章的正文阶段。 | 项目上下文必须使新接力者在数分钟内掌握真实状态。 | 更新为第 1 至 3 章完成、第 4 章进入 Technical Review。 | 已修复。 |

## 已确认事项

- 本章有单一目标：把“看似完成”转换为有目标、权限边界、证据、停止路径和责任人的工程闭环；场景、六项原则、图示、案例和总结均围绕该目标展开。
- 来源事实保持在 Fact Check 的范围内：NIST 页面说明 AI RMF 的风险管理目标和自愿性质；OpenAI 页面说明分层 Guardrails、基于读写/可逆性/权限/财务影响的工具风险考虑，以及失败阈值或高风险动作的人工介入；Google SRE 页面说明 Canary 的子集投放、好坏评估和发布流程整合。正文没有把这些来源表述为 Agent 的统一标准或真实产品保证。
- Mermaid 源码去除两行源文件注释后，与正文 Mermaid 块逐字符一致；图中没有“模型输出 → 完成”或“Prompt → 权限”的直连，并明确保留停止、恢复和升级路径。
- `evaluateConfigChange(snapshot)`、其测试与演示命令在正文和 Example Plan 中均明确为待实现；章节没有声称真实文件、网络、权限、审批、Canary 流量或生产回滚已运行。
- 第 4 章仅建立可靠性基线；具体状态机、工具协议、Sandbox、审批、评估与审计仍交给后续章节，未重复或抢占它们的实现范围。

## 应该修复

无。本次未发现需要改变来源边界、教学案例、示例契约或图示接口的技术问题。

## 已执行验证与未验证范围

2026-07-15 在仓库根目录实际完成：

```bash
node --input-type=module -e '<Mermaid 源与正文代码块一致性检查>'
npm run validate
git diff --check
```

- Mermaid 一致性检查输出 `chapter-04 Mermaid source and body block match`。
- `npm run validate` 与 `git diff --check` 均以退出码 0 完成。
- 本次通过官方原始页面重新限定 REF-007 至 REF-009 与 REF-001 的正文使用范围；OpenAI 链接仍因检查器的 HTTP 403 按精确 URL 忽略，不能据此当作来源失效。
- 未运行第 4 章专用模块、测试、演示或 Mermaid 导出，因为它们分别属于 Example Implementation 与 Diagram Review；本审查不将未执行工件写成通过。
