---
title: "第 11 章事实核验：Tool Use 与工具协议"
chapter: "11"
status: "fact-check-complete"
sources:
  - "REF-036"
  - "REF-037"
  - "REF-038"
  - "REF-039"
updated_at: "2026-07-16"
---

# 第 11 章事实核验：Tool Use 与工具协议

## 核验范围

本清单核验 `11-tool-use-and-tool-protocols.md`、`.research.md`、`.references.md`、`.outline.md`、`.example-plan.md`、纯内存示例和 Mermaid 图中可归因的 MCP、OpenAI、Anthropic 与 JSON Schema 陈述。工具契约（Tool Contract）、调用请求（Invocation Request）、调用记录（Invocation Record）、结果信封（Result Envelope）、调用关联标识、效果分类、准入门、教学错误分类、纯内存函数和图示均为本书工程模型或教学工件；它们不是 MCP、OpenAI、Anthropic 或 JSON Schema 的共同 API、授权策略、运行时、审计后端或执行保证。

## 来源级核验

| ID | 写作日复核的来源陈述 | 正文允许用途 | 禁止外推 | 状态 |
| --- | --- | --- | --- | --- |
| REF-036 | MCP 当前 Tools 草案说明：工具具有名称和 Schema 元数据；客户端用 `tools/list` 发现可用工具、用 `tools/call` 发起调用；协议不规定唯一的用户交互模型。它还区分协议错误与工具执行错误，并将输入校验、访问控制、敏感操作确认、结果校验、超时和审计列为服务器或客户端的安全考虑。 | 作为一个协议实例说明工具发现、调用、结果/错误分层和“协议本身不替代应用治理”的背景。 | 草案的稳定兼容性、任意实现的消息字段、自动授权、自动批准、调用成功、外部效果或跨协议默认行为。 | 2026-07-16 已重读 [Tools 草案](https://modelcontextprotocol.io/specification/draft/server/tools)。 |
| REF-036 | MCP 的 2025-11-25 Schema Reference 定义 `readOnlyHint`、`destructiveHint`、`idempotentHint` 和 `openWorldHint`；同页明确这些都是提示，来自不受信任服务器的 Tool Annotations 不能作为工具使用决定的依据。 | 限定说明行为提示能帮助解释能力面，但不等于可信授权证据。 | 任意远程工具真实只读、可逆、幂等、安全，或这些提示已完成权限、批准、风险和结果验证。 | 2026-07-16 已重读 [Schema Reference（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/schema)。 |
| REF-037 | OpenAI Function Calling 文档将工具调用描述为应用和模型之间的多步流程：应用携带可调用工具请求模型，接收调用，在应用侧执行代码，再把工具输出回传给模型。文档的示例以 `call_id` 将函数调用和函数结果关联。 | 仅在该产品文档语境内说明“模型调用、应用侧执行、结果回传、调用关联”的流程。 | 其他模型、SDK 或协议的字段、并发/严格模式行为、权限或批准策略、外部效果和任务验收保证。 | 2026-07-16 已重读 [OpenAI Function calling](https://developers.openai.com/api/docs/guides/function-calling)。 |
| REF-038 | Anthropic Define tools 文档以客户端工具定义中的 `name`、`description`、`input_schema` 和可选 `input_examples` 为例；输入样例必须满足 `input_schema`。文档还在该产品请求中定义 `tool_choice` 的 `auto`、`any`、`tool` 与 `none` 选项。 | 仅用于说明一个产品中工具描述、输入 Schema、样例和选择控制的限定形式。 | 通用命名规则、跨产品 Schema 行为、模型一定调用工具、系统已验证业务语义、获得权限或批准。 | 2026-07-16 已重读 [Anthropic Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)。 |
| REF-039 | JSON Schema Specification 将规范拆分为 Core 与 Validation；Core 给出基础，Validation 定义验证关键字，Core/Validation dialect 用于纯验证。 | 说明 JSON Schema 处理结构和验证词汇的规范定位。 | 目标存在、业务语义、数据新鲜度、调用者授权、外部效果、幂等性或任务完成的自动证明。 | 2026-07-16 已重读 [JSON Schema Specification](https://json-schema.org/specification)。 |

## 本书模型与非事实边界

| 工件或术语 | 事实状态 | 核验结论 |
| --- | --- | --- |
| Tool Contract、Tool Descriptor、Invocation Request、Invocation Record 与 Result Envelope | 本书工程模型。 | 字段集合、名称、存储方式和审查规则不是四项来源的共同 Schema 或 API。 |
| `rejected`、`requires_approval`、`failed`、`timed_out`、`effect_unknown`、`succeeded` | 本书教学分类。 | 不等于 MCP 协议错误、任何厂商错误码、HTTP 状态、真实权限、真实批准或外部效果结论。 |
| `assessToolInvocation` | 纯内存教学函数。 | 只评估调用者注入的 Contract、Request、环境/批准摘要和 Record；不发现或调用真实 Tool，也不访问 MCP、SDK、文件、网络、浏览器、数据库、凭证、权限或外部系统。 |
| 调用序列图与 SVG/PNG 导出 | 本书工程模型的发布图。 | 可读渲染不证明真实调用、环境获准、目标改变、独立回读、验收或审计发生。 |
| 书稿元数据变更案例 | 原创教学案例。 | 虚构工具、字段、批准引用、回读和结果分类均不表示本仓库或任何外部系统的真实操作记录。 |

## 事实陈述核对

| 正文主题 | 归因来源 | 核验结果 | 写作限制 |
| --- | --- | --- | --- |
| MCP 的工具发现、调用、工具描述、结果与错误层次。 | REF-036 的 Tools 草案。 | 与当前草案页面一致。 | 每次保留“草案”与 MCP 产品主语；不复制字段或错误形状为本书通用协议。 |
| MCP Tool Annotations 的字段、提示性质和不可信服务器边界。 | REF-036 的 2025-11-25 Schema Reference。 | 与版本化 Schema 页面一致。 | 明确标出版本化来源；不把注解解释为授权、风险审核或结果事实。 |
| OpenAI 的多步工具调用、应用侧执行、结果回传与 `call_id` 关联。 | REF-037。 | 与当前产品指南一致。 | 保留 OpenAI 产品主语；本书的调用关联、准入门和结果信封不得归因给该文档。 |
| Anthropic 客户端工具的名称、描述、输入 Schema、样例和选择控制。 | REF-038。 | 与当前产品文档一致。 | 保留 Anthropic 产品主语；不把 `input_schema` 或 `tool_choice` 写成授权、业务验证或跨产品行为。 |
| JSON Schema 的 Core、Validation 与纯验证 dialect。 | REF-039。 | 与当前规范页一致。 | 只说明结构和验证定位；不可由 Schema 通过推出目标、权限、效果或任务验收。 |
| 准入六道门、关联对象、效果不确定性、图示分支和教学案例。 | 本书模型。 | 正文、图示与示例已明确标注。 | 不归因给四项来源，也不表示真实 Tool、环境、批准、观察、验收或恢复已实现。 |

## 示例与图示复核

2026-07-16 实际运行：

```bash
npm run test:tool-invocation-assessment
npm run example:tool-invocation-assessment
```

测试结果为 7 项通过、0 项失败；演示输出 `allowed / admission_allowed / request-demo`。这些结果只说明 `assessToolInvocation` 对注入教学对象产生预期的确定性判断；不验证真实工具注册、JSON Schema 实现、MCP、SDK、文件、网络、浏览器、数据库、凭证、环境、权限、批准、外部目标、观察、验收、审计或外部效果。

调用序列图已由 Mermaid CLI 11.16.0 导出白色背景、两倍缩放的 SVG/PNG，并在 Diagram Review 中查看 PNG。渲染和查看只说明本书图源可生成可读图；不验证图中任何产品协议、实际调用、环境、批准、外部目标、回读、验收或效果。

## 动态信息与待复核项

- MCP Tools 草案、版本化 Schema、OpenAI 与 Anthropic 产品文档都可能更新。下一次修改正文中可归因陈述时，必须重新访问 REF-036 至 REF-039，并以当日页面及版本语境为准。
- `TODO(verify)：` 若未来使用 MCP、OpenAI、Anthropic 或 JSON Schema 的具体协议版本、SDK、参数、关键字、消息格式或校验器，须记录版本、实际配置、官方一手资料、环境前提、批准边界和独立运行/观察证据；不得用本章背景资料替代实现验证。
- `TODO(verify)：` 若真实案例触及文件、Git、浏览器、数据库、网络、密钥、生产环境、费用或第三方影响，须补充实际授权、人工批准、调用记录、目标回读、验收与恢复证据；`effect_unknown` 不得被包装为安全重试结论。
- 未核验的模型名称、SDK 行为、严格模式、并发、性能、价格、速率限制、配额、认证、保留期、兼容性和安全属性不得写入正文，更不得从产品示例或纯内存测试中推断。

## Fact Check 完成检查

- [x] REF-036 至 REF-039 已于 2026-07-16 重新读取，并写明可用的限定陈述与禁止外推。
- [x] 正文将协议/产品/规范事实、本书工程模型、教学案例、图示和纯内存示例分开。
- [x] 已重跑第 11 章 7 项纯内存测试与演示，且记录了它们只验证注入教学对象。
- [x] 已为动态资料和未来真实集成记录重新取证条件。
- [x] 未将图示、测试、来源或本书模型表述为真实 Tool、MCP、SDK、权限、批准、外部效果、验收或审计证明。
