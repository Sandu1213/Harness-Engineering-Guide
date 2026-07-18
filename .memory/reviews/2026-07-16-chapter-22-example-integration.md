# 第 22 章示例整合审查

日期：2026-07-16
示例：`examples/agent/repository-rule-loading-assessment.mjs`

## 目标与边界

示例只判断注入的教学 `task`、`rules`、`state` 和 `policy`。它不读取真实仓库、文件、环境、时钟、网络、Agent、Codex、Claude Code、hook、权限或外部工具。

## 红绿记录

先创建测试后执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
```

实际红灯：`ERR_MODULE_NOT_FOUND`。目标模块尚未创建；该结果仅证明测试先于实现。

实现后第一次执行发现 1 项断言失败：缺 `status` 的 Rule Record 被静默过滤，函数返回 `required_rule_layer_missing`，而测试期望 `rule_record_incomplete`。修正为先校验所有非退役适用记录的元数据后，再收集活跃规则。

修正后实际执行：

```bash
node --test examples/agent/repository-rule-loading-assessment.test.mjs
node examples/agent/repository-rule-loading-assessment.mjs
```

结果：7 项 Node 内置测试通过、0 项失败；演示输出 `ready_to_load` / `rule_packet_ready`，包含 `entry-codex`、`book-rules`、`project-context`、`current-state`、`chapter-template` 五条教学 ID。

## 覆盖路径

| 路径 | 断言结果 |
| --- | --- |
| 分层、状态和排序完整 | `ready_to_load`。 |
| 缺少必须任务层 | `needs_evidence`。 |
| 注入状态陈旧 | `needs_review`。 |
| 同层、同范围、同冲突键的相反指令 | `blocked`。 |
| `docs` 局部规则用于 `examples` 任务 | 不进入 Packet。 |
| Rule Record 元数据缺失 | `needs_spec`。 |
| 已退役记录 | 不进入活跃 Packet。 |

## 未覆盖范围

未读取或匹配真实 Markdown、glob、符号链接、版本控制、产品入口、文件权限或外部状态；因此测试不能证明任何 Agent 真实加载或遵守规则。
