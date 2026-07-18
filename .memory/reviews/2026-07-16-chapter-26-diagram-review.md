---
title: "第 26 章 Diagram Review：多 Agent 所有权与集中集成"
chapter: "26"
review: "diagram"
status: "completed"
updated_at: "2026-07-16"
---

# 第 26 章 Diagram Review：多 Agent 所有权与集中集成

## 渲染

使用 Mermaid CLI 11.16.0 实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-26-multi-agent-ownership-swimlane.mmd -o diagrams/exported/chapter-26-multi-agent-ownership-swimlane.svg -b white
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-26-multi-agent-ownership-swimlane.mmd -o diagrams/exported/chapter-26-multi-agent-ownership-swimlane.png -b white -s 2
```

两个命令均完成并输出 `Generating single mermaid chart`。导出 PNG 为 1568 × 880 RGB 图像。

## 图源一致性与视觉检查

- 正文 Mermaid 代码块与 `diagrams/mermaid/chapter-26-multi-agent-ownership-swimlane.mmd` 使用 `diff -u` 比较，无输出。
- 已实际查看 PNG：协调者、Agent A、Agent B 三个 subgraph 边框可见；Task Contract、局部验证、两个 Delivery Package、Integration Gate 和共享工件均可读。
- 两条虚线“**不直接写入**”从专属路径指向共享工件；两条冲突路径都进入“停止局部推进”；Integration Gate 的缺证/冲突/范围变化箭头回到 Task Contract。没有节点裁切。

## 语义边界

图只表达本书 Task Contract、专属路径、交付包和集成门的工件流。图中并列的 Agent A/B 不表示实际并行；箭头也不表示真实进程、worktree、文件锁、消息、Git、权限、外部写入或验证结果。
