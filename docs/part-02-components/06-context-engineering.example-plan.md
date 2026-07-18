---
title: "第 6 章示例实现说明：最小 Context Packet"
chapter: "06"
status: "example-implemented"
implementation: "../../examples/agent/context-packet.mjs"
tests: "../../examples/agent/context-packet.test.mjs"
updated_at: "2026-07-15"
---

# 第 6 章示例实现说明：最小 Context Packet

> 本文件记录已实现并运行的纯内存教学示例。`buildContextPacket`、字段、选择顺序和预算单位均是本书约定；它们不代表供应商 API、真实 token 计数、检索排序、缓存策略或安全控制。测试通过只证明注入对象上的确定性函数行为，不证明模型、检索、缓存或外部系统行为。

## 读者问题

“当一条测试失败、一个相关 diff、过期历史摘要和一份巨大的日志同时出现时，Harness 怎样把当前调用所需的信息装配成可检查的上下文包，而不是静默地拼接所有文字？”

## 最小范围与非目标

实现 `buildContextPacket(request)`，仅接收测试构造的 JavaScript 对象，并返回确定性的选择、排除、指针化、刷新和未知项记录。它不会读取真实仓库、文件、环境变量、时间、模型、网络、向量数据库、检索服务、缓存、会话、工具或外部命令；也不会计算真实 token、调用测试命令、处理凭证、判断权限、过滤恶意输入或授权任何动作。

这里的 `budgetUnits` 是测试明确给定的抽象容量单位，用于验证“先保留什么、何时转为引用、为什么停止”。它不是 token 数、字符数、模型上下文窗口或成本估算。

## 实现接口

```js
buildContextPacket({
  taskAnchor: {
    goal: "定位单一测试失败",
    stopCondition: "缺少可追溯的直接证据时停止",
    verificationTarget: "注入的测试名称"
  },
  budgetUnits: 8,
  candidates: [
    {
      id: "failure-output",
      kind: "direct-evidence",
      source: "injected:test-output",
      capturedAt: "2026-07-15",
      relevance: "current",
      freshness: "fresh",
      sizeUnits: 3,
      content: "断言失败摘要"
    }
  ]
})
```

每个候选条目都使用测试注入值。实现字段及其边界如下：

| 字段 | 教学用途 | 实现规则 | 不代表什么 |
| --- | --- | --- | --- |
| `taskAnchor` | 固定当前目标、停止条件和验证对象。 | 三项均为非空字符串；缺项即输入错误。 | 真实用户授权、自然语言意图判定或任务完成。 |
| `budgetUnits` | 让选择产生可观察的取舍。 | 必须是大于零的整数；累计 `sizeUnits` 不得静默超限。 | token 计费、窗口大小或模型性能。 |
| `id`、`kind` | 标识候选资料与类别。 | `kind` 只能为 `constraint`、`direct-evidence`、`history-summary` 或 `reference`。 | 真实知识库 Schema、供应商消息类型或权限等级。 |
| `source`、`capturedAt` | 使资料可追溯并可检查时效。 | 缺少任一项的候选阻塞装配并写入 `unknowns`。 | 来源本身正确、资料可信或数据已获许可。 |
| `relevance`、`freshness` | 记录当前任务关系与可用性。 | `relevance` 必须为 `current` 或 `background`；`freshness: expired` 不进入全文包。 | 自动相关性判定、真实 TTL 或缓存失效策略。 |
| `sizeUnits`、`content`、`reference` | 在全文、按需引用与排除之间做教学选择。 | 超预算且有 `reference` 时指针化；没有可解析 `reference` 时排除并记录理由。 | 文件读取、网页访问、检索或按需工具调用。 |
| `conflictsWith` | 让摘要与新证据的冲突可见。 | 若历史摘要与当前直接证据冲突，结果要求刷新，不使用旧摘要覆盖新证据。 | 事实裁决、根因判断或模型反思。 |

## 输出契约

返回对象包含以下字段：

```js
{
  state: "ready" | "blocked" | "refresh_required",
  phase: "assembled" | "missing_provenance" | "refresh_context",
  packet: {
    taskAnchor,
    selected: [],
    pointers: [],
    usedBudgetUnits: 0,
    budgetUnits: 8
  },
  excluded: [],
  unknowns: [],
  refresh: [],
  evidence: []
}
```

