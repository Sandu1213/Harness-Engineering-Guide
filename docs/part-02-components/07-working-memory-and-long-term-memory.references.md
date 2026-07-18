---
title: "第 7 章候选参考资料"
chapter: "07"
status: "research-complete"
updated_at: "2026-07-15"
---

# 第 7 章候选参考资料

| ID | 来源 | 拟使用范围 | 状态 |
| --- | --- | --- | --- |
| REF-006 | [Anthropic：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | Claude Code 的新会话、`CLAUDE.md`、auto memory 与“上下文而非强制配置”的限定区别。 | 2026-07-15 已重新核验；只适用于 Claude Code。 |
| REF-020 | [OpenAI Agents SDK：Sessions](https://openai.github.io/openai-agents-python/sessions/) | 特定 Session 的跨 run 消息历史、运行前读取与运行后写入，以及与服务端延续机制不能叠加的当前文档限制。 | 2026-07-15 已核验；仅适用于该 SDK，正文当天需重查。 |
| REF-021 | [OpenAI Agents SDK：Agent memory](https://openai.github.io/openai-agents-python/sandbox/memory/) | sandbox-agent 的 run 间经验文件、与 Session 消息历史的区别、渐进读取、过时风险与 beta 边界。 | 2026-07-15 已核验；beta 能力和默认行为需正文当天重查。 |
| REF-022 | [LangChain：Memory overview](https://docs.langchain.com/oss/python/concepts/memory) | thread-scoped 短期记忆、跨 thread 长期数据、namespace 与同步/后台写入的框架概念。 | 2026-07-15 已核验；仅适用于 LangChain/LangGraph 语境。 |
| REF-023 | [Packer et al.：MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560) | 分层记忆与有限上下文的研究背景。 | 2026-07-15 已核验 arXiv v2 摘要；不使用性能结果或默认架构主张。 |

## 引用使用约束

- 供应商或框架文档只能支持其明确写出的产品/框架范围；不得把 Session、sandbox memory、`CLAUDE.md`、auto memory 或 namespace 写成通用 memory 架构。
- 工作记忆、长期记忆、Memory Record、写入门槛、读取门槛与生命周期是本书工程扩展，不能伪装成上述来源的原话或 API。
- 新增动态信息必须先登记到 `.ai/references.md`，并在正文写作当天记录访问日期、支持范围和未验证边界。
