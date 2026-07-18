# 第 7 章 Diagram Review

日期：2026-07-15

## 范围

审查 `diagrams/mermaid/chapter-07-memory-record-lifecycle.mmd` 及其正文 Mermaid 块。图只表达本书的 Memory Record 工程模型，不表示供应商产品内部实现、自动写入、事实成立、授权、安全、完成或真实执行。

## 实际渲染与视觉检查

使用 Mermaid CLI 11.16.0 实际执行两次渲染：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-07-memory-record-lifecycle.mmd \
  -o diagrams/exported/chapter-07-memory-record-lifecycle.svg
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-07-memory-record-lifecycle.mmd \
  -o diagrams/exported/chapter-07-memory-record-lifecycle.png
```

两次命令均输出 `Generating single mermaid chart` 并成功结束。随后实际查看 PNG：当前观察、记忆候选、记录检查、资格判断、工作记忆、长期候选、Context Packet 候选、直接证据复核、保留、修订、过期、撤销及四条反馈关系均可读。

## 修正

初次视觉检查发现“阻塞、补证或人工升级”到“当前任务读取”的虚线可能被误读为未决记录仍可直接读取。图源与正文已同步为“补证或人工裁决后重新检查”，回到记录检查节点。跨任务分支的节点也从 `Long-term Memory` 改为 `Long-term Candidate`，避免把候选写成已持久化状态。

## 结论

导出的 SVG/PNG、Mermaid 源、正文 Mermaid 块和替代描述一致。图示仅可证明该书工程模型已被渲染与审查；不提供真实存储、检索、授权、隐私、安全或产品行为的证据。下一阶段为 Language Editing。
