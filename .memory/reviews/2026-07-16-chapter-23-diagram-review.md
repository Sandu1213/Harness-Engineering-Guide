# 第 23 章 Diagram Review

## 目标

检查图是否把 Skill、Hook、Workflow、Automation 的主要责任与独立权限/批准、观察/验收边界分开，而不画成真实 Codex Hook、CI 或调度系统。

## 实际执行

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-23-skill-hook-workflow-boundary.mmd -o diagrams/exported/chapter-23-skill-hook-workflow-boundary.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-23-skill-hook-workflow-boundary.mmd -o diagrams/exported/chapter-23-skill-hook-workflow-boundary.png -b transparent
file diagrams/exported/chapter-23-skill-hook-workflow-boundary.svg diagrams/exported/chapter-23-skill-hook-workflow-boundary.png
```

实际结果：两条 Mermaid 导出命令均退出 0。`file` 将导出物识别为 SVG 与 784×907 PNG。PNG 已人工视觉检查：任务请求先经责任分类，四条路径的标签、权限/批准菱形、停止出口、观察/验收和人工读取节点均可读，没有覆盖或裁切。

## 图文一致性检查

- `Skill` 节点只连到选择和前置条件记录，不连到权限或真实执行。
- `Hook` 节点只连到事件与失败路径记录，不连到状态恢复。
- `Workflow` 节点只连到状态、证据与恢复线索。
- `Automation` 节点只连到可见报告，报告仍由人类或后续流程读取。
- 所有可请求动作经过独立权限与批准边界；拒绝、缺证或范围变化进入停止、补证或升级。

正文 Mermaid 块与 `diagrams/mermaid/chapter-23-skill-hook-workflow-boundary.mmd` 将在 Final Review 以 `diff -u` 复核。图只表达本书模型，不证明真实 Hook、CI、调度、权限、文件、网络或外部效果。
