---
chapter: "13-knowledge-base-and-retrieval"
stage: "Diagram Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 13 章 Diagram Review：检索证据流水线

## 范围

- 图源：`diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd`。
- 导出：`diagrams/exported/chapter-13-retrieval-evidence-pipeline.svg` 与 `.png`。
- 正文：第 13 章的 Mermaid 块、图源与导出链接、读图说明和替代描述。

## 实际渲染与视觉检查

2026-07-16 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd \
  -o diagrams/exported/chapter-13-retrieval-evidence-pipeline.svg \
  -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-13-retrieval-evidence-pipeline.mmd \
  -o diagrams/exported/chapter-13-retrieval-evidence-pipeline.png \
  -b transparent
```

两条命令均以退出码 `0` 结束。已实际查看 PNG：Task Scope、Retrieval Policy、Candidate Set、Evidence Gates、Evidence Card、Context Package、Cited Output、`needs_evidence`、`blocked`、停止/升级出口和 Evaluation 节点均可辨识。虚线与实线在布局上可区分；从 `blocked` 到停止的路径没有暗示自动修复。

## 图文一致性

- Mermaid 块与 `.mmd` 图源采用同一节点、箭头与文字；后续本地 `diff -u` 检查无差异。
- Evidence Gates 到 Evidence Card 的实线只标记“通过当前任务的证据门”，不把通过写成事实正确性或任务成功。
- `needs_evidence` 只回到 Policy 重新评估；`blocked` 只进入停止或升级说明，避免把来源种类拒绝画成可自动绕过。
- Output 到 Evidence Card 的虚线表达主张回链；Evidence Card 到 Evaluation 的虚线明确它不能替代第 17 章的独立判定。
- 正文提供图源、SVG、PNG 与完整替代描述，图示术语与正文一致。

## 未验证范围

本次验证 Mermaid 渲染、PNG 可读性和图文一致性；不验证任何真实搜索、向量化、索引、网页访问、数据权限、来源可信度、内容正确性、模型上下文、引用格式、任务验收或外部系统行为。
