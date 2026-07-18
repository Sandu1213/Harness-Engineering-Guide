---
title: "第 5 章技术审查记录"
chapter: "05"
review_type: "technical-and-citation"
status: "approved-for-next-stage"
reviewed_at: "2026-07-15"
---

# 第 5 章技术审查记录

## 审查范围

- 工件：`05-instructions-and-prompt.md`、Research Brief、Chapter Outline、事实核验清单、候选参考资料、Example Plan 与 Mermaid 图源。
- 审查类型：技术、引用、工程模型边界、图文接口、示例阶段语义与章节依赖。
- 规则：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md` 与第 5 章 `FC-*` 清单。
- 来源基线：2026-07-15 重新读取的 REF-005、REF-006、REF-010 至 REF-014；本审查只复核这些 Fact Check 已限定的陈述，不新增产品能力或 API 字段。

## 结论

**可进入下一阶段。** 正文将 Codex、Claude Code、OpenAI Model Spec、Gemini 和 Anthropic 的产品事实分别限定在来源直接支持的范围；项目规则、任务 Brief、数据、输出契约、冲突矩阵、装配器和代码审查案例均明确为本书工程模型或教学设计。图源和示例计划仍如实标记为未导出、未实现和未运行；本次审查不提前完成它们的后续阶段。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 | 结果 |
| --- | --- | --- | --- | --- |
| Chapter Outline 的完成清单 | 最后一项仍声称“未写入正文”，与已存在的 First Draft 冲突。 | 当前工件与阶段表优先于旧计划文本。 | 改为“正文采用原创表达，未伪造产品事实或已实现结果”。 | 已修复。 |
| 正文 Mermaid 块 | 与 `chapter-05-instruction-assembly.mmd` 的节点和连线一致，但遗漏两条说明图示边界的源文件注释。 | Mermaid 源是图示事实来源；正文块应能完整追溯到源。 | 将两条 `%%` 注释加入正文 Mermaid 块。 | 已修复。 |
| `.ai/references.md` | REF-010 至 REF-014 已在 Fact Check 与正文中使用，仍标为“候选官方来源”。 | 引用登记应反映当前核验状态。 | 统一改为“已核验官方来源”，保留所有外推边界。 | 已修复。 |

## 已确认事项

- 章节有单一目标：把 Instructions 与 Prompt 从不可审查长文本重构为有来源、范围、冲突记录、输出契约和验证的组件；场景、概念、图示、案例和总结均服务于这一目标。
- 正文中的产品陈述均可映射到 FC-01 至 FC-08：OpenAI Model Spec 仅作该公开 Spec 的例子；`AGENTS.md` 仅归因 Codex；`CLAUDE.md` 仅归因 Claude Code；Google 和 Anthropic 的建议不外推为跨模型保证；模型快照与 evals 建议不被写成稳定性承诺。
- 五类内容模型、装配器、冲突矩阵、报告字段与代码审查案例均标记为本书工程模型或教学设计，未被伪装成厂商协议或真实团队记录。
- Mermaid 源文件与正文 Mermaid 块逐字符一致；图中将数据标为待处理数据，且不存在“Prompt → 自动授权”“标签 → 安全”或“模型输出 → 交付”的直连。
- `assembleInstructionPacket` 只存在于 Example Plan：正文没有声称实现文件、测试、npm scripts、模型调用、真实 I/O、权限控制或运行结果已经存在。
- 第 5 章没有提前展开第 6、7、10、11、12、14、17、39、41 章的上下文选择、记忆、状态机、工具协议、权限、安全、评估或基准实现责任。

## 应该修复

无。本次未发现需要改变事实范围、工程模型、教学案例、示例接口或图示结构的技术问题。

## 已执行验证与未验证范围

2026-07-15 在仓库根目录实际完成：

```bash
awk '/^```mermaid$/ { capture = 1; next } capture && /^```$/ { exit } capture { print }' \
  docs/part-02-components/05-instructions-and-prompt.md > /tmp/chapter-05-embedded-diagram.mmd
diff -u diagrams/mermaid/chapter-05-instruction-assembly.mmd /tmp/chapter-05-embedded-diagram.mmd
npm run validate
git diff --check
```

- 修复后 Mermaid 一致性检查与 `git diff --check` 均无输出。
- `npm run validate` 在修正后实际通过：Markdown lint 检查 123 个文件、0 个错误；链接检查、四组既有示例共 18 项 Node 内置测试与状态检查通过。本记录不把尚未发生的 Example Implementation、Diagram Review 或 Final Review 写成通过。
- 未运行第 5 章专用实现、测试、演示或 Mermaid 导出，因为它们分别属于 Example Implementation 与 Diagram Review。未重新访问外部页面，因为正文当天的 Fact Check 已在同一日期完成；任何后续改写产品事实时都必须再次访问官方资料。
