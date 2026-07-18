# 第 17 章 Diagram Review

## 范围

- `diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd`
- `diagrams/exported/chapter-17-evaluation-evidence-pipeline.svg`
- `diagrams/exported/chapter-17-evaluation-evidence-pipeline.png`
- 第 17 章正文 Mermaid 块与读图说明。

## 已执行验证

2026-07-16 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -o diagrams/exported/chapter-17-evaluation-evidence-pipeline.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -o diagrams/exported/chapter-17-evaluation-evidence-pipeline.png -b transparent
awk '/^```mermaid$/{inside=1;next}/^```$/{if(inside)exit}inside' docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md | diff -u diagrams/mermaid/chapter-17-evaluation-evidence-pipeline.mmd -
```

三条命令均退出 0。前两条生成 SVG/PNG；PNG 已实际查看。源文件与正文 Mermaid 块的比较无输出，证明二者一致。

## 审查结论

- 图只回答“规格和证据如何形成可解释的评估结论”，没有把质量门画成真实 CI、Tool 执行或任务完成。
- 模型评判器被画为可选证据，并明确需要校准；它不直接连到接受结论。
- 必需标准缺证分流到补证、修订规格或人工复核；通过与拒绝分别记录为不同终点，再交给第 18 章。
- 纵向布局经视觉检查后保持可读，节点名称与正文的 Evaluation Spec、Evidence Record、质量门、补证、接受和拒绝一致。

## 未验证范围

图不表示真实模型评判器、真实人工校准、外部状态、链接检查、CI、权限、恢复动作或任务完成；SVG/PNG 仅为本书模型导出图。
