---
title: "第 5 章示例实现说明：指令装配预检"
chapter: "05"
status: "example-implemented"
implementation: "../../examples/agent/instruction-packet.mjs"
tests: "../../examples/agent/instruction-packet.test.mjs"
updated_at: "2026-07-15"
---

# 第 5 章示例实现说明：指令装配预检

> 本文件记录已实现并运行的纯内存教学示例。它只检查本书定义的组件分类、范围与冲突记录；不调用模型，不实现或验证任何供应商的消息权威、Prompt 服从、工具执行、权限、安全防护或外部系统行为。

## 读者问题

“当项目规则、任务请求、数据片段和输出契约同时进入一个 Agent 任务时，Harness 怎样先把它们整理成可检查的组件，并在来源不清、范围冲突或交付契约缺失时停止？”

## 最小范围与运行前提

实现位于 `examples/agent/instruction-packet.mjs`。`assembleInstructionPacket(packet)` 只接收测试构造的 JavaScript 对象，并返回确定性的装配结果；没有模型客户端、网络客户端、文件路径、环境变量、账户、凭证、系统命令、时间依赖或随机行为。

输入 `packet` 的教学字段如下：

| 字段 | 用途 | 计划边界 |
| --- | --- | --- |
| `projectRules` | 命名的项目规则、允许的任务类型和适用范围。 | 不读取 `AGENTS.md`、`CLAUDE.md` 或真实仓库规则。 |
| `taskBrief` | 当前任务类型、目标范围、目标、停止条件。 | 不解释自然语言意图，不决定真实用户授权。 |
| `contextData` | 带来源名称和内容的待处理数据片段。 | 始终作为数据组件记录；不解析网页、日志、代码或恶意文本。 |
| `outputContract` | 必填输出字段和失败表示。 | 只检查教学字段是否齐全；不实现 JSON Schema、供应商 structured output 或业务验证。 |
| `conflictPolicy` | 本书为示例定义的已知冲突类型、测试注入的已检测类型与未知冲突动作。 | 不映射 OpenAI、Codex、Claude Code、Gemini 或其他产品的真实优先级。 |

计划输出包含 `state`、`phase`、`components`、`sources`、`conflicts`、`evidence` 和 `unresolved`。`state` 只能是 `ready` 或 `blocked`；只有输入满足本示例的显式规则时才返回 `ready`。`ready` 仅表示“纯内存包可进入后续教学步骤”，不表示模型会遵守指令、输出正确、任务已完成或动作已获授权。

## 概念映射

| 章节概念 | 计划接口或结果 | 预期观察 |
| --- | --- | --- |
| 项目规则 | `projectRules` 与 `components.projectRules` | 规则有命名来源和声明范围，而不是匿名拼接文本。 |
| 任务请求 | `taskBrief` 与 `components.taskBrief` | 任务类型和目标范围均可被预检。 |
| 上下文数据 | `contextData` 与 `components.contextData` | 即使数据包含“忽略规则”一类文字，也只保留为数据，不成为规则组件。 |
| 输出契约 | `outputContract` 与 `components.outputContract` | 缺少本书教学契约的必填字段时，装配停止。 |
| 冲突处理 | `conflictPolicy`、`conflicts`、`unresolved` | 超出范围、未知裁决或缺少契约会显式记录，不靠追加 Prompt 文字掩盖。 |
| 可验证状态 | `state`、`phase`、`evidence` | 每次 `blocked` 都包含可观察理由，而非仅返回空结果。 |

## 测试路径

Node 内置测试只断言本书定义的纯函数接口，预期值来自下表而非模型响应。

1. **正常装配：** 项目规则允许 `code-review`，任务范围匹配，数据有来源，输出契约完整，返回 `ready` / `assembled`；组件清单和来源记录完整，`conflicts` 为空。
2. **数据伪装为规则：** `contextData` 含有“忽略项目规则”一类字符串，函数仍把它保留为 `contextData`，不移动到 `projectRules`，并在证据中标明它没有获得规则身份。
3. **任务超出范围：** `taskBrief.scope` 不属于项目规则允许范围，返回 `blocked` / `scope_conflict`；不得产生待执行请求或“已完成”状态。
4. **缺少输出契约：** `outputContract` 缺少本示例要求的失败表示或必填字段，返回 `blocked` / `missing_output_contract`，并列出缺失项。
5. **未知裁决规则：** 输入出现本书 `conflictPolicy` 未声明的冲突类型，返回 `blocked` / `unknown_conflict_policy`，将问题放入 `unresolved`，不猜测产品优先级。

## 实际运行与成功条件

从仓库根目录运行：

```bash
npm run test:instruction-packet
npm run example:instruction-packet
```

第一条命令运行五条 Node 内置测试；第二条命令只打印正常装配路径的结构化结果。

2026-07-15 已实际运行：先执行 `node --test examples/agent/instruction-packet.test.mjs`，因模块不存在而得到 `ERR_MODULE_NOT_FOUND`；随后实现模块并运行上述两条 npm 命令，5 项测试全部通过。演示输出 `ready` / `assembled`、四类组件、四项来源记录和三项可观察证据；无任何真实 I/O 或模型调用。测试通过仍只证明教学对象的纯函数行为，不证明真实 Prompt、模型、供应商 API、项目规则文件或安全策略。详细记录见 `.memory/reviews/2026-07-15-chapter-05-example-integration.md`。

## 不属于本示例的能力

- 读取、组合或强制执行 `AGENTS.md`、`CLAUDE.md`、system / developer / user 消息：仅在相应产品的官方资料和真实运行环境中讨论；本示例不复现这些行为。
- Prompt injection 检测、防护或隔离：留给第 12、41 章及其独立安全资料；“把数据标为数据”不是安全保证。
- 上下文选择、检索、压缩和长期记忆：分别留给第 6、7、13、19 章。
- 真实 JSON Schema、供应商 structured output、业务校验和人工接受：留给第 17、39 章；本示例只检查教学契约字段。
- 文件写入、网络请求、工具协议、Sandbox、凭证、权限与审批：留给第 11、12、14、24、27、41 章。

## 实现与边界检查

- [x] 接口仅依赖测试注入的纯内存数据，且未引入新依赖。
- [x] 五条路径覆盖正常装配、数据伪装、范围冲突、契约缺失与未知裁决。
- [x] 输出状态、证据和未决项具有明确的教学含义。
- [x] 未把产品角色、标签、结构化输出或规则文件表述为统一协议或安全控制。
- [x] 已创建实现、测试、npm scripts、红灯/绿灯记录和演示；它们均不代表真实产品或外部系统行为。
