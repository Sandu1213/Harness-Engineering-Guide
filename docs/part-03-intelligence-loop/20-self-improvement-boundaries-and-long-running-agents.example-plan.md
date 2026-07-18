---
title: "第 20 章示例实现记录：候选改进变更门"
chapter: "20"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 20 章示例实现记录：候选改进变更门

## 目的与边界

`assessImprovementChange` 判断一个注入的候选是否具备进入**受控发布准备**的最低工件：范围匹配的独立验证、明确批准、测试过的回滚与具名监控信号。它不写入 Prompt、Skill、配置或文件；不调用模型、网络、监控、CI、发布系统或长期后台任务。

因此 `ready_for_controlled_release` 只表示本书教学变更门返回的状态，绝不表示已经发布、正在运行、可以接触生产权限、已经监控或能在真实系统中回滚。

## 接口与判定顺序

| 顺序 | 条件 | 返回 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 候选缺 ID、目标、范围或拟议变更 | `needs_spec` | 候选永久无效。 |
| 2 | 独立验证缺失/未知，或范围不匹配 | `needs_evidence` | 候选已失败。 |
| 3 | 独立验证明确失败 | `rejected` | 已执行回滚或找到了根因。 |
| 4 | 批准缺失或范围不匹配 | `needs_approval` | 测试通过即获得权限。 |
| 5 | 回滚不可用/未测试，或监控指标为空 | `needs_evidence` | 真实环境具备恢复能力。 |
| 6 | 所有最低工件齐备 | `ready_for_controlled_release` | 真实系统已经发布。 |

## 红绿验证

先创建测试并执行：

```bash
node --test examples/agent/self-improvement-boundary-assessment.test.mjs
```

实际红灯为 `ERR_MODULE_NOT_FOUND`，因为目标模块尚未创建；这只证明测试先于实现。实现后执行：

```bash
node --test examples/agent/self-improvement-boundary-assessment.test.mjs
node examples/agent/self-improvement-boundary-assessment.mjs
```

真实结果记录在[示例整合审查](../../.memory/reviews/2026-07-16-chapter-20-example-integration.md)。

## 测试矩阵

| 路径 | 预期 | 不能证明 |
| --- | --- | --- |
| 最小门齐备 | `ready_for_controlled_release` | 已经发布。 |
| 候选不完整 | `needs_spec` | Agent 不会再提出候选。 |
| 验证失败或未知 | `rejected` / `needs_evidence` | 真实错误已经恢复。 |
| 验证范围不匹配 | `needs_evidence` | 别处通过可支持当前范围。 |
| 批准缺失或范围不匹配 | `needs_approval` | 测试结果携带授权。 |
| 回滚或监控缺失 | `needs_evidence` | 可在事故中恢复。 |

## 完成检查

- [x] 仅使用 Node.js 内置模块与纯函数。
- [x] 没有发布、写入、网络、权限或后台运行路径。
- [x] 主线程决定是否把专用命令接入共享 `package.json` 与总校验。
