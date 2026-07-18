---
title: "第 7 章示例实现记录：最小 Memory Record 决策"
chapter: "07"
status: "implemented"
implementation: "../../examples/agent/memory-record-decision.mjs"
tests: "../../examples/agent/memory-record-decision.test.mjs"
updated_at: "2026-07-15"
---

# 第 7 章示例实现记录：最小 Memory Record 决策

> 本文件记录已实现并运行的纯内存教学示例。`decideMemoryRecord`、状态名称、字段和排序规则均为本书约定；它们不代表供应商 memory API、真实会话、持久化、知识库、检索、权限、数据保留或安全控制。它不读取或写入外部状态，所有输入都由测试或演示显式注入。

## 读者问题

“一个当前观察、一条团队经验和一个来源不明的旧摘要同时出现时，Harness 怎样显式决定它们只能服务当前任务、可作为跨任务候选、必须补证，还是必须刷新？”

## 最小范围与非目标

计划实现纯函数 `decideMemoryRecord(request)`：它只接收测试构造的 JavaScript 对象，按来源、主体、scope、时效、读取触发和撤销路径输出一条确定性决定。它不读取或写入真实文件、环境变量、时钟、网络、数据库、向量库、会话、sandbox、模型、工具、账户、凭证或外部命令；不保存数据，也不触发检索或真正的上下文装配。

`observedAt`、`validity` 与 `taskAnchor` 都是测试注入的抽象值。函数比较它们只为说明本书的显式判断规则，不实现真实 TTL、时钟漂移、留存策略、用户同意、数据删除或访问控制。

## 实际接口

```js
decideMemoryRecord({
  taskAnchor: "定位当前测试失败",
  subject: "project:demo",
  candidate: {
    id: "failure-observation",
    kind: "observation",
    scope: "task",
    subject: "project:demo",
    source: "injected:test-output",
    observedAt: "2026-07-15",
    writeReason: "记录当前验证对象",
    readTrigger: "当前任务仍在处理此失败",
    validity: "current",
    revisionOrRevocation: "replace-on-new-observation"
  }
})
```

## 输入字段与边界

| 字段 | 教学用途 | 计划规则 | 不代表什么 |
| --- | --- | --- | --- |
| `taskAnchor` | 固定当前要解决的任务。 | 必须为非空字符串；缺失则阻塞。 | 真实授权、意图理解或任务完成。 |
| `subject` 与 `candidate.subject` | 检查记录是否可用于当前主体。 | 两者不匹配时阻塞，不静默复用。 | 身份认证、租户隔离或权限裁决。 |
| `kind` 与 `scope` | 区分当前观察、经验与记录适用范围。 | `scope: task` 可进入工作记忆；`scope: cross-task` 只能成为长期候选。 | 供应商对象类型、数据库 Schema 或永久保存。 |
| `source`、`observedAt`、`writeReason` | 记录来源、时间和保留理由。 | 缺少任一项时阻塞，并列出缺失信息。 | 来源正确、数据可靠或已经授权。 |
| `readTrigger`、`validity`、`revisionOrRevocation` | 检查何时可读、是否仍可用以及如何更新。 | `validity: expired` 输出刷新请求；跨任务候选缺少撤销或修订路径时被阻塞。 | 真实 TTL、自动刷新、留存合规或删除执行。 |

## 输出契约

```js
{
  state: "working" | "long_term_candidate" | "blocked" | "refresh_required",
  phase: "current_task" | "candidate_review" | "missing_metadata" | "refresh_before_read",
  record: { /* 原候选的最小可追溯视图 */ },
  reasons: [],
  unknowns: [],
  nextAction: "keep_in_working_memory" | "review_for_long_term" | "add_evidence" | "refresh_current_evidence"
}
```

- `working` 仅表示这条测试注入记录满足当前任务的工作记忆规则；不表示真实系统已保存、模型已看到、事实成立或任务完成。
- `long_term_candidate` 仅表示记录可进入后续人工或工作流审查；不表示已经跨任务存储、被授权共享或可以绕过当前证据复核。
- `blocked` 表示缺少来源、范围、主体、读取触发或生命周期信息；不得用空对象伪装为可继续。
- `refresh_required` 表示记录已过期或当前条件不满足；不裁决新旧内容哪一个真实。

## 确定性决策规则

