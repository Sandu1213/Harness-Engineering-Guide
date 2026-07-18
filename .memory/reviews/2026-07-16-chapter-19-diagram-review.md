---
chapter: "19-context-compaction-and-long-running-tasks"
review_type: "diagram-review"
status: "complete"
reviewed_at: "2026-07-16"
---

# 第 19 章图示审查

## 审查对象

- `diagrams/mermaid/chapter-19-context-compaction-recovery.mmd`
- `diagrams/exported/chapter-19-context-compaction-recovery.svg`
- `diagrams/exported/chapter-19-context-compaction-recovery.png`
- 正文中的 Mermaid 代码块。

## 实际验证

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-19-context-compaction-recovery.mmd -o diagrams/exported/chapter-19-context-compaction-recovery.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-19-context-compaction-recovery.mmd -o diagrams/exported/chapter-19-context-compaction-recovery.png -b transparent
awk '/^```mermaid$/{inside=1;next}/^```$/{if(inside)exit}inside' docs/part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.md | diff -u diagrams/mermaid/chapter-19-context-compaction-recovery.mmd -
```

两次 Mermaid 导出均以退出码 0 完成，输出为 `Generating single mermaid chart`；图源一致性比较无输出、退出码 0。已实际查看 PNG：节点从原始轨迹分流到锚点、指针和保留/丢弃决定，再汇入 Compaction Record；身份和损失检查各有明确的补证或停止出口。

## 边界核对

- `Summary` 不直接连到下一轮 Context Packet，避免把摘要画成证据替代物。
- 身份或契约不匹配走“停止或升级”，不自动重试。
- 锚点/指针缺失走“补证或重新装配”，不以模型文本补齐。
- 图只表达本书教学模型，不表示任何产品会自动读取指针、保存记忆或执行恢复。
