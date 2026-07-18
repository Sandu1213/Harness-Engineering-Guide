# 第 31 章 Example Implementation

## 实现范围

- 新建 `examples/agent/test-evidence-plan-assessment.mjs` 与对应 Node 内置测试。
- 新建本章示例计划，并在正文、npm 脚本、总校验和示例说明中登记入口。
- 示例只检查注入的 Test Evidence Plan；不导入 pytest／Playwright，也不执行 HTTP、浏览器、文件、子进程、账户、凭证、网络或 CI。

## 红绿记录

1. **RED：** `node --test examples/agent/test-evidence-plan-assessment.test.mjs` 在模块尚不存在时失败。
   - 实际错误：`ERR_MODULE_NOT_FOUND`。
   - 解释：只证明教学模块尚未创建，不涉及真实测试环境。
2. **GREEN：** 实现 `assessTestEvidencePlan(plan)` 后运行同一命令。
   - 实际结果：8 项通过、0 项失败。
   - 覆盖：完整双层计划、API 契约缺失或不完整、UI 动作后观察缺失、Browser Context 边界不足、Failure Record 关联不足、报告越界和环境请求未批准。
3. **演示：** `node examples/agent/test-evidence-plan-assessment.mjs`。
   - 实际结果：`ready`、`test_evidence_plan_ready`、`implement_in_isolated_example`、`executionPerformed: false`。

## 结论与边界

该示例只证明普通 JavaScript 对象能被确定性分类；它不证明 pytest fixture／`monkeypatch`、Playwright Browser Context、locator、断言、API、浏览器、账户、网络或 CI 已经执行。真实环境请求会被路由为 `requires_approval`，不会触发任何外部动作。