1. 先校验 `taskAnchor`、当前 `subject` 与候选的 `id`、`kind`、`scope`、`subject`、`source`、`observedAt`、`writeReason`、`readTrigger` 与 `validity`；`scope: cross-task` 另要求 `revisionOrRevocation`。
2. 当前主体不匹配、缺少来源或缺少时间时，返回 `blocked` / `missing_metadata`，在 `unknowns` 中精确记录原因；实现不得补写猜测值。
3. `validity: expired` 先返回 `refresh_required` / `refresh_before_read`；旧记录可保留来源指针，但不能作为当前事实或直接转成长期候选。
4. 已满足元数据条件的 `scope: task` 记录返回 `working` / `current_task`；它只服务当前任务。
5. 已满足元数据条件的 `scope: cross-task` 记录返回 `long_term_candidate` / `candidate_review`；它必须有明确的修订或撤销路径，下一次读取仍需与当前证据复核。
6. 输出始终携带原因、未知项和下一步；禁止只以布尔值表示“记住”或“忘记”。

## 已实现的测试路径

Node 内置测试只断言上述纯函数契约；预期值来自本节规则，不来自模型响应。2026-07-15 已实际运行并通过以下六条路径：

1. **当前观察进入工作记忆：** 来源、主体、scope、时效与读取触发齐全的 `scope: task` 观察返回 `working`，且 `nextAction` 为 `keep_in_working_memory`。
2. **跨任务经验成为候选：** 带来源、范围、读取触发与撤销路径的 `scope: cross-task` 经验返回 `long_term_candidate`，但不声称已经持久化。
3. **缺少来源被阻塞：** 缺失 `source` 或 `observedAt` 的候选返回 `blocked` / `missing_metadata`，并在 `unknowns` 中指出缺失字段。
4. **过期记录要求刷新：** `validity: expired` 的记录返回 `refresh_required` / `refresh_before_read`，保留刷新理由而不替它生成新值。
5. **主体不匹配不复用：** 当前任务主体与候选主体不一致时返回 `blocked`，不把其他主体的经验放入当前工作记忆或长期候选。
6. **长期候选缺少撤销路径：** `scope: cross-task` 但没有 `revisionOrRevocation` 的记录返回 `blocked`，防止不可维护的长期断言进入下一阶段。

## 实际命令与结果

实现位于 [memory-record-decision.mjs](../../examples/agent/memory-record-decision.mjs)，测试位于 [memory-record-decision.test.mjs](../../examples/agent/memory-record-decision.test.mjs)，并已接入 `scripts/validate.sh`。实施前已运行红灯命令，因目标模块不存在而以 `ERR_MODULE_NOT_FOUND` 失败；该失败只证明测试先于实现存在。

```bash
npm run test:memory-record-decision
npm run example:memory-record-decision
```

上述测试命令实际报告 6 项通过、0 项失败；演示命令对注入的当前失败观察输出 `working` / `current_task` 与 `keep_in_working_memory`。成功只证明纯函数对注入对象给出确定性的状态、原因、未知项和下一步；不证明任何产品已经写入、读取、同步、授权或删除记忆。完整红绿记录见 [示例整合审查](../../.memory/reviews/2026-07-15-chapter-07-example-integration.md)。

## 不属于本示例的能力

- 真实 Session、Claude Code auto memory、OpenAI Agents SDK sandbox memory 或 LangChain store：仅作为来源背景，不在函数中调用或模拟。
- Context Packet、模型输入与工具调用：第 6、11 章负责；本函数不将任何记录发送给模型。
- 计划、检查点、恢复、并发、幂等与长任务压缩：第 10、19 章负责。
- 知识库、RAG、向量检索与索引：第 13 章负责；`source` 字段不是检索实现。
- 权限、隐私、数据留存、删除、审计与人工批准：第 12、14、41 章负责；`subject` 与 `scope` 不是访问控制。

## 实现完成检查

- [x] 定义了纯内存输入、输出、状态、原因、未知项和下一步契约。
- [x] 定义了工作记忆、长期候选、阻塞与刷新所需的最小判断规则。
- [x] 实现并实际运行了六条确定性 Node 内置测试与演示命令。
- [x] 记录了无真实 I/O、模型、产品 memory、检索、权限或持久化的边界。
- [x] 记录了模块缺失的红灯基线、6 项通过的绿灯结果和演示输出，未将其写成真实记忆操作。
