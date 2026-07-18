---
title: "第 37 章参考资料：Memory 与 Skill Design Patterns"
chapter: "37"
status: "registered"
updated_at: "2026-07-16"
---

# 第 37 章参考资料：Memory 与 Skill Design Patterns

> 本地 `CH37-REF-*` 键只用于本章研究追溯，已分别映射为 REF-020、REF-022、REF-024、REF-025。全局引用表仍由主线程维护；First Draft 的写作日仍须重新读取动态产品和框架资料，再在 front matter 中使用正式编号。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与全局登记建议 | 不能外推 |
| --- | --- | --- | --- | --- | --- |
| CH37-REF-01 | [OpenAI Agents SDK: Sessions](https://openai.github.io/openai-agents-python/sessions/) | OpenAI 官方 SDK 文档 | 该 SDK 的 session 在多次 run 间维护对话历史；运行前取回历史、运行后保存本轮项，且不能与其服务端延续机制叠加。 | 2026-07-16：写作日重读；复用 REF-020。 | 通用长期记忆、项目知识库、自动去污染、权限、隔离、保留或删除保证。 |
| CH37-REF-02 | [LangChain: Long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory)；[Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory) | LangChain 官方框架文档 | 页面区分 thread 内短期记忆与跨会话／session 的长期数据；长期存储的文档可按 namespace 与 key 组织。 | 2026-07-16：写作日重读；复用 REF-022。 | 命名空间会自动完成授权、租户隔离、数据正确性、隐私、删除或跨框架兼容。 |
| CH37-REF-03 | [Agent Skills Specification](https://agentskills.io/specification) | Agent Skills 一手规范 | Skill 的最小目录包含 `SKILL.md`；文件包含 frontmatter 和指令正文，可选资源可按 metadata、正文、资源渐进加载。 | 2026-07-16：写作日重读；复用 REF-024。 | 所有 Agent 的自动发现、工具授权、执行顺序、权限或安全行为。 |
| CH37-REF-04 | [Extend Claude with skills](https://code.claude.com/docs/en/skills) | Claude Code 官方文档 | Claude Code 将按需加载的 Skill 与常驻项目指令区分；其路径、覆盖、调用控制和资源使用属于该产品实现。 | 2026-07-16：写作日重读；复用已更新 URL 的 REF-025。 | Codex、其他 Agent、任意版本或本仓库必然使用同样的路径、优先级、命令或加载逻辑。 |

## 写作规则

- 本章的任务范围记忆、决策账本、事件记录、证据卡检索、只读／提议写入 Skill、版本与弃用均是本书工程模式，不是任一来源的现成 schema 或产品能力。
- 任何“记忆已写入”“Skill 已运行”“来源已访问”“外部权限已授予”都必须有独立的执行证据；不能由本研究、frontmatter、目录结构、命名空间或产品文档推导。
- 后续写入具体 API、存储后端、默认值、路径、版本、工具列表、权限、租户、保留期、迁移命令或性能结论前，必须在写作当天重新读取相应官方资料。
- 本章不记录真实项目路径、用户标识、账户、密钥、token、查询、模型、文件内容、外部系统响应或审批记录。
