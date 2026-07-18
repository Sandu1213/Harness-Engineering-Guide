---
chapter: "19-context-compaction-and-long-running-tasks"
review_type: "example-integration"
status: "complete"
reviewed_at: "2026-07-16"
---

# 第 19 章示例整合审查

## 红灯基线

在目标模块尚不存在时实际运行：

```bash
node --test examples/agent/context-compaction-assessment.test.mjs
```

退出码为 1，错误为 `ERR_MODULE_NOT_FOUND`，指向缺失的 `context-compaction-assessment.mjs`。此结果只证明测试在实现之前创建。

## 绿灯与演示

实现纯内存函数后实际运行：

```bash
node --test examples/agent/context-compaction-assessment.test.mjs
node examples/agent/context-compaction-assessment.mjs
```

两条命令退出码均为 0。Node 内置测试为 9 通过、0 失败；演示输出：

```text
{ status: 'ready_to_resume', code: 'compaction_record_ready', runId: 'book-review-run-19' }
```

## 覆盖的教学边界

- 记录缺摘要或再水化计划时返回 `needs_spec`。
- 范围错配时返回 `blocked`，不拼接另一运行的摘要。
- 契约版本不同、锚点断指针时要求 `needs_rehydration`。
- 缺稳定锚点、缺必需证据指针、不确定锚点缺损失检查时要求 `needs_evidence`。
- 未说明或不允许的丢弃决定进入 `needs_review`。

## 运行边界

示例没有读取、压缩或保存真实对话，也没有文件、网络、模型、时钟、数据库、外部记忆、工具调用或权限行为。测试通过仅证明注入对象上的确定性教学判断。
