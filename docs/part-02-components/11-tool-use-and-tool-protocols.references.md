---
title: "第 11 章候选参考资料：Tool Use 与工具协议"
chapter: "11"
status: "research-complete"
updated_at: "2026-07-26"
---

# 第 11 章候选参考资料：Tool Use 与工具协议

> 本清单是研究和核验导航，不是可复制正文。来源只支持自身协议或产品的限定陈述；正文、示例和 Fact Check 阶段必须重新访问持续变化的资料。

| ID | 来源 | 类型 | 可支持的限定陈述 | 不能支持的陈述 | 访问日期 |
| --- | --- | --- | --- | --- | --- |
| REF-036 | [Model Context Protocol：Tools（当前草案）](https://modelcontextprotocol.io/specification/draft/server/tools)；[Schema Reference（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/schema) | 官方协议资料 | Tools 草案中的 `tools/list`、`tools/call`、名称/说明/输入 Schema/可选输出 Schema、工具结果错误与协议级异常；版本化 Schema 中的 Tool Annotations 与“来自不受信任服务器时不可据此决定工具使用”的限定。 | 稳定兼容性、授权保证、所有实现的消息格式或任何跨协议默认行为。 | 2026-07-16 |
| REF-037 | [OpenAI：Function calling](https://developers.openai.com/api/docs/guides/function-calling) | 官方产品文档 | 该产品的多步工具调用流程、应用侧执行与回传、名称/JSON 参数/`call_id` 关联。 | 其他模型、SDK 或协议的字段、执行顺序、严格模式、并发行为或安全保证。 | 2026-07-16 |
| REF-038 | [Anthropic：Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) | 官方产品文档 | 该产品客户端工具的名称、说明、`input_schema`、有效输入样例与工具选择选项。 | 通用命名规则、描述长度、默认选择策略、模型行为或跨产品严格校验。 | 2026-07-16 |
| REF-039 | [JSON Schema：Specification](https://json-schema.org/specification) | 官方规范 | JSON Schema 的 Core、Validation 和针对纯验证的 Core/Validation dialect 的定位。 | 业务语义、授权、外部效果、结果可信度、幂等性或任务完成的自动证明。 | 2026-07-16 |
| REF-149 | [Zechner, Mario：What I learned building an opinionated and minimal coding agent（2025-11-30）](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) | 作者博文（一手自述） | pi（Mario Zechner 开发的开源极简编码代理）的统一 LLM 层把工具结果拆成给模型的 `output`（文本）与给 UI 的 `details`（结构化数据），另支持附件（如原生格式图片）；作者自述未在其他统一 LLM API 中见过该抽象；工具调用参数在流式输出中做渐进 JSON 解析，UI 可实时渲染。 | Terminal-Bench 具体名次或分数、GitHub stars 等动态数字、其他统一 LLM API 的内部实现、该抽象已成行业标准、pi 字段名与行为在访问日之后保持不变；本书的“模型观察投影/人类证据投影”是本书工程延伸，不得归因给该文。 | 2026-07-26 |

## 写作前复核事项

- 已于 2026-07-16 Fact Check 重读 REF-036：Tools 草案与版本化 Schema 的用途已拆开；草案字段或要求不得无版本地写成长期事实，后续修改仍须按当日资料复读。
- 已于 2026-07-16 Fact Check 重读 REF-037：确认 Function Calling 的调用/结果关联流程；不将应用侧参数校验写成该产品的跨系统安全保证，也不沿用模型名称、SDK 代码或严格模式选项。
- 已于 2026-07-16 Fact Check 重读 REF-038：确认客户端工具定义、输入样例和工具选择说明；不得把产品行为扩展为行业标准，后续修改仍须重读。
- 已于 2026-07-16 Fact Check 重读 REF-039：Core、Validation 与纯验证 dialect 的定位只支持结构和验证词汇边界，不支持业务语义、授权、效果或验收结论。
- 已于 2026-07-26 通读 REF-149：仅采用“工具结果拆分为模型 `output` 与 UI `details`、附件支持、流式渐进参数解析”的作者自述陈述，并保持主语归属；实现细节以访问日（2026-07-26）资料为准，后续修改须重读原文，不得补充该文之外的 pi 引语或数字。
- `TODO(verify)：` 若采用 JSON Schema 的特定 draft、关键字或校验器，记录版本、实现和实际验证命令；不得从 Schema 通过推导出已授权或已执行。
- `TODO(verify)：` 真实案例若触及文件、Git、浏览器、数据库、MCP、网络或密钥，补充环境、权限、批准、执行和回读的独立证据。

## 引用使用约束

- 工具契约（Tool Contract）、调用记录、结果信封、效果不确定性及教学错误分类均为本书工程模型。
- “工具已调用”“工具成功”“已写入”“已批准”和“任务完成”不是同义词；必须在正文中分别说明系统、证据与判断者。
- Schema、工具说明和产品提示可以限制或解释接口，但不授予实际权限，也不替代第 12、14、17 和 18 章的机制。
