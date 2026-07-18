# 第 21 章 Technical Review

## 复核范围

复核正文、Research Brief、Outline 与来源表的产品归因、相邻章节边界、术语和阶段状态。

## 结论与修订

- 保留 Codex `AGENTS.md`、项目 `.codex/config.toml` / trusted project 与 Claude Code `CLAUDE.md`、`@AGENTS.md` import、上下文/强制执行分离的限定陈述；每条均指向写作日实际读取的官方资料。
- 将 Shared Repository Contract、Product Adapter Declaration、适配状态和跨入口案例明确标为本书模型或教学案例，不把它们归因给任何产品。
- 将第 03、05、08、10、11、12、20 章定义为前置边界；将规则细化、自动化和长期接力留给第 22、23、45 章，避免重复实现细节。
- 修正风险措辞：指令文件只能传达上下文，不能推出真实权限、Tool 调用、测试执行或外部效果。

## 未覆盖范围

本审查没有安装、配置、登录或操作 Codex、Claude Code、hooks、MCP、Sandbox、自动记忆或任何外部系统。
