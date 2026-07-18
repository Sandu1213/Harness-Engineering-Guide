---
title: "第 2 章图示审查记录"
chapter: "02"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 2 章图示审查记录

## 审查范围

- Mermaid 源码：`diagrams/mermaid/chapter-02-agent-harness-runtime.mmd`
- 正文图与读图说明：`docs/part-01-foundations/02-agent-harness-runtime.md`
- 导出产物：`diagrams/exported/chapter-02-agent-harness-runtime.svg`、`diagrams/exported/chapter-02-agent-harness-runtime.png`
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`diagrams/README.md`、`.ai/prompts/diagram.prompt.md` 与 `.ai/review-checklist.md`。

## 结论

**通过。** Mermaid 源码可由实际 CLI 渲染为 SVG 与 PNG；视觉检查确认四层责任节点、候选与 Runtime 反馈的两条虚线、观察回流和证据回到 Agent 的闭环均可见，未见裁切。正文读图说明和替代描述均将这张图限定为本书工作模型，而非外部产品架构。

本审查不替代本章的 Fact Check、Language Editing 或 Final Review。

## 图文一致性

| 图中元素或箭头 | 正文对应说明 | 审查结果 |
| --- | --- | --- |
| 任务目标与约束 → Agent | 本章将 Agent 定义为依据任务、状态和观察选择下一步的决策角色。 | 一致。 |
| Agent → 模型；模型虚线 → Harness | 读图说明限定模型只能产生候选，候选必须经 Harness，不直达完成。 | 一致。 |
| Agent → Harness | Agent 将受控执行与验证请求交给 Harness。 | 一致。 |
| Harness → 运行环境 → 工具与外部系统 → 环境结果与观察 → Harness | 读图说明和工作流程都要求执行结果成为可观察输入并回流 Harness。 | 一致。 |
| 运行环境虚线 → Harness | 虚线表达拒绝、错误或资源限制等环境反馈。 | 一致。 |
| Harness → 验证结果与事件记录 → Agent | Agent 读取证据以停止、恢复、请求审批或进行下一次受控尝试。 | 一致。 |

正文中的 Mermaid 代码块与图源除两行只供源文件读者使用的注释外无差异。

## 已执行验证

2026-07-15 在仓库根目录实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli --version
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-02-agent-harness-runtime.mmd -o diagrams/exported/chapter-02-agent-harness-runtime.svg -b transparent
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-02-agent-harness-runtime.mmd -o diagrams/exported/chapter-02-agent-harness-runtime.png -b transparent
```

- CLI 版本输出：`11.16.0`。
- 两次渲染均输出 `Generating single mermaid chart` 并以退出码 0 完成。
- SVG 被 `file` 识别为 SVG，大小为 24,067 字节；PNG 被识别为 565 × 766 的 RGBA PNG，大小为 53,886 字节。
- 已实际查看 PNG：节点、箭头和两条虚线反馈路径均可辨认，没有文本裁切。
- `npm run validate`：87 个 Markdown 文件 lint 为 0 错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查均通过；`git diff --check` 无输出。

## 边界

- Mermaid CLI 通过一次性 `npx` 调用使用，未被添加到项目依赖或锁文件；源码仍是可审查、可再渲染的事实来源。
- 导出图证明当前 Mermaid 语法和布局可渲染，不证明 VitePress、PDF 或 EPUB 发布链路已经完成。
- 图中的 Agent、Harness、Runtime 和外部系统是本书的诊断模型，不表示任何来源文章或产品的内部实现。
