---
title: "第 1 章示例实现：最小 Harness 任务闭环"
chapter: "01"
status: "example-implemented"
implementation: "../../examples/agent/minimal-harness.mjs"
tests: "../../examples/agent/minimal-harness.test.mjs"
updated_at: "2026-07-15"
---

# 第 1 章示例实现：最小 Harness 任务闭环

## 读者问题

“如果工具调用已经返回结果，为什么还需要验证？”

## 示例范围与运行前提

复用现有 `examples/agent/minimal-harness.mjs`。该程序只在内存中将任务文本转换为大写，不调用模型、网络、文件系统或真实密钥。它是一个控制流示例，不是生产 Agent，也不用于演示任何外部产品能力。

运行前提：在仓库根目录安装项目依赖，并有可执行 `node` 与 `npm` 命令。示例本身不读取环境变量、不创建文件，也不需要账户或网络访问。

## 映射关系

| 章节概念 | 示例接口或字段 | 读者可观察到的内容 |
| --- | --- | --- |
| 指令（Instruction） | `instruction` | 运行记录保留任务约束。 |
| 工具（Tool） | `tool(task)` | 工具返回结构化成功或失败结果。 |
| 状态（State） | `state`、`events` | 终态和步骤序列不会只依赖自然语言总结。 |
| 评估（Evaluation） | `validate(result)` | 工具成功不等于任务成功。 |
| 证据（Evidence） | `evidence`、`failure` | 成功或失败有可读的理由。 |

## 已实现的演示路径

1. **接受路径：** 工具返回 `VERIFY STATE`，验证器接受，状态为 `succeeded`。
2. **工具失败路径：** 工具返回结构化失败，流程停止在 `tool_failed`，不记录 `validated`。
3. **验证拒绝路径：** 工具返回成功但验证器拒绝，状态为 `failed`，事件为 `validation_failed`。
4. **输入边界：** 空指令在工具调用前被拒绝，避免无约束执行。

## 运行与验证

```bash
npm run test:harness
npm run example:harness
```

**成功标准：** 测试覆盖四条路径；演示输出包含 `succeeded`、`validator accepted tool output` 与 `planned`、`tool_called`、`validated` 事件。

**验收边界：** `npm run test:harness` 只证明四条确定性控制流；`npm run example:harness` 只证明接受路径的结构化结果。两者均不证明模型质量、外部工具权限、持久化恢复或生产可靠性。

**本次整合记录：** 运行命令、退出结果和输出摘要记录在 `.memory/reviews/2026-07-15-chapter-01-example-integration.md`。只有该记录中的当次真实执行结果可以支撑本阶段完成状态。

## 逐步增强，但不在第 1 章实现

- 将内存状态替换为可恢复的状态记录：留给第 07、10 章。
- 为工具结果增加权限、超时和副作用：留给第 11、12 章。
- 为失败结果增加重试与恢复策略：留给第 18 章。
- 将验证器扩展为多维评估：留给第 17、39 章。
