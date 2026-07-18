---
title: "第 21 章候选参考资料：Claude Code 与 Codex 的项目 Harness"
chapter: "21"
status: "registered"
updated_at: "2026-07-16"
---

# 第 21 章候选参考资料：Claude Code 与 Codex 的项目 Harness

> 本章已由主线程登记至全书引用表：CH21-REF-01 → REF-072、CH21-REF-02 → REF-073、CH21-REF-03 与 CH21-REF-04 → REF-074。本表保留访问日与外推禁区；正式正文只使用 REF 键。

| 正式 ID | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| REF-072 | [OpenAI Codex Manual：Best practices / AGENTS.md](https://developers.openai.com/codex/codex-manual.md) | OpenAI 官方手册 | 2026-07-16 | `AGENTS.md` 可作为 Codex 的可复用仓库指导；手册说明可存在不同目录层级，较近指导优先，且建议主入口短而具体。 | 不保证任一表面、版本、项目或嵌套路径实际加载；不把指导内容视为强制执行。 |
| REF-073 | [OpenAI Codex Manual：Project config files](https://developers.openai.com/codex/codex-manual.md) | OpenAI 官方手册 | 2026-07-16 | 受信任项目可以有 `.codex/config.toml` 项目作用域覆盖；项目信任影响项目配置、hooks 与 rules 的加载。 | 不表示本书仓库配置了该文件或任何 hook；不泛化为其他 Agent 的信任/权限语义。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | Anthropic 官方文档 | 2026-07-16 | `CLAUDE.md` 用于项目、个人或组织的持久指令上下文；官方文档给出项目根、目录层级和 `@AGENTS.md` import 的使用方式。 | 不承诺任意版本、设置、工作树或会话结果；不把其记忆功能写成本书状态系统。 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project — enforcement boundary](https://docs.anthropic.com/en/docs/claude-code/memory) | Anthropic 官方文档 | 2026-07-16 | 文档将 `CLAUDE.md` 上下文与 settings、sandbox、permission deny、PreToolUse hook 等技术控制区分。 | 不宣称任意设置、hook、权限或 sandbox 已在本仓库启用或已验证。 |

## 使用规则

- `Shared Repository Contract`、`Product Adapter Declaration`、`portable` 及其缺口状态均为本书教学模型。
- 本章引用动态产品资料时必须在修订日重新读取官方页面；无法复核时保留 `TODO(verify):`，不把旧记录美化为当前事实。
- 本章不比较模型能力、定价、账户方案、产品可用性或真实项目配置。

## 候选资料完成检查

- [x] 每条资料包含 URL、来源类型、写作日访问、允许用途与外推禁区。
- [x] 已登记全局引用，并保留局部键到全局键的映射。
- [x] 未把产品文档改写为通用 Harness 标准。
