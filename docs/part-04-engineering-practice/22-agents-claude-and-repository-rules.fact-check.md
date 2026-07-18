---
title: "第 22 章事实核验：AGENTS.md、CLAUDE.md 与仓库级规则"
chapter: "22"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 22 章事实核验：AGENTS.md、CLAUDE.md 与仓库级规则

## 核验范围

本次核验覆盖本章正文、Research Brief、提纲、局部来源、纯内存示例和图示。它不验证任何实际 Codex 或 Claude Code 安装、账户、模型、产品配置、文件发现、指令注入、自动记忆、hooks、Sandbox、权限、网络、写入、Git 或外部系统。

## 来源级核验

| 正式 ID | 2026-07-16 实际读取的来源 | 正文允许陈述 | 外推禁区 |
| --- | --- | --- | --- |
| REF-075 | [Codex Manual：Customization, Skills, Rules, MCP, and Integrations](https://learn.chatgpt.com/docs/customization/overview)，通过 `openai-docs` 的 Codex manual helper 获取当前手册后，读取 `AGENTS.md` 与项目根发现相关段落。 | `AGENTS.md` 用作 Codex 的可复用仓库指导；可存在于不同目录层级；较近指导优先；官方建议主文件短小、具体并可引用专用材料。 | 不说明任何本机、版本、目录或会话实际加载；不推广到 Claude Code；不当作权限、Sandbox 或强制执行。 |
| REF-076 | [Claude Code Docs：How Claude remembers your project](https://code.claude.com/docs/en/memory)，于写作日实际读取。 | `CLAUDE.md` 是持久指令上下文而非强制配置；页面建议常驻说明具体简洁，局部/多步骤说明放入规则或 skills；Claude Code 读取 `CLAUDE.md`，可由 `@AGENTS.md` 导入共享内容。 | 不说明任意版本、平台、目录、设置、hook 或自动记忆都可用；不把文本上下文写成权限、工具控制或结果验证。 |

## 本书模型与事实的分界

| 内容 | 分类 | 核验结论 |
| --- | --- | --- |
| 根入口、稳定规则、项目上下文、可变状态、任务局部材料的分层 | 本书工程模型 | 目录职责、更新频率和案例均为原创教学设计。 |
| Rule Record、Rule Packet、`layerOrder`、`conflictKey` | 本书工程模型 | 不属于 Codex、Claude Code 或任何产品的配置格式。 |
| `needs_spec`、`needs_evidence`、`needs_review`、`blocked`、`ready_to_load` | 纯内存教学状态 | 不代表文件加载、权限、工具执行或任务完成。 |
| `AGENTS.md` / `CLAUDE.md` 的陈述 | 受限产品事实 | 每项仅在 REF-075 或 REF-076 的对应范围内出现。 |

## 示例、图示与红绿验证

先创建测试后，实际执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
```

初次结果是 `ERR_MODULE_NOT_FOUND`，因为目标模块尚未创建。这是预期红灯，只说明测试先于实现，不能说明真实仓库或产品配置有问题。

实现后实际执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
node examples/agent/repository-rule-loading-assessment.mjs
```

结果为 7 项 Node 内置测试通过、0 项失败；演示输出 `ready_to_load` / `rule_packet_ready`，并列出五条教学 Rule Record ID。它只验证注入 JavaScript 对象上的确定性判断。

图示实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-22-repository-rule-loading.mmd -o diagrams/exported/chapter-22-repository-rule-loading.png -b transparent
```

两次导出均成功；PNG 为 784 × 1395，已视觉检查。正文 Mermaid 代码块与 `.mmd` 源通过 `diff -u` 比较无差异。图表达本书流程，不表达产品内部调用或授权路径。

## 待核验与动态边界

- `TODO(verify):` 若正式修订提及 Codex 的具体 `AGENTS.md` 发现、项目根、配置、hooks、MCP 或权限行为，必须重新运行 official manual helper 并以当日手册为限。
- `TODO(verify):` 若正式修订提及 Claude Code 的 `CLAUDE.md`、导入、路径规则、设置、自动记忆、hooks 或 Sandbox，必须重读 Anthropic 官方文档并记录访问日期。
- `TODO(verify):` 若需要证明真实仓库实际加载了哪些规则，应在受控环境中记录工作目录、产品版本、诊断、允许路径、命令输出和后续观察；本章未做此类验证。
- `TODO(verify):` 若规则要阻止外部动作，须另行核验运行时权限、Sandbox、hook、审批与审计；本章没有将它们实现或测试。

## Fact Check 完成检查

- [x] 动态产品陈述均有写作日官方来源、允许用途和外推禁区。
- [x] 已把产品事实、本书模型、教学案例和纯内存状态分开。
- [x] 已记录真实红绿测试、演示、Mermaid 导出和源码一致性检查。
- [x] 未将示例、图示或上下文文件伪装为真实产品行为或执行证据。
