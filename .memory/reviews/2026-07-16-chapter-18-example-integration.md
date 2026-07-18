# 第 18 章 Example Integration Review

## 实现范围

- `examples/agent/retry-recovery-assessment.mjs`
- `examples/agent/retry-recovery-assessment.test.mjs`
- 第 18 章正文和 Example Plan 中的接口、边界与测试矩阵。

## 实际执行

```bash
node --test examples/agent/retry-recovery-assessment.test.mjs
node examples/agent/retry-recovery-assessment.mjs
```

结果：测试进程退出码 0，13 项通过、0 项失败；演示进程退出码 0，输出对象的 `status` 为 `retry`、`code` 为 `retry_allowed`、`operationId` 为 `source-fetch-demo`。

## 覆盖的教学路径

- 有界安全重试、契约缺失、失败证据未知、效果未知与非法效果状态。
- 格式/权限等非重试错误、重试预算耗尽和不可安全重复。
- 已生效效果的补偿候选、缺检查点、缺补偿说明和不可逆效果的升级出口。

## 明确未验证的范围

函数只判断注入对象；不发网络、文件、浏览器、模型、Tool、队列或数据库 I/O，不睡眠、不计算退避、不执行重试、补偿、告警、审批或任何外部恢复。测试通过不能证明真实操作可重试、补偿可用、预算合理或人工升级已发生。
