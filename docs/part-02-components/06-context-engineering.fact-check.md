---
title: "第 6 章事实核验清单"
chapter: "06"
status: "fact-checked"
sources:
  - "REF-015"
  - "REF-016"
  - "REF-017"
  - "REF-018"
  - "REF-019"
updated_at: "2026-07-15"
---

# 第 6 章事实核验清单

本清单记录第 6 章在 2026-07-15 已重新读取的一手来源、可进入正文的限定陈述，以及不能由这些来源推出的内容。只有表中“已复核”的限定陈述可以作为产品事实或来源观点；Context Brief、Context Packet、预算、污染诊断、教学案例和纯内存接口是本书工程扩展。Fact Check 不替代正文写作当天对动态产品文档的重新核验，也不替代后续图示、示例、语言编辑和 Final Review。

| ID | 拟使用的陈述或用途 | 类型 | 来源 | 来源是否直接支持 | 状态 | 正文写作规则 |
| --- | --- | --- | --- | --- | --- |
| FC-01 | Anthropic 将 Context Engineering 描述为在推理时持续筛选和维护进入上下文窗口的信息，并将上下文视为有限资源。 | Anthropic 的工程观点 | REF-015 | 是；文章直接以有限上下文、选择和维护信息讨论该概念。 | 2026-07-15 已复核。 | 归因 Anthropic 工程文章；不得写成全行业唯一术语定义、模型内部机制或正确性保证。 |
| FC-02 | Anthropic 文章讨论用最小、高信号 token 与按需加载来维护上下文，并将压缩或整理放在 Agent 循环中考虑。 | Anthropic 的工程建议 | REF-015 | 是；文章直接讨论高信号信息、just-in-time loading 与 context management。 | 2026-07-15 已复核。 | 只用作本书“显式选择与刷新”的背景；不声称任何供应商必然采用此策略，或该策略必然降低成本、提升正确率。 |
| FC-03 | OpenAI Agents SDK 区分本地代码可用的 context 与模型可见的 LLM context；本地 context 不会自动发送给模型。 | OpenAI Agents SDK 产品行为 | REF-016 | 是；官方 SDK 文档直接区分两类 context，并说明前者不自动发送给 LLM。 | 2026-07-15 已复核。 | 仅归因该 Python SDK 的概念语境；不得外推为其他 SDK、语言、模型或安全隔离。 |
| FC-04 | OpenAI Agents SDK 文档列出通过 instructions、input、函数工具，以及 retrieval 或 web search 向模型提供信息的方式。 | OpenAI Agents SDK 文档范围 | REF-016 | 是；页面直接列出这些进入 LLM context 的路径。 | 2026-07-15 已复核。 | 用于解释“显式投影”的产品例子；不要虚构请求字段、工具权限、检索质量或 web search 的实际结果。 |
| FC-05 | OpenAI Agents SDK 的运行文档列出应用管理、SDK session、Conversation API 和 Responses API 等跨轮状态承载策略。 | OpenAI Agents SDK 产品行为 | REF-017 | 是；官方文档直接组织这些 state and conversation management 策略。 | 2026-07-15 已复核。 | 只描述该 SDK 文档的选择空间；不得把任一策略、字段或 ID 写成跨产品的会话标准。 |
| FC-06 | OpenAI Agents SDK 文档警告：若没有刻意协调，混用客户端与服务端状态延续可能导致重复上下文。 | OpenAI Agents SDK 产品边界 | REF-017 | 是；页面直接提示混用状态的重复上下文风险。 | 2026-07-15 已复核。 | 可作为“声明权威承载方式与去重检查”的动机；不得由此推断重复一定发生、会话一定安全恢复，或其他框架具有同一行为。 |
| FC-07 | Gemini 长上下文文档建议避免传递不需要的 token；当大段材料在前时，查询通常放在材料之后。 | Gemini API 产品建议 | REF-018 | 是；官方文档直接给出这些 long-context 提示建议。 | 2026-07-15 已复核。 | 仅归因 Gemini API；不得写成所有模型的固定布局规则、窗口大小建议或性能结论。 |
| FC-08 | Gemini 长上下文文档说明，对重复使用相似大段上下文的工作负载可考虑 context caching。 | Gemini API 产品能力与建议 | REF-018 | 是；页面将 caching 作为该产品文档中的相关能力。 | 2026-07-15 已复核。 | 正文必须重查能力、阈值、成本、TTL 与 API 语义；不得把缓存写成自动刷新、事实验证、安全控制或普适降本保证。 |
| FC-09 | Anthropic 的 Contextual Retrieval 文章指出，检索过程中的 chunk 可能因缺少原始位置或背景而丢失理解所需语境。 | Anthropic 的检索工程背景 | REF-019 | 是；文章直接以 chunk context loss 说明问题。 | 2026-07-15 已复核。 | 只用来解释记录来源、对象与相邻语境的必要性；不复刻其实现、基准数字、成本效益或把它指定为默认 RAG 方案。 |
| FC-10 | Context Brief、Context Packet、证据条目的来源/用途/时效/敏感性/预算字段、超限动作、刷新事件与污染诊断。 | 本书工程模型 | 本章原创设计 | 不适用 | 2026-07-15 已确认其为本书扩展。 | 使用“本书提出”“本章模型”或“团队可采用的约定”等措辞；不得归因 Anthropic、OpenAI 或 Google，也不写成通用 API。 |
| FC-11 | “修复一条失败测试”的最小上下文包、`buildContextPacket` 的输入输出和直接证据优先等测试情境。 | 教学案例与计划示例 | 本项目原创设计 | 不适用 | 2026-07-15 已确认其为教学设计。 | 不写成真实仓库、真实模型调用、真实测试执行、检索基准或已证明的根因分析能力。 |
| FC-12 | 上下文窗口数值、模型名、缓存价格与 TTL、请求字段、SDK 函数签名、工具权限、检索指标、数据保留、安全效果或任何供应商的当前功能矩阵。 | 动态或超出范围的事实 | 写作当天的官方资料 | 否；当前工件没有字段级或版本级证据。 | 不纳入本章当前事实。 | 如正文确有必要，先建立 `TODO(verify)：` 证据卡并以写作当天官方文档逐项核验；不能核验时删除或缩小陈述。 |

