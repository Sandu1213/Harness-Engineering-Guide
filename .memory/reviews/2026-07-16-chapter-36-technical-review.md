# 第 36 章 Technical Review

## 审查范围

- 工件：`docs/part-06-design-and-evaluation/36-harness-design-patterns.md`，以及本章的 Research Brief、引用映射和详细 Outline。
- 审查类型：技术审查。
- 对照材料：`.ai/references.md` 中第 36 章的 REF-029、REF-030、REF-031、REF-114、REF-115 登记范围；`docs/part-05-case-studies/35-enterprise-harness-architecture.md` 的结尾；`docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md` 的开篇与前置知识。
- 审查限制：本次只重读仓库中已登记的来源范围和章节工件；未访问网络，也未运行任何 Agent、模型、队列、事件总线、调度器、工作流引擎、并发工作者、工具、Git、浏览器、CI、文件、账户、凭证或外部系统。

## 结论

`可合并`。第 36 章把五项来源限定为词汇和产品／运行时背景，并把 Pattern Card、结果所有者、选择顺序、停止规则、教学状态和虚构案例标为本书工程模型。正文没有把模式卡、事件描述、SDK 示例或运行时监听器语义扩大为真实执行、投递、顺序、重试、去重、授权、安全、恢复或业务效果保证。

## 来源边界核对

| 编号 | 已登记的受限用途 | 正文中的处理 | 审查结论 |
| --- | --- | --- | --- |
| TR-36-01 | REF-029：Anthropic 对预定义 workflow、动态 agent、常见组合结构和复杂度取舍的工程建议。 | 仅用于说明 workflow／agent 区分和“先从简单结构开始”的受限背景；五张模式卡、选择阈值和控制责任均明确为本书模型。 | 通过；未写成通用分类标准、默认架构、性能或安全结论。 |
| TR-36-02 | REF-030：OpenAI Agents SDK Python 文档中的代码编排、manager、handoff、串联、评估循环和独立任务并行例子。 | 仅用作监督者—工作者的产品特定例子；正文明确不据此推导其他 SDK 接口、handoff 安全、并发隔离或任何真实运行。 | 通过；SDK 主体和外推禁区清楚。 |
| TR-36-03 | REF-031：AWS Step Functions 的事件驱动状态机和 Choice、Wait、Map、Parallel 等流控制背景。 | 仅用作“运行时语义需要具体定义”的产品背景；流水线字段与停止规则没有借用 ASL schema，也没有声称产品执行、错误或恢复保证。 | 通过；产品概念与本书流水线分层明确。 |
| TR-36-04 | REF-114：CloudEvents 对 event、producer、consumer、intermediary 与事件描述格式的规范背景。 | 仅用作事件卡需区分发生事实、来源和消费者责任的背景；正文反复排除投递、顺序、重试、去重、授权、事件总线或处理完成的结论。 | 通过；未将描述格式误写为可靠处理。 |
| TR-36-05 | REF-115：Node.js `EventEmitter` 的命名事件与按注册顺序同步调用监听器语义。 | 仅用作“事件运行时语义必须具体核验”的 Node.js 特定例子；没有外推到队列、浏览器、CloudEvents 或其他运行时。 | 通过；实现特定范围保持清楚。 |

## 本书模型、案例与未执行边界

- **本书模型：** Pattern Card 的 `trigger`、`controlOwner`、`workContract`、`stateAndEvidence`、`stopAndEscalation`、`sideEffectBoundary` 与 `evolutionTrigger`，以及受控单循环、计划—执行、监督者—工作者、流水线和事件驱动的选择条件，均明确为原创比较工具，不是来源 schema、API 或部署设计。
- **教学案例：** “只读文件修复请求”、`analysis_ready` 和所有工作者／阶段／消费者均是注入的教学对象；正文区分候选结论、外部动作请求和已观察外部效果。
- **未执行边界：** 本章未实现或运行评估器、图示、Agent、模型、队列、事件总线、调度器、工作流、并发、工具、Git、浏览器、CI、文件、网络、账户、凭证或外部系统。示例、图示、事实核验和语言编辑仍须在各自阶段独立验收。

## 跨章节与术语核对

- 第 35 章将企业共享边界中的控制权、状态和停止条件交给第 36 章抽象；第 36 章没有倒写为企业架构、策略、隔离、审计或部署已经存在。
- 第 36 章在结尾把 Pattern Card 语言限制为控制流选择，并把第 37 章限定为记忆与 Skill 的读取、候选写入和项目适配；未将控制流模式混同为记忆、权限、存储、同步或执行证明。
- 结果所有者（Result Owner）、模式卡（Pattern Card）、五种模式及状态名称均在第 36 章首现处给出定义或字段边界；`plan ≠ execution permission`、`event ≠ processed`、`observation ≠ external effect` 的断点在正文、案例和后续图示要求中一致。

## 必须修复

无。

## 应该修复

无。

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| 后续 Fact Check | 在当日重新读取五项外部原始资料后，逐项复核动态 SDK、产品、Node.js 版本与 CloudEvents 规范页面的可访问性和具体用语。 | 将本次基于已登记范围的技术审查，与来源级动态复核明确分开。 |

## 已执行验证与未验证范围

- 已完成：阅读第 36 章正文、Research Brief、参考资料、详细 Outline、全局第 36 章引用映射，以及第 35／37 章相邻边界；未发现需要修改正文的技术问题。
- 已执行：`npx markdownlint-cli2 docs/part-06-design-and-evaluation/36-harness-design-patterns.md .memory/reviews/2026-07-16-chapter-36-technical-review.md` 以退出码 0 完成，检查 2 个文件、0 个错误。
- 已执行：`git diff --check -- docs/part-06-design-and-evaluation/36-harness-design-patterns.md .memory/reviews/2026-07-16-chapter-36-technical-review.md` 以退出码 0 完成，无输出。
- 未验证：真实控制流、Agent、模型、队列、事件、事件投递、工作流、并发、外部工具、文件修复、Git、浏览器、CI、网络、账户、凭证和外部系统行为。
