# 第 8 章 Diagram Review

## 范围

- 图源：`diagrams/mermaid/chapter-08-skill-lifecycle.mmd`。
- 导出：`diagrams/exported/chapter-08-skill-lifecycle.svg` 与 `.png`。
- 正文：`08-skills-and-reusable-capabilities.md` 中的 Mermaid 块、图源链接和替代描述。

## 实际渲染与视觉检查

2026-07-15 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-08-skill-lifecycle.mmd \
  -o diagrams/exported/chapter-08-skill-lifecycle.svg \
  -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-08-skill-lifecycle.mmd \
  -o diagrams/exported/chapter-08-skill-lifecycle.png \
  -b transparent
```

两次命令均以 0 退出。已实际查看 PNG：技能契约、可发现目录、任务匹配、适用性判断、前置检查、三类选择结果、受控 Tool 请求、独立授权边界、可观察结果、验证、结果记录和版本反馈均可辨识；长循环箭头未遮挡节点标签。

## 图文一致性

- 正文 Mermaid 块与 `.mmd` 图源逐行一致。
- `not_applicable`、`blocked`、`requires_approval`、技能契约（Skill Contract）、Tool、验证与版本术语与正文和纯内存示例一致。
- `运行环境与源系统：独立授权边界` 被放入单独子图。Skill 被发现、任务匹配、Contract 声明或受控请求都不能绕过该边界。
- 外部动作之后仍须经过“可观察结果与错误”和“独立验证与证据”；图中没有从 Tool 请求、授权或外部动作直接指向“完成”。
- 正文提供 SVG、PNG 与完整替代描述。图示仅代表本书工程模型，不表示供应商产品实现或真实权限链路。

## 未验证范围

本次只验证 Mermaid 渲染和本书图文一致性；不验证 Agent Skills、Claude Code、ChatGPT、Codex、Plugin、App、Tool、Sandbox、身份、源系统权限、模型调用或外部动作的真实行为。
