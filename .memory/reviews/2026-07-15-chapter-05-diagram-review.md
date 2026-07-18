---
title: "第 5 章图示审查记录"
chapter: "05"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 5 章图示审查记录

## 审查范围

- Mermaid 源码：`diagrams/mermaid/chapter-05-instruction-assembly.mmd`
- 正文图、读图说明和替代描述：`docs/part-02-components/05-instructions-and-prompt.md`
- 导出产物：`diagrams/exported/chapter-05-instruction-assembly.svg`、`diagrams/exported/chapter-05-instruction-assembly.png`
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`diagrams/README.md`、`.ai/prompts/diagram.prompt.md` 与 `.ai/review-checklist.md`。

## 结论

**通过。** Mermaid 源码可由实际 CLI 导出为 SVG 与 PNG；视觉检查确认四类输入、装配器、来源与范围判断、组件清单、候选输出、独立验证、完成判断、交付和升级节点均可见。实线的正常、拒绝与验证失败路径，以及两条虚线反馈关系均可辨认，未见文本裁切。

本审查不替代本章的 Language Editing 或 Final Review。

## 图文一致性

| 图中元素或箭头 | 正文对应说明 | 审查结果 |
| --- | --- | --- |
| 项目规则、任务 Brief、数据上下文、输出契约 → 装配器 | 正文将四类内容拆为稳定规则、任务请求、待处理数据和交付约束。 | 一致。 |
| 数据上下文以“仅作为数据”的虚线进入装配器 | 正文强调被装入 Prompt 的外部文本不会自动提升为项目规则。 | 一致。 |
| 装配器 → 来源与范围判断 → 组件清单 | 正文要求先识别来源与类别、检查范围并记录冲突，再形成待验证组件。 | 一致。 |
| 冲突、来源不明或超出范围 → 拒绝、澄清或人工升级 | 冲突矩阵要求任务超范围、契约缺失和未知裁决停止、澄清或升级，而非猜测产品优先级。 | 一致。 |
| 候选输出 → 独立验证 → 完成判断 | 正文区分格式约束、业务判断与人工接受；模型输出不直接等同于交付。 | 一致。 |
| 升级结果与验证范围以虚线回写 | 正文要求保存裁决依据、风险、验证范围和失败证据，以便继续装配或交接。 | 一致。 |

正文 Mermaid 代码块与源文件完全相同，包含两行边界注释。

## 已执行验证

2026-07-15 在仓库根目录实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli --version
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-05-instruction-assembly.mmd -o diagrams/exported/chapter-05-instruction-assembly.svg -b transparent
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-05-instruction-assembly.mmd -o diagrams/exported/chapter-05-instruction-assembly.png -b transparent
```

- CLI 版本输出：`11.16.0`。
- 两次渲染均输出 `Generating single mermaid chart` 并以退出码 0 完成。
- SVG 被 `file` 识别为 SVG；PNG 被识别为 784 × 892 的 RGBA PNG。
- 已实际查看 PNG：所有节点、箭头、分支标签和虚线关系均可辨认，无文本裁切；数据上下文的虚线标签与完成/升级分支可读。
- 本记录写入和状态同步后实际运行 `npm run validate`：125 个 Markdown 文件 lint 为 0 错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）。`git diff --check` 无输出，退出码 0。
- 上述结果只证明本仓库的 Markdown、链接、示例与当前图示可渲染，不外推为产品权限、发布链路或外部系统行为。

## 边界

- Mermaid CLI 通过一次性 `npx` 调用使用，未被加入项目依赖或锁文件；`.mmd` 源码仍是唯一可编辑、可再渲染的事实来源。
- SVG/PNG 仅证明当前 Mermaid 语法和布局可渲染，不证明 VitePress、PDF 或 EPUB 发布链路完成。
- 图中的来源、范围、冲突、验证和升级关系是本书工程模型，不表示特定产品的内部架构、消息优先级、真实访问控制或自动执行能力。
