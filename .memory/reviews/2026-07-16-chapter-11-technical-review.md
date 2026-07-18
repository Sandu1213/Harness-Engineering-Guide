# 第 11 章 Technical Review

## 审查范围

- 工件：`11-tool-use-and-tool-protocols.md`、`.research.md`、`.references.md`、`.outline.md`、`.ai/references.md`、`.ai/glossary.md`，以及第 8、10、12、14、15、17、18、24、25 章的责任边界。
- 审查类型：技术边界、来源归因、术语、阶段语义与跨章节责任。
- 使用的规则与来源：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`；于 2026-07-16 重读 REF-036 至 REF-039。

## 结论

`可进入 Example Implementation`。正文把模型候选、已解析参数、调用请求、调用记录、结果/观察与验收结论保持分离；Tool Contract、Tool Descriptor、Invocation Request、Invocation Record、Result Envelope 与 Effect Uncertainty 均明确为本书工程模型。图示、示例、MCP/SDK 集成、浏览器、文件、网络和真实工具调用仍未开始。

本次复读确认：MCP Tools 草案只用于 `tools/list`/`tools/call`、工具定义、结果错误和协议异常的限定语境；四类行为提示改为引用 MCP 2025-11-25 Schema Reference。OpenAI Function Calling 只用于该产品的多步流程、应用侧执行、结果回传与 `call_id` 关联。Anthropic 工具定义与 JSON Schema 的陈述也保持在各自产品或规范范围内。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| REF-036 与正文的行为提示段 | 未版本化 Tools 草案页不直接呈现 `readOnlyHint`、`destructiveHint`、`idempotentHint`、`openWorldHint`；原始出处不足以追溯字段。 | MCP 2025-11-25 Schema Reference 明确给出这四项 Tool Annotations，并限定不应依据不受信任服务器的注解决定工具使用。 | 在 Research Brief、候选资料、全局引用和正文中把 Tools 草案与版本化 Schema 分开引用。 |
| 正文的 Schema 段与 REF-037 | “应用应校验参数”紧接 OpenAI 引用，容易被读成来源对跨系统规则的保证。 | `BOOK_RULES.md` 要求区分来源事实和本书工程扩展；本次复读只将 OpenAI 文档用于该产品流程与关联。 | 改为“本书要求”应用在执行前自身校验参数，并删除 REF-037 的参数校验归因。 |
| Outline 的章节工件状态 | First Draft 已完成，却仍被标为未开始。 | 项目状态必须持续更新，不能与 `.ai/progress.md` 冲突。 | 记录 Draft 与 Technical Review 已完成，保留图示、示例与后续阶段未开始。 |
| `.ai/glossary.md` | Tool Contract 及其四类核心工件尚未进入全局词表；工具协议把权限误写为通用交换字段。 | `STYLE_GUIDE.md` 要求统一术语；权限边界属于第 12 章的具体环境和协议实现。 | 增加五个核心术语，并把 Tool Protocol 定义收束为参数、结果、错误与相关元数据。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| 无 | 无 | 本次必须修复项已完成。 | 继续在 Fact Check 当日复读动态协议与产品资料。 |

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| 第 11 章 Example Implementation | 先建立 Example Plan 与模块缺失红灯，再实现仅处理注入 Tool Contract、Invocation Request、环境摘要和批准摘要的纯内存 `assessToolInvocation`。 | 让未知工具、参数形状不合格、只读候选、缺批准、关联冲突、超时后效果未知与“工具成功但未经验证”拥有可重复的教学证据。 |
| 第 11 章 Diagram Review | 图源创建后，逐箭头核对它只表达本书模型；把候选、准入、适配器观察、结果和验收分开，避免把任一箭头画成真实授权、写入或验收。 | 防止读者把教学序列图误读为 MCP、SDK 或生产运行时。 |

## 已执行验证与未验证范围

- 2026-07-16：重新读取 MCP [Tools（当前草案）](https://modelcontextprotocol.io/specification/draft/server/tools) 和 [Schema Reference（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/schema)，将 Tools 草案的发现/调用/错误语境与版本化 Schema 的 Tool Annotations 语境分开。
- 2026-07-16：重新读取 [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)，只保留该产品的多步调用、应用侧执行、结果回传与 `call_id` 关联。
- 2026-07-16：重新读取 [Anthropic Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) 和 [JSON Schema Specification](https://json-schema.org/specification)，确认 `input_schema`/有效样例以及 Core/Validation 的限定表述。
- 已逐项核查第 8 章 Skill、第 10 章状态、第 12 章环境与权限、第 14 章批准、第 15 章观察、第 17 章验收、第 18 章恢复、第 24 章 MCP 集成与第 25 章浏览器自动化的责任边界；本章没有提前声明这些机制已实现。
- 2026-07-16：状态同步后实际运行 `npm run validate`，退出码为 0：Markdown lint 检查 190 个文件、0 个错误；链接检查通过；十套既有纯内存示例共 54 项 Node 内置测试通过；章节状态为 10 章完成、1 章进行中、36 章未开始。
- 2026-07-16：实际运行 `git diff --check`，退出码为 0、无输出。
- 未验证：本次审查没有创建或运行 Mermaid 图、Example Plan、纯内存示例、测试、MCP/SDK、浏览器、文件、Git、网络、权限、批准、审计或外部效果；因此不证明任何真实工具行为或任务验收。
