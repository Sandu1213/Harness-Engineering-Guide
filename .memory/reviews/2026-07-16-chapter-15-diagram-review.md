---
chapter: "15-observation-and-state-awareness"
stage: "Diagram Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 15 章图示审查：观察反馈回路

## 范围

- `diagrams/mermaid/chapter-15-observation-feedback-loop.mmd`
- `diagrams/exported/chapter-15-observation-feedback-loop.svg`
- `diagrams/exported/chapter-15-observation-feedback-loop.png`
- 正文中的同一 Mermaid 图块、读图说明与替代边界。

## 已执行验证

2026-07-16 实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-15-observation-feedback-loop.mmd \
  -o diagrams/exported/chapter-15-observation-feedback-loop.svg \
  -b white -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-15-observation-feedback-loop.mmd \
  -o diagrams/exported/chapter-15-observation-feedback-loop.png \
  -b white -s 2
zsh -c 'awk '\''/^```mermaid/{capture=1; next} capture && /^```/{exit} capture {print}'\'' docs/part-03-intelligence-loop/15-observation-and-state-awareness.md | diff -u diagrams/mermaid/chapter-15-observation-feedback-loop.mmd -'
```

前两条命令均完成 SVG/PNG 导出；第三条命令无输出、退出码 `0`，确认正文图块和 Mermaid 源完全一致。PNG 已实际查看：中文节点、箭头标签和反馈路径可辨识，没有文本裁切。

## 交叉审查修订（2026-07-16）

第 17 章交叉审查指出，原图将 `blocked` 无条件画回观察点，视觉上会弱化停止和升级边界。修订后已重新执行上述 SVG/PNG 导出和正文图块差异比较，并再次查看 PNG：

- `needs_evidence` 仅经“刷新证据或缩小范围”回到观察点；
- `blocked` 经“停止或升级”交给恢复或人工节点，不再形成自动观察回路；
- 图源、正文图块和导出图仍一致，且新节点与箭头标签可辨识。

## 图文一致性

| 检查项 | 结论 |
| --- | --- |
| 图回答的问题 | 行动怎样经由重新观察、快照契约和解释边界进入下一轮决策。 |
| 关键路径 | `Action → Target → Observation Point → Snapshot → Check`；可解释路径进入 `observed` / `not_observed`；字段缺口经刷新/缩小范围回观察点，未知效果或错配进入停止/升级。 |
| 状态语义 | `observed`、`not_observed`、`needs_evidence`、`blocked` 与正文和示例一致。 |
| 边界 | 图与正文都明确不表示真实浏览器、日志平台、追踪、权限、审批、外部效果、验收或重试。 |
| 可访问性 | 正文在图前给出读图问题，在图后解释三项限制；SVG/PNG 不是唯一编辑来源。 |

## 结论

`可合并（等待目录与全仓校验整合）`。图没有把动作请求画成成功；`blocked` 也不再回到观察点，而是显式停止或升级。它只表达本书的教学控制流。
