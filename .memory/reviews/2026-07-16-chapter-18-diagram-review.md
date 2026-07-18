# 第 18 章 Diagram Review

## 图示范围

- Mermaid 源：`diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd`
- 导出图：对应 SVG 与 PNG。
- 正文中的 Mermaid 图块、读图说明与状态名称。

## 实际执行

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -o diagrams/exported/chapter-18-retry-recovery-state-machine.svg -b transparent -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -o diagrams/exported/chapter-18-retry-recovery-state-machine.png -b transparent -s 2
awk '...' docs/part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.md | diff -u diagrams/mermaid/chapter-18-retry-recovery-state-machine.mmd -
```

两条 Mermaid 命令均退出码 0 并生成 SVG/PNG。PNG 已实际查看：`Classify`、`RetryCheck`、`Applied`、`Retry`、`Compensate`、`NeedsObservation`、`Stop` 与 `Escalate` 均可读，且箭头保留了未知、补偿、上限与观察回路。为提升可读性，已将过长的边标签缩短为“证据或效果未知”“可重试、可重复、未超限”和“不允许重试或不安全”。正文图块与源文件的比较退出码 0、无输出。

## 图示边界

图只表达本书教学决策。`Retry` 与 `Compensate` 都回到 `Observe`，不被画成成功；`Stop` 与 `Escalate` 终止自动动作；没有描绘真实 HTTP、队列、数据库、浏览器、补偿实现、权限或人类审批。
