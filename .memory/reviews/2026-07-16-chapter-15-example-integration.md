---
chapter: "15-observation-and-state-awareness"
stage: "Example Implementation"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 15 章示例整合审查：状态快照判断

## 范围

- `examples/agent/observation-snapshot-assessment.mjs`
- `examples/agent/observation-snapshot-assessment.test.mjs`
- 正文和示例计划中的接口、命令、实际结果与非目标说明。

## 红绿记录

- 先创建测试文件，导入尚不存在的 `observation-snapshot-assessment.mjs`。
- 2026-07-16 实际执行：

```bash
node --test examples/agent/observation-snapshot-assessment.test.mjs
```

结果为退出码 `1`，错误为 `ERR_MODULE_NOT_FOUND`；失败原因是实现文件不存在，而非测试语法或环境错误。

- 随后实现最小纯函数，未增加第三方依赖、网络、文件读写、时钟读取或浏览器调用。
- 再次实际执行：

```bash
node --test examples/agent/observation-snapshot-assessment.test.mjs
node examples/agent/observation-snapshot-assessment.mjs
```

交叉审查补齐前一快照跨行动、跨目标同指纹的两个边界后，结果为 12 项测试通过、0 项失败；演示退出码 `0`，输出 `observed` / `expected_state_observed` / `ui-click-demo` / `submit-status`。

## 行为覆盖

| 路径 | 教学判断 | 关键限制 |
| --- | --- | --- |
| 新鲜、匹配快照 | `observed` | 不代表任务或业务完成。 |
| 关联或目标错配 | `blocked` | 不判断另一行动是否成功。 |
| 字段缺失、陈旧或推测性标签 | `needs_evidence` | 不采集真实证据。 |
| 效果未知 | `blocked` / `effect_unknown_requires_stop_or_escalation` | 不授权重试、重新观察或推断未发生。 |
| 同一观察对象指纹未推进 | `needs_evidence` | 仅比较相同关联与目标，不计算真实时间或比较真实页面。 |
| 跨行动/跨目标同指纹 | `observed` | 不把无关对象的指纹解释为本次未推进。 |
| 已知未匹配状态 | `not_observed` | 不伪造根因或失败分类。 |
| 未识别状态 | `blocked` | 不猜测状态含义。 |

## 接口与边界复核

`observedAt`、`source`、`freshness`、`fingerprint` 和状态字符串均是调用方注入的教学数据。`assessObservationSnapshot` 只在前后快照的 `correlationId` 与 `target` 都相同时比较指纹；它不读取系统时钟，因此不声称任何 TTL、新鲜度计算或异步等待已经实际发生。真实观察器、浏览器验证、评估和恢复分别留给第 25、17 和 18 章。

## 共享集成需求

- 将专用测试与演示命令接入 `package.json` 和 `scripts/validate.sh`。
- 在 `examples/agent/README.md` 说明本章的运行命令、十二条路径和非目标。
- 主线程完成上述改动后，重跑全仓 `npm run validate`；本审查不将局部测试结果冒充为全仓验证。
