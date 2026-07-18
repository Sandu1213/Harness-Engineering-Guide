---
title: "第 45 章 Example Implementation：跨工具接力准入"
chapter: "45"
stage: "Example Implementation"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章 Example Implementation：跨工具接力准入

## 目标与边界

本轮实现纯内存 `assessCrossToolHandoff(input)`，只判断调用方注入的跨工具接力工件。模块不读取仓库、文件、环境变量、会话或外部系统，不启动 Codex、Claude Code、subagent、worktree、Git、网络、浏览器、MCP、模型、审批或外部动作。

## TDD 证据

| 阶段 | 命令 | 实际结果 |
| --- | --- | --- |
| RED | `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs` | 退出码 1；`ERR_MODULE_NOT_FOUND`，因为实现模块尚不存在。 |
| GREEN | 同一测试命令 | 退出码 0；15 项通过、0 项失败。 |
| EXECUTE | `rtk node examples/agent/cross-tool-handoff-assessment.mjs` | 退出码 0；输出 `ready_to_resume / cross_tool_handoff_ready / claim_next_task / executionPerformed:false`。 |

## 覆盖的公开行为

- Shared Project Contract、Context Read Protocol、Tool Adapter Profile 和下一任务缺口保守返回 `needs_context`。
- 过期 Profile 与目标工具必需能力未知返回 `capability_review_required`，不复制来源工具能力。
- 专属路径重叠和阻塞冲突返回 `state_conflict`；价值取舍进入 `human_decision_required`。
- `draft` Handoff Package 与未完成 Integration Gate 返回 `integration_required`；`delivered` 不等于 `integrated_snapshot_ready`。
- 输入版本漂移和过期 Validation Evidence 返回 `validation_required`。
- 完整注入证据才返回 `ready_to_resume`；外部执行请求仍进入人工集成。
- 每条返回路径固定 `executionPerformed: false`。

## 文件与接入

- 计划：`docs/part-07-future/45-codex-claude-code-handoff-and-long-term-context.example-plan.md`。
- 实现：`examples/agent/cross-tool-handoff-assessment.mjs`。
- 测试：`examples/agent/cross-tool-handoff-assessment.test.mjs`。
- 正文 front matter、示例段、验证表和完成检查已同步为当前结果。
- 按任务边界未修改 `package.json`、`scripts/validate.sh`、Examples README、词表、进度或上下文文件。

## 未覆盖范围

测试和演示使用虚构注入对象，不能证明真实跨工具通信、产品会话、Context Read Protocol、工具能力、Handoff Package、Integration Gate、人工决定、仓库 Validation 或任何外部效果已经发生。它们也不能替代第 45 章后续 Diagram Review、Fact Check、Language Editing、Final Review 与全仓收口。

## 最终定向验证

- 复跑 `rtk node --test examples/agent/cross-tool-handoff-assessment.test.mjs`：退出码 0，15 项通过、0 项失败。
- 复跑 `rtk node examples/agent/cross-tool-handoff-assessment.mjs`：退出码 0，输出包含 `executionPerformed: false`。
- 对实现与测试运行 `rtk node --check`：两个文件均退出码 0。
- 对实现扫描文件、网络、子进程、动态导入和环境变量 API：无匹配。
- 对正文、example-plan 与本记录运行 Markdown lint：3 个文件，0 个错误；三个文件的链接检查均退出码 0，正文 9 个链接通过。
- 5 个本轮文件均存在且以换行结尾，尾随空白扫描无匹配；`rtk git diff --check` 退出码 0，未跟踪文件的逐文件 `--no-index --check` 没有空白诊断。
- 未运行全仓 `npm run validate`，未执行图示渲染、产品会话、权限、Git 写入或任何外部动作。
