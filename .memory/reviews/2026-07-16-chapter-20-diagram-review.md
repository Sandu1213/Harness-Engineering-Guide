# 第 20 章 Diagram Review

## 范围

- `diagrams/mermaid/chapter-20-improvement-change-gate.mmd`
- `diagrams/exported/chapter-20-improvement-change-gate.svg`
- `diagrams/exported/chapter-20-improvement-change-gate.png`
- 正文 Mermaid 块与读图说明。

## 已执行验证

2026-07-16 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-20-improvement-change-gate.mmd -o diagrams/exported/chapter-20-improvement-change-gate.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-20-improvement-change-gate.mmd -o diagrams/exported/chapter-20-improvement-change-gate.png -b transparent
awk '/^```mermaid$/{inside=1;next}/^```$/{if(inside)exit}inside' docs/part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.md | diff -u diagrams/mermaid/chapter-20-improvement-change-gate.mmd -
file diagrams/exported/chapter-20-improvement-change-gate.svg diagrams/exported/chapter-20-improvement-change-gate.png
```

命令均退出 0。SVG 被识别为 SVG 图像，PNG 为 784 x 1282 RGBA PNG；PNG 已实际查看。正文 Mermaid 块与源文件比较无输出。

## 审查结论

- 候选先经过独立验证、范围批准、回滚/监控三道门；没有任何箭头从失败证据直接到发布。
- 图把“可进入受控发布准备”与真实发布分开，且监控异常导向停止、回滚或人工升级。
- 图只表达本书工程模型，不表示真实 Canary、监控、回滚或 Agent 生命周期。
