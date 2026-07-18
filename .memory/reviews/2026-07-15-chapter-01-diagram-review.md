---
title: "第 1 章图示审查记录"
chapter: "01"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 1 章图示审查记录

## 审查范围

- Mermaid 源码：`diagrams/mermaid/chapter-01-prompt-to-harness.mmd`
- 正文图与读图说明：`docs/part-01-foundations/01-prompt-to-harness.md`
- 导出产物：`diagrams/exported/chapter-01-prompt-to-harness.svg`、`diagrams/exported/chapter-01-prompt-to-harness.png`
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`diagrams/README.md` 与 `.ai/review-checklist.md`。

## 结论

**通过。** Mermaid 源码可由实际 CLI 渲染为 SVG 与 PNG；视觉检查确认节点、Harness 边界、箭头和“接受/拒绝”标签可见，未见裁切。正文的读图说明、替代描述和导出产物均使用同一套术语。

本审查只确认图示接口和渲染，不替代本章的 Fact Check、Language Editing 或 Final Review。

## 图文一致性

| 图中元素或箭头 | 正文对应说明 | 审查结果 |
| --- | --- | --- |
| 任务目标与约束 → Prompt：表达任务 → 模型提议 | 第 1 点说明 Prompt 将目标交给模型，输出只是提议。 | 一致。 |
| 模型提议与状态与事件 → 受控工具 | 图示和替代描述都将状态作为下一次受控工具调用的约束。 | 一致。 |
| 受控工具 → 工具结果与目标状态 → 验证器 | 第 2、3 点说明先观察，再判断是否可接受。 | 一致。 |
| 验证器的接受或拒绝 → 证据记录 → 状态与事件 | 第 3、4 点说明两种判断都先记录证据，再回写状态。 | 一致；本次修正了拒绝路径以避免证据节点被绕过。 |
| Harness：组织可验证闭环 | 正文明确图为本书工程模型，而非外部产品架构。 | 一致。 |

## 已执行验证

2026-07-15 在仓库根目录实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli --version
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-01-prompt-to-harness.mmd -o diagrams/exported/chapter-01-prompt-to-harness.svg -b transparent
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-01-prompt-to-harness.mmd -o diagrams/exported/chapter-01-prompt-to-harness.png -b transparent
```

- CLI 版本输出：`11.16.0`。
- 两次渲染均输出 `Generating single mermaid chart` 并以退出码 0 完成。
- SVG 被 `file` 识别为 SVG，大小为 22,469 字节；PNG 被识别为 784 × 137 的 RGBA PNG，大小为 14,199 字节。
- 已实际查看 PNG：所有节点与箭头可见，接受与拒绝标签没有与节点重叠到无法辨认。
- `npm run validate`：86 个 Markdown 文件 lint 为 0 错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查均通过；`git diff --check` 无输出。

## 修正与边界

- 原图把“拒绝”直接写回状态，但正文又说明证据记录接受或拒绝原因，形成一处责任不一致。本次改为“接受或拒绝均先进入证据记录，再回写状态”，并同步 Mermaid 源码、正文代码块、读图说明和替代描述。
- 渲染使用一次性 `npx` 调用，未将 Mermaid CLI 加入项目依赖或锁文件；源码仍可审查和再渲染。
- PNG/SVG 证明当前 Mermaid 语法与布局可渲染，不证明 VitePress、PDF 或 EPUB 发布链路已完成。
