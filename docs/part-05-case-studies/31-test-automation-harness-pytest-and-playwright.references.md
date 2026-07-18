---
title: "第 31 章参考资料：测试自动化 Harness：pytest 与 Playwright"
chapter: "31"
status: "registered"
updated_at: "2026-07-16"
---

# 第 31 章参考资料：测试自动化 Harness：pytest 与 Playwright

> 本地 `CH31-REF-*` 键用于章节内追溯。正式映射为 CH31-REF-01 至 CH31-REF-05 分别对应 REF-095、REF-096、REF-097、REF-083、REF-082；本地键保留以标记每项来源的限定用途。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- |
| CH31-REF-01 | [pytest: How to use fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html) | pytest 官方文档 | 测试函数请求 fixture，fixture 有作用域并可承载准备／清理。 | 2026-07-16：写作日重读；REF-095。 | 真实服务、网络、数据库或测试数据已经隔离。 |
| CH31-REF-02 | [pytest: How to monkeypatch/mock modules and environments](https://docs.pytest.org/en/stable/how-to/monkeypatch.html) | pytest 官方文档 | `monkeypatch` 可安全修改指定目标，且在请求方结束后撤销。 | 2026-07-16：写作日重读；REF-096。 | 替身和真实依赖等价，或真实副作用已被覆盖。 |
| CH31-REF-03 | [Playwright: Isolation](https://playwright.dev/docs/browser-contexts) | Playwright 官方文档 | 每项测试的 Browser Context 具有独立 storage、cookies 和 clean-slate 隔离语境。 | 2026-07-16：写作日重读；REF-097。 | 真实浏览器、账户、并行执行或业务流程已经运行。 |
| CH31-REF-04 | [Playwright: Locators](https://playwright.dev/docs/locators) | Playwright 官方文档 | 推荐用户可见属性或显式测试契约；动作时解析当前 DOM。 | 2026-07-16：写作日重读；复用 REF-083。 | 定位成功等于业务成功、可访问性或正确效果。 |
| CH31-REF-05 | [Playwright: Assertions](https://playwright.dev/docs/test-assertions) | Playwright 官方文档 | Web-first 异步断言会重试至满足或到达 timeout。 | 2026-07-16：写作日重读；复用 REF-082。 | 自动重试替代完整用户流程、后端状态或人工审查。 |

## 写作规则

- pytest 与 Playwright 的产品行为只用于本表允许的有限陈述；Test Evidence Plan、API Contract Check、UI Flow Evidence、Failure Record 与 Report Gate 都是本书工程模型。
- 本章不记录真实服务地址、账户、凭证、cookie、浏览器 profile、测试数据、接口响应、截图或 CI 输出。
- 后续写入任何具体 pytest／Playwright 版本、配置、timeout、浏览器矩阵、并行策略、网络模拟或命令前，必须在写作当天重新核验对应官方资料。
