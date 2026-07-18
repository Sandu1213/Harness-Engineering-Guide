---
title: "第 3 章示例实现：上下文恢复预检"
chapter: "03"
status: "example-implemented"
implementation: "../../examples/agent/context-recovery.mjs"
tests: "../../examples/agent/context-recovery.test.mjs"
updated_at: "2026-07-15"
---

# 第 3 章示例实现：上下文恢复预检

> 本文件记录已实现的纯内存教学示例及其边界。它只验证由测试注入的上下文快照，不能证明真实仓库、Codex、Claude Code、权限系统或外部运行环境的行为。

## 读者问题

“当新执行者接手一个中断的章节任务时，怎样先检查上下文是否足以继续，而不是假设状态文件彼此一致、研究已经完成或规则自动生效？”

## 计划范围与运行前提

实现位于 `examples/agent/context-recovery.mjs`。`recoverTask` 接收由测试构造的上下文快照，包括当前状态、阶段表、Research 工件和一份可选历史摘要；返回“可领取”“缺少前置条件”或“状态冲突”的结构化结果与证据。

实现计划只使用 Node.js 标准库和测试注入的对象，不读取本机仓库文件、不调用模型、不联网、不执行 Git 命令、不写入文件、不读取环境变量，也不接触账户或密钥。实际仓库阅读、指令发现、权限、并发、版本控制和人类审批不在示例范围内。

## 概念映射

| 章节概念 | 计划接口或字段 | 预期观察 |
| --- | --- | --- |
| 入口与阅读顺序 | `requiredInputs` | 预检会列出恢复任务不可缺少的上下文类别。 |
| 动态状态 | `currentState.nextPhase`、`currentState.research`、`currentState.outline` | 下一阶段不是 Outline 或阶段不允许继续时，结果应包含阻塞理由。 |
| 阶段表 | `progress.research`、`progress.outline` | 预检比较 Research 与 Outline 的阶段状态；冲突不会被静默忽略。 |
| 当前任务工件 | `artifacts.research` | 只有 Research 工件存在且满足当前 Outline 阶段依赖时，才可领取下一项工作。 |
| 历史记录 | `historySummary` | 仅作为解释性输入，不覆盖可复现状态或验证证据。 |
| 交接结果 | `state`、`phase`、`evidence`、`missing`、`conflicts` | 输出说明为什么可以继续或为什么应停止并修复记录。 |

## 计划验证路径

测试已覆盖以下五条确定性路径：

1. **可领取 Outline：** Research 已完成、Outline 未开始、状态和进度一致时，返回 `ready` / `task_claimable`，证据指出可读输入与下一任务。
2. **缺少 Research：** 状态要求创建 Outline，但 Research 工件不存在时，返回 `blocked` / `missing_prerequisite`，且不声称任务可领取。
3. **下一阶段冲突：** 当前状态不把 Outline 标为下一阶段时，返回 `blocked` / `state_conflict`，先确认当前任务再领取工作。
4. **状态冲突：** `CURRENT_STATE` 摘要与 `progress` 对同一阶段给出不同结论时，返回 `blocked` / `state_conflict`，要求先以可复现证据为基线更新记录。
5. **历史不是覆盖层：** 历史摘要声称任务已完成，但当前阶段仍未完成时，返回 `blocked` / `state_conflict`，不允许历史叙述覆盖当前状态。

## 计划运行与成功条件

从仓库根目录执行：

```bash
npm run test:context-recovery
npm run example:context-recovery
```

**实际成功条件：** Node 内置测试覆盖五条路径；演示入口只输出一条可领取路径的结构化结果，并显式包含状态、阶段和证据字段。

**失败边界：** 测试即使通过，也只证明内存快照的确定性预检规则；它不能证明 Codex 或 Claude Code 读取了真实文件，不能证明 `AGENTS.md` 或 `CLAUDE.md` 受到强制执行，不能证明真实仓库状态、Git 历史、文件权限、Sandbox、并发交接或外部系统正确。

## 实际执行记录

- 2026-07-15：先运行 `node --test examples/agent/context-recovery.test.mjs`，因实现模块尚不存在而以 `ERR_MODULE_NOT_FOUND` 失败，作为红灯基线。
- 2026-07-15：实现 `recoverTask` 后运行 `npm run test:context-recovery`，5 项 Node 内置测试全部通过。
- 2026-07-15：运行 `npm run example:context-recovery`，输出 `state: "ready"`、`phase: "task_claimable"`、`task: "outline"`，并包含 Research 工件存在和状态/阶段表一致的两项证据。
- 详细命令、红灯和绿灯记录见 `.memory/reviews/2026-07-15-chapter-03-example-integration.md`。

## 可选增强，但不属于第 3 章最小示例

- 将真实文件解析和路径存在性检查作为受控工具协议：留给第 11 章。
- 以持久化检查点和恢复规则处理长任务：留给第 10、18、19 章。
- 引入 `AGENTS.md`、`CLAUDE.md` 的产品特定发现逻辑：留给第 22、45 章，并在实现当天重新查询官方资料。
- 加入权限、Sandbox、审计和审批：留给第 12、14、41 章。
