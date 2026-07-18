---
title: "第 21 章事实核验：Claude Code 与 Codex 的项目 Harness"
chapter: "21"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 21 章事实核验：Claude Code 与 Codex 的项目 Harness

## 核验范围

本次核验覆盖第 21 章正文、Research Brief、候选来源、纯内存示例、Mermaid 图和审查记录的陈述边界。它不验证 Codex 或 Claude Code 的实际安装、登录、账户、模型、配置、自动记忆、文件发现、Sandbox、hooks、MCP、Tool、网络、权限或外部副作用。

## 来源级核验

| 正式 ID | 2026-07-16 实际读取的来源 | 正文允许陈述 | 外推禁区 |
| --- | --- | --- | --- |
| REF-072 | [OpenAI Codex Manual](https://developers.openai.com/codex/codex-manual.md)，使用 `openai-docs` 提供的 Codex manual helper 刷新后阅读 `AGENTS.md` 相关章节 | `AGENTS.md` 可作为 Codex 的仓库指导入口；手册描述全局、仓库与更具体目录层级及较近指导优先的使用方式。 | 不将其写成每个表面/版本/目录的必然行为，不将指导上下文写成权限控制。 |
| REF-073 | [OpenAI Codex Manual](https://developers.openai.com/codex/codex-manual.md)，同次刷新后阅读 project config 章节 | 项目 `.codex/config.toml`、项目 hooks 与项目 rules 的加载与项目信任条件有关。 | 不表示本仓库有这些配置，也不把项目受信任写成安全、网络或账户授权结论。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | `CLAUDE.md` 是持久项目指令上下文；文档描述目录层级、`@AGENTS.md` import 和项目共享用途。 | 不声称真实 Claude Code 会在本仓库中加载、合并或遵循任何文件。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | `CLAUDE.md` 被描述为上下文而非强制配置；settings、Sandbox、拒绝权限和 hook 是另行讨论的控制层。 | 不将本章的检查表当作真实 hook、settings 或权限政策。 |

## 本书模型与事实的分界

| 内容 | 分类 | 核验结论 |
| --- | --- | --- |
| Shared Repository Contract、Product Adapter Declaration | 本书工程模型 | 字段、职责、图示和工作流为原创教学设计。 |
| `portable`、`needs_shared_context`、`needs_adapter_evidence`、`needs_boundary_review` | 纯内存教学状态 | 不是任何产品 SDK、配置、日志或真实会话状态。 |
| “Codex 起草、Claude Code 审查”案例 | 教学案例 | 不表示本章曾由真实两个产品会话完成接力。 |
| 产品资料对比 | 受限产品事实 | 只使用本表的来源范围；未比较模型、价格、账户或完整功能集。 |

## 示例、图示与红绿验证

2026-07-16 先执行：

```bash
node --test examples/agent/project-harness-portability-assessment.test.mjs
```

实际结果为 `ERR_MODULE_NOT_FOUND`，原因是目标模块尚未创建。这是预期红灯，不表示任何产品或项目接入失败。

实现后实际执行：

```bash
node --test examples/agent/project-harness-portability-assessment.test.mjs
node examples/agent/project-harness-portability-assessment.mjs
```

结果为 6 项 Node 内置测试通过、0 项失败；演示输出 `portable` / `shared_contract_and_adapter_boundary_present`。该结果仅验证测试注入对象的确定性判断。

图示实际执行两次 Mermaid 导出：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-21-project-harness-portability.mmd -o diagrams/exported/chapter-21-project-harness-portability.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-21-project-harness-portability.mmd -o diagrams/exported/chapter-21-project-harness-portability.png -b transparent
```

两条命令均成功完成，PNG 已视觉检查。图只表达本书模型，不描述产品内部调用或权限路径。

## 待核验与动态边界

- `TODO(verify):` 正式修订涉及 Codex 的 `AGENTS.md`、项目配置、trust、hooks 或 permissions 时，须重新运行 manual helper 并按当日手册限定陈述。
- `TODO(verify):` 正式修订涉及 Claude Code 的 `CLAUDE.md`、auto memory、rules、settings、hooks 或 sandbox 时，须重新读取 Anthropic 官方文档并记录版本/访问日。
- `TODO(verify):` 若要证明真实跨产品接力，应在受控环境中独立记录产品版本、工作目录、指令发现、配置、权限、命令输出和外部观察；本章没有这种证据。

## Fact Check 完成检查

- [x] 动态产品陈述均有写作日官方来源及限定用途。
- [x] 已将产品事实、本书模型、教学案例和纯内存状态分开。
- [x] 已记录真实红绿测试与 Mermaid 导出结果，且未外推为产品运行验证。
- [x] 已为后续修订与真实集成保留重新核验要求。
