---
chapter: "11-tool-use-and-tool-protocols"
stage: "Diagram Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 11 章 Diagram Review：工具调用的准入与证据边界

## 范围

- 图源：`diagrams/mermaid/chapter-11-tool-invocation-sequence.mmd`。
- 导出：`diagrams/exported/chapter-11-tool-invocation-sequence.svg` 与 `.png`。
- 正文：`11-tool-use-and-tool-protocols.md` 的 Mermaid 块、图源与导出链接、替代描述和读图结论。

## 实际渲染与视觉检查

2026-07-16 实际运行以下命令，均以退出码 `0` 结束：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-11-tool-invocation-sequence.mmd \
  -o diagrams/exported/chapter-11-tool-invocation-sequence.svg \
  -b white -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-11-tool-invocation-sequence.mmd \
  -o diagrams/exported/chapter-11-tool-invocation-sequence.png \
  -b white -s 2
```

首次透明背景导出在深色预览下使深色文字对比度不足；这是可读性问题而不是语法问题。因此改为白色背景、两倍缩放后重新导出并查看 PNG。最终图中“模型”“Harness”“准入门”“工具适配器”“外部目标”“独立观察”“验收者”七个参与者、准入拒绝分支、当前教学模型中的通过分支、可关联结果分支和超时无回读分支均可辨识。

## 图文一致性

- 已从正文第一个 Mermaid 代码块提取源码并用 `diff -u` 与 `.mmd` 图源比较；退出码为 `0`，无输出。
- 准入不通过时，图只反馈或停止候选，并明确“不调用目标”；它不把模型候选、描述、Schema 或 `requires_approval` 画成已授权或已执行。
- 通过分支仅表述“可构造请求候选”，并把适配器到外部目标的箭头限定为“仅在具体运行时获准后发送”。这保留第 12、14 章对实际环境、权限和人工批准的责任。
- 结果、独立观察和验收者分为三段；图不把 Result Envelope、回读或验收者任一输出升级为另两项结论。
- 超时且没有回读时输出 `effect_unknown`，并回到补证、停止或升级候选；图没有暗示自动重试、目标未变或任务已失败。
- 正文提供图源、SVG、PNG、替代描述和读图结论；图与导出只表达本书工程模型。

## 全仓校验

图示及状态同步完成后将由主线程运行 `npm run validate` 与 `git diff --check`；实际结果必须补记到 `CURRENT_STATE.md` 与交接文件。该校验即使通过，也只覆盖仓库中的 Markdown、链接、纯内存示例、图源和导出工件，不证明真实 Tool、MCP、SDK、权限、批准、外部目标、回读、验收或任何外部效果。

## 未验证范围

本次只验证 Mermaid 源码、SVG/PNG 导出、PNG 可读性和图文一致性；不验证 MCP、SDK、工具注册、Schema 实现、文件、网络、数据库、浏览器、凭证、Sandbox、权限、人工批准、真实外部目标、回读可靠性、业务验收、审计、重试或外部效果。