## 正文前与审查前的复核步骤

1. 正文写作当天重新访问 REF-015 至 REF-019，核对 URL、页面标题、访问日期与上表的限定用途；SDK 接口、模型能力、缓存语义和产品建议发生变化时，以当天官方页面为准。
2. 搜索草稿中的 `Anthropic`、`OpenAI`、`OpenAI Agents SDK`、`Gemini`、`context`、`Context Engineering`、`cache`、`token`、`session`、`conversation`、`Responses API`、`retrieval`、`web search`、模型名、版本号、数字、引号和绝对词。没有本表支持的产品陈述应删除、缩小或标记 `TODO(verify)：`。
3. Context Packet、三面检查、预算优先级、指针化、刷新、污染诊断和去重流程必须标注为本书工程模型；它们是审查约定，不是模型安全控制、访问授权或供应商协议。
4. 审查图示，确认候选资料经过来源、时效、相关性与敏感性检查后才可进入 Context Packet；“工具返回”“检索到资料”不能直接连向“事实”“安全”或“完成”。
5. 纯内存示例只能在实现、测试与演示实际运行后记录结果。Fact Check 不构成模型调用、文件读取、网络检索、向量数据库、缓存、权限或真实测试执行的证据。

## 事实核验执行记录

- **REF-015：** 重新读取 Anthropic 的 *Effective context engineering for AI agents*，核对其将上下文作为有限资源、持续选择和维护信息的工程观点，以及高信号信息与按需载入的讨论。正文只归因该文章，不将建议转写为跨模型效果承诺。
- **REF-016：** 重新读取 OpenAI Agents SDK 的 *Context management*，核对 local context 与 LLM context 的区分、本地 context 不自动发送给 LLM，以及 instructions、input、函数工具、retrieval/web search 等信息入口。正文只把它作为该 SDK 的例子。
- **REF-017：** 重新读取 OpenAI Agents SDK 的 *Running agents*，核对其跨轮状态的承载策略与客户端、服务端状态混用可能造成重复上下文的警告。正文不猜测任何字段、ID 或其他产品的延续语义。
- **REF-018：** 重新读取 Gemini API 的 *Long context*，核对避免不需要 token、查询位置与 context caching 的产品限定建议。任何能力细节、价格、阈值或缓存生命周期都留待正文当天重新核验。
- **REF-019：** 重新读取 Anthropic 的 *Contextual Retrieval*，核对 chunk 可能脱离必要语境的工程背景。正文只由此引出来源与范围字段，不采用其实现或实验结果。
- **未验证范围：** 本次仅建立了证据边界。第 6 章正文、Mermaid 图源、图示导出、示例实现、测试、模型调用、检索、缓存和真实测试失败均尚未发生；后续阶段必须单独记录真实执行结果，不能倒灌为本次核验成果。
