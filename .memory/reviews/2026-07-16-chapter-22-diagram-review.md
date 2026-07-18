# 第 22 章图示审查

日期：2026-07-16
图源：`diagrams/mermaid/chapter-22-repository-rule-loading.mmd`

## 实际执行

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.png -b transparent
file diagrams/exported/chapter-22-repository-rule-loading.svg diagrams/exported/chapter-22-repository-rule-loading.png
awk '/^```mermaid$/{inside=1;next}/^```$/{if(inside)exit}inside' docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.md | diff -u diagrams/mermaid/chapter-22-repository-rule-loading.mmd -
```

两次 Mermaid 导出成功。`file` 确认 SVG 为可缩放矢量图，PNG 为 784 × 1395 的 RGBA 图像。正文 Mermaid 代码块和 `.mmd` 源 `diff -u` 无输出。

## 视觉检查

已查看 PNG：入口、稳定规则、项目上下文、状态、任务、Packet、范围、冲突、校验与回写节点均可读；状态新鲜度、范围不匹配和冲突三条保守出口可追踪。长回路保留为纵向流，未把“可开始”绘制成自动授权或自动写入。

## 语义边界

- 图是本书仓库规则工作流，不是 Codex 或 Claude Code 内部加载图。
- `可开始一个可验收任务` 不代表文件已加载、权限已批准或结果已验证。
- 真实工具控制、环境准入和审批仍由第 12、14、23、41 章对应工件处理。
