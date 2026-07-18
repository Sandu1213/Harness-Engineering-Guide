---
title: "第 4 章图示审查记录"
chapter: "04"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 4 章图示审查记录

## 审查范围

- Mermaid 源码：`diagrams/mermaid/chapter-04-reliability-loop.mmd`
- 正文图、读图说明和替代描述：`docs/part-01-foundations/04-reliable-agent-engineering-principles.md`
- 导出产物：`diagrams/exported/chapter-04-reliability-loop.svg`、`diagrams/exported/chapter-04-reliability-loop.png`
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`diagrams/README.md`、`.ai/prompts/diagram.prompt.md` 与 `.ai/review-checklist.md`。

## 结论

**通过。** Mermaid 源码可由实际 CLI 导出为 SVG 与 PNG；视觉检查确认目标、预检、风险判断、受控执行、验证、恢复、升级、记录和下一任务节点均可见。实线的继续、停止、恢复和交接路径，以及稳定规则、验证证据两条虚线关系均可辨认，未见文本裁切。

审查中发现“前置证据”被自动换行为孤立单字。已在源图与正文 Mermaid 块同步使用明确换行，使预检节点以“预检：范围、权限、/ 前置证据”两行呈现；这只改善布局，不改变图的行为语义。

本审查不替代本章的 Language Editing 或 Final Review。

## 图文一致性

| 图中元素或箭头 | 正文对应说明 | 审查结果 |
| --- | --- | --- |
| 可观察目标 → 预检 → 风险与证据判断 | 工作流程先固定任务契约，再检查范围、前置、批准和变更前快照。 | 一致。 |
| 判断“是” → 受控执行 → 读取结果并运行验证 | 正文要求仅在风险相称的受限范围执行，并将工具返回与目标验证分开。 | 一致。 |
| 目标满足“是” → 记录证据、状态与交接 → 下一项任务 | 正文将通过路径限定为保存当前任务证据与下一项可领取任务，不把记录等同于风险消失。 | 一致。 |
| 目标不满足“否” → 记录失败、回滚或修复 → 可安全恢复判断 | 正文要求验证失败保留失败证据、恢复建议和重新预检条件。 | 一致。 |
| 风险不足或恢复超阈值 → 停止或请求人工升级 → 记录 | 正文将不可逆、高风险或证据不足视为正常升级分支，不把升级写为成功。 | 一致。 |
| 稳定规则虚线 → 预检；验证输出虚线 → 目标判断 | 正文说明规则只表达策略，验证和审查证据支撑判断；二者都不强制真实权限。 | 一致。 |

正文 Mermaid 代码块与去除源文件注释后的 Mermaid 源码完全相同。

## 已执行验证

2026-07-15 在仓库根目录实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli --version
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-04-reliability-loop.mmd -o diagrams/exported/chapter-04-reliability-loop.svg -b transparent
npx --yes @mermaid-js/mermaid-cli -i diagrams/mermaid/chapter-04-reliability-loop.mmd -o diagrams/exported/chapter-04-reliability-loop.png -b transparent
```

- CLI 版本输出：`11.16.0`。
- 两次渲染均输出 `Generating single mermaid chart` 并以退出码 0 完成。
- SVG 被 `file` 识别为 SVG，大小为 31,394 字节；PNG 被识别为 784 × 1,604 的 RGBA PNG，大小为 93,598 字节。
- 已实际查看 PNG：所有节点、箭头、分支标签和虚线关系均可辨认，无文本裁切；预检节点的强制换行可读。
- 已实际运行文本一致性检查：正文 Mermaid 代码块与去除源文件注释后的图源完全相同。

- 本记录写入并同步状态后实际运行 `npm run validate`：113 个 Markdown 文件 lint 为 0 错误，链接检查、四组示例共 18 项 Node 内置测试和章节状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）。`git diff --check` 无输出，退出码 0。
- 不将当前图示渲染结果或项目校验外推为产品权限、发布链路或任何外部系统行为。

## 边界

- Mermaid CLI 通过一次性 `npx` 调用使用，未被加入项目依赖或锁文件；`.mmd` 源码仍是唯一可编辑、可再渲染的事实来源。
- SVG/PNG 仅证明当前 Mermaid 语法和布局可渲染，不证明 VitePress、PDF 或 EPUB 发布链路完成。
- 图中的规则、证据、恢复和升级关系是本书工程模型，不表示特定产品的内部架构、真实访问控制或自动回滚能力。
