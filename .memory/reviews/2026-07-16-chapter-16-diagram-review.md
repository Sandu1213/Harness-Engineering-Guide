# 第 16 章 Diagram Review

日期：2026-07-16

## 审查范围

审查 Mermaid 源 [chapter-16-reflection-candidate-loop.mmd](../../diagrams/mermaid/chapter-16-reflection-candidate-loop.mmd)、正文 Mermaid 块与导出 SVG/PNG。

## 实际执行

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-16-reflection-candidate-loop.mmd \
  -o diagrams/exported/chapter-16-reflection-candidate-loop.svg \
  -b white -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-16-reflection-candidate-loop.mmd \
  -o diagrams/exported/chapter-16-reflection-candidate-loop.png \
  -b white -s 2
```

两次导出均退出码 0。PNG 为 1568 × 202，已实际查看：轨迹、失败评估、补证、Reflection Record、可证伪检查、拒绝、审查、候选与后续工作流节点及各分支标签可读。正文 Mermaid 块与 `.mmd` 源通过 `diff -u` 比较无差异。

## 语义核对

- 只有“失败已确认”进入 Reflection Record；证据不足或陈旧回到刷新观察。
- 可证伪检查失败进入“拒绝候选，保留轨迹”，没有假装为根因确认。
- 范围扩大与审查拒绝进入升级分支，防止局部候选直接影响共享行为。
- “版本化经验候选”到“后续工作流”为虚线，且正文解释为不自动执行边界。

图示只表达本书工程模型，不表示真实 Agent、评估器、记忆库、根因分析器或规则更新器的运行时架构。
