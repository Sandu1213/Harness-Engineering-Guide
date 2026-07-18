---
title: "第 36 章 Fact Check"
chapter: "36"
stage: "Fact Check"
status: "completed"
updated_at: "2026-07-16"
---

# 第 36 章 Fact Check

## 范围

- 重读正文引用的 REF-029、REF-030、REF-031、REF-114 与 REF-115，并将允许陈述和外推禁区记录到 `36-harness-design-patterns.fact-check.md`。
- 核对正文把模式卡、结果所有者、选择顺序、停止规则、虚构案例、教学状态、示例与图示明确区分为本书模型或教学输入。
- 复核实际示例状态，修正正文中“未实现、未运行”的过期表述；不修改共享 npm 入口、进度或上下文状态。

## 来源级结论

- REF-029 只支持 Anthropic 的 workflow／agent 区分、常见结构与复杂度取舍建议。
- REF-030 只支持 OpenAI Agents SDK Python 文档中的 LLM／代码编排、manager、handoff、串联、评估循环和独立任务并行例子。
- REF-031 只支持 AWS Step Functions 的状态机、事件驱动步骤和流控制状态背景。
- REF-114 只支持 CloudEvents 对 occurrence、event、producer、consumer、intermediary 与上下文的规范术语；本轮读取页面为 `1.0.3-wip`，不得升级为投递或可靠性保证。
- REF-115 只支持 Node.js `EventEmitter` 的命名事件和按注册顺序同步监听器语义。

## 正文修订

- 将“本章目前没有可运行实现”修正为已实施的纯内存 `assessHarnessPatternSelection(card)`，并链接源文件与测试文件。
- 将单元与演示验证行更新为本轮实际执行的命令与结果：8 项通过、0 项失败，演示固定为无副作用的 `executionPerformed: false` 输出。
- 新增事实核验链接，并将已记录的 Technical Review、Example Implementation、Diagram Review 与 Fact Check 勾为完成；Language Editing、Final Review、共享状态工件和全仓校验仍保持未完成。

## 实际验证与限制

- `node --test examples/agent/harness-pattern-selection-assessment.test.mjs`：退出码 0，8 项通过、0 项失败。
- `node examples/agent/harness-pattern-selection-assessment.mjs`：退出码 0，只输出 `ready`、`controlled_single_loop_ready`、`continue_controlled_single_loop` 与 `executionPerformed: false`。
- 未运行全仓 `npm run validate`；没有运行或模拟真实控制流、Agent、模型、工作者、队列、事件、事件投递、工作流、并发、工具、Git、浏览器、CI、文件、网络、账户、凭证、审批或外部系统。