- `ready` 只表示这个纯内存对象满足本章的显式选择规则；不表示模型已经看见内容、理解问题、找出根因、执行了测试或完成任务。
- `blocked` 表示缺失任务锚点、资料出处或其他计划前置条件；不能用空包伪装为可继续。
- `refresh_required` 表示新直接证据与历史摘要冲突；保留冲突来源与刷新请求，不裁决哪一方真实。
- `pointers` 仅记录可解析引用和加载条件；不读取它们指向的内容。
- `evidence` 记录选择或排除依据；不把候选文本自动提升为事实。

## 确定性选择规则

1. 先验证 `taskAnchor`、`budgetUnits`、候选 `id`、`kind`、`source`、`capturedAt`、`freshness` 和 `sizeUnits`。资料缺少来源或捕获时间时停止，避免无出处断言静默进入包。
2. 先处理新鲜的 `constraint` 和 `direct-evidence`，再处理 `history-summary`，最后处理 `reference`；同类按输入顺序稳定处理。此优先级只是本书教学约定。
3. `freshness: expired` 的候选不进入 `selected`；如果它本来承担当前直接证据角色，则向 `refresh` 写入需要重新取得证据的理由。
4. 全文条目在剩余预算足够时进入 `selected`。预算不足但带 `reference` 的条目进入 `pointers`，并记录按需加载条件；预算不足且无法定位的条目进入 `excluded`。
5. 若 `history-summary.conflictsWith` 指向当前选中的 `direct-evidence`，结果为 `refresh_required` / `refresh_context`；旧摘要保留在排除或刷新记录中，不能覆盖新证据。
6. 输出始终列出预算、选中项、指针、排除项、未知项和刷新项；禁止只返回拼接后的匿名字符串。

## 测试路径

Node 内置测试只断言上述纯函数契约，预期值来自本节规则而不是模型响应。

1. **直接证据优先：** 新鲜约束、失败断言和背景摘要同时存在且预算有限时，当前失败断言进入 `selected`，背景摘要不得挤掉它。
2. **过期证据排除：** 唯一失败日志标为 `expired` 时，它不进入 `selected`，结果记录刷新原因，不能把旧日志写成当前事实。
3. **超预算指针化：** 一个大日志超出抽象预算但带 `reference` 时，它进入 `pointers`，其路径和加载条件可观察，`usedBudgetUnits` 不超过上限。
4. **缺少来源阻塞：** 候选缺少 `source` 或 `capturedAt` 时，结果为 `blocked` / `missing_provenance`，并在 `unknowns` 中指出缺失字段。
5. **冲突摘要刷新：** 历史摘要声明的结果与当前直接证据的 `id` 冲突时，结果为 `refresh_required` / `refresh_context`，记录双方来源，不替任何一方下结论。

## 实际运行与验证

2026-07-15 已先运行：

```bash
node --test examples/agent/context-packet.test.mjs
```

当时实现模块不存在，命令以 `ERR_MODULE_NOT_FOUND` 失败，作为红灯基线。随后创建最小纯函数、npm scripts 和演示入口，并实际运行：

```bash
npm run test:context-packet
npm run example:context-packet
```

五项 Node 内置测试全部通过，覆盖直接证据优先、过期排除、超预算指针化、缺少来源阻塞和冲突摘要刷新。演示输出 `state: "ready"`、`phase: "assembled"`、一个选中的 `failure-output` 直接证据和一个 `large-ci-log` 按需引用，已用抽象预算为 3 / 8。完整红灯、绿灯与边界记录见 `.memory/reviews/2026-07-15-chapter-06-example-integration.md`。

## 不属于本示例的能力

- 真实 Prompt 或模型可见输入的构造：本函数只返回教学对象，不调用模型；第 5、6 章正文也不能由此推断供应商行为。
- 检索、RAG、向量数据库、网页加载与 chunk 处理：留给第 13 章；`reference` 不是工具调用。
- 工作记忆、长期记忆、会话 continuation、压缩与长任务恢复：留给第 7、10、19 章。
- token 计数、缓存命中、价格和延迟：留给第 40 章；`budgetUnits` 不可用于成本推断。
- 注入防护、秘密处理、权限、审计、Sandbox 和人工批准：留给第 12、14、41 章；来源字段不是访问控制。

## 实现与边界检查

- [x] 接口、输入元数据、输出状态和确定性选择规则已定义并实现。
- [x] 直接证据优先、过期排除、超预算指针化、缺少来源阻塞和冲突摘要刷新五条测试路径均已实际运行。
- [x] 抽象预算、指针和来源字段保持非产品、非安全、非性能边界。
- [x] 已创建模块、测试、npm scripts、演示和红灯/绿灯记录；它们均不代表真实 I/O 或外部系统行为。
