# 第 31 章事实核验

## 复核材料与结论

| 章节键 | 正式映射 | 当前官方复核 | 可保留的限定陈述 |
| --- | --- | --- | --- |
| CH31-REF-01 | REF-095 | pytest fixture 文档说明测试函数声明参数以请求 fixture，fixture 可具有作用域。 | 受控依赖与生命周期的有限背景；不推断真实 API 隔离。 |
| CH31-REF-02 | REF-096 | pytest monkeypatch 文档说明请求方结束后会撤销修改。 | 替身应有显式恢复边界；不推断替身等价真实依赖。 |
| CH31-REF-03 | REF-097 | Playwright Isolation 文档说明 Browser Context 隔离 local/session storage 与 cookies。 | 浏览器状态隔离的有限背景；不推断账户、服务或业务通过。 |
| CH31-REF-04 | REF-083 | Playwright locator 文档建议用户可见属性或显式契约，且动作时定位当前 DOM。 | 定位策略和动作新鲜度；不推断业务语义或效果。 |
| CH31-REF-05 | REF-082 | Playwright assertion 文档说明异步断言会重试至满足或 timeout。 | 可重试观察和 timeout 边界；不替代端到端验收。 |

## 本书模型与运行证据

- Test Evidence Plan、API Contract Check、UI Flow Evidence、Failure Record、Report Gate 和虚构登录场景均是本书模型或教学输入，不归因 pytest、Playwright 或任何产品。
- 本轮实际重跑 `npm run test:test-evidence-plan-assessment`：8 项通过、0 项失败；`npm run example:test-evidence-plan-assessment` 输出 `ready`、`test_evidence_plan_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。
- 上述运行只证明注入 JavaScript 对象的分类。未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。

## 结论

`通过`。正文、提纲、事实核验工件和正式映射中的可归因陈述均被当前官方资料支持；没有发现需要修正的来源范围、模型边界或运行结论。
