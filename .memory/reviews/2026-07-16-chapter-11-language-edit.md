---
chapter: "11-tool-use-and-tool-protocols"
stage: "Language Editing"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 11 章 Language Editing：收束判断链的中文表达

## 编辑范围

本次只编辑 `docs/part-02-components/11-tool-use-and-tool-protocols.md` 的中文表达、术语衔接、段落节奏和图示替代描述；不新增来源、技术结论、工具字段、纯内存示例接口、Mermaid 图源或导出图。

## 已完成的编辑

- 将“六张表”的说明改为两句，并显式列出“判断层、证据、未被证明范围”，让“候选—请求—结果—观察—验收”的边界在中文叙述中更容易扫描。
- 把 OpenAI 产品文档后的本书要求拆开：产品流程与“应用应自行校验”的本书规则不再挤在同一句，也不改变其来源归因。
- 将图示替代描述和“执行/观察”说明拆分为较短句，保留 `effect_unknown`、停止、升级与不自动重发的原有含义。
- 将纯内存示例的输入说明和返回值说明分开，避免读者把注入对象、返回分类或教学判断误读成真实 Tool、权限或外部效果。

## 一致性与边界

- Tool Contract、Invocation Request、Invocation Record、Result Envelope、效果不确定性、图示和案例仍明确是本书工程模型。
- MCP、OpenAI、Anthropic 与 JSON Schema 的可归因陈述和链接未修改；Fact Check 的外推禁区保持有效。
- Mermaid 源、SVG/PNG、示例代码、测试与演示没有改变，因此不将本次编辑表述为新的图示、运行时或测试结果。

## 后续

下一项为 Final Review：交叉核对正文、研究资料、引用登记、Fact Check、示例、图示、审查记录、状态文件与出版目录，并在并行章节工件收口后运行全仓校验。
