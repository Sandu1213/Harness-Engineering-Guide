---
title: "第 25 章示例计划：浏览器 E2E 证据链判断"
chapter: "25"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 25 章示例计划：浏览器 E2E 证据链判断

## 目的

用没有外部 I/O 的 Node.js 函数验证一条**教学上的** E2E Evidence Contract 是否包含前快照、主点击、后快照和预期状态。它只检查调用方注入的普通对象，不能代替真实浏览器自动化。

## 文件与环境

- 实现：`examples/agent/browser-e2e-evidence-assessment.mjs`。
- 测试：`examples/agent/browser-e2e-evidence-assessment.test.mjs`。
- 环境：仓库根目录的 Node.js 内置 `node:test` 与 `node:assert/strict`；没有新增依赖。

## 输入契约

| 输入 | 教学字段 | 用途 | 不能说明什么 |
| --- | --- | --- | --- |
| `action` | `actionId`、`kind`、`target`、`sequence`、`dispatchStatus`、`effectStatus`、`expectedState` | 描述主动作与期望观察 | 真实点击、浏览器事件、权限或外部效果。 |
| `beforeSnapshot` | `snapshotId`、`sequence`、`target`、`state`、`evidenceStatus` | 表示动作前观察 | 真实 DOM、截图或用户感受。 |
| `afterSnapshot` | 同上 | 表示动作后的独立观察 | 业务任务已验收。 |
| `evidenceContract` | `primaryAction`、必填字段 | 限定教学判断 | SDK 配置、测试框架或工具策略。 |

所有序号和状态都由测试注入；函数不读取时间，所以没有声明真实等待、超时或重试行为。

## 红绿过程与实际结果

1. 先创建测试并导入尚不存在的实现：

   ```bash
   node --test examples/agent/browser-e2e-evidence-assessment.test.mjs
   ```

2. 2026-07-16 实际得到退出码 `1` 与 `ERR_MODULE_NOT_FOUND`；原因是实现模块尚未创建，符合红灯预期。
3. 创建最小实现后实际运行：

   ```bash
   node --test examples/agent/browser-e2e-evidence-assessment.test.mjs
   node examples/agent/browser-e2e-evidence-assessment.mjs
   ```

4. 专用测试退出码 `0`：10 项通过、0 项失败。演示退出码 `0`，输出 `observed` / `e2e_evidence_chain_complete` / `submit-order-demo` / `submit-order`。

## 测试矩阵

| 路径 | 预期判断 | 已实际执行 |
| --- | --- | --- |
| 前快照、点击、后快照与预期状态完整 | `observed / e2e_evidence_chain_complete` | 是。 |
| 主动作不是点击 | `blocked / primary_click_missing` | 是。 |
| 前快照缺字段 | `needs_evidence / before_snapshot_fields_missing` | 是。 |
| 主动作未派发 | `blocked / primary_action_not_dispatched` | 是。 |
| 动作效果未知 | `blocked / primary_action_effect_unknown` | 是。 |
| 前快照目标不同 | `blocked / before_snapshot_target_mismatch` | 是。 |
| 后快照不是动作之后 | `needs_evidence / post_action_snapshot_missing` | 是。 |
| 后快照只是推测 | `needs_evidence / post_action_snapshot_not_observed` | 是。 |
| 观察状态与期望不符 | `not_observed / expected_ui_state_not_observed` | 是。 |
| 后快照复用前快照 ID | `needs_evidence / post_action_snapshot_reused` | 是。 |

## 明确不覆盖的范围

- 不启动、控制、附着或检查任何浏览器、WebDriver、Playwright、CDP、DOM、截图、Cookie、下载、网络或页面。
- 不产生点击、输入、导航、登录、表单提交、HTTP 请求、真实超时或重试。
- 不断言实际用户能完成流程，也不评估业务结果、数据持久化、权限、无障碍、性能、安全或发布状态。
- 本章“动作后重新快照”的规则必须在真实目标和授权明确后，使用相应浏览器工具实际执行；本例不能替代它。
