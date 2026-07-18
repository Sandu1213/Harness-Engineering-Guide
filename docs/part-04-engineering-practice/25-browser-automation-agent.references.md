---
title: "第 25 章候选参考资料：浏览器自动化 Agent"
chapter: "25"
status: "registered"
updated_at: "2026-07-16"
---

# 第 25 章候选参考资料：浏览器自动化 Agent

> 本地键已登记到 `.ai/references.md`：`CH25-REF-01` 至 `CH25-REF-05` 分别映射为 `REF-080` 至 `REF-084`。本地键保留用于本章研究追溯。

| 本地键 | 建议全局键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH25-REF-01 | REF-080 | [W3C WebDriver](https://www.w3.org/TR/webdriver2/) | W3C 标准 | 2026-07-16 | WebDriver 是远程控制用户代理的、平台与语言无关的协议，主要面向浏览器自动化测试和工具。 | 不把协议接口当作任何 Agent 的默认 Harness、权限模型或业务验收。 |
| CH25-REF-02 | REF-081 | [Playwright Auto-waiting](https://playwright.dev/docs/actionability) | Playwright 官方文档 | 2026-07-16 | `locator.click()` 等动作具有产品定义的 actionability 检查，未在超时内满足会失败。 | 不外推为业务成功、页面状态、跨工具行为、统一超时或安全保证。 |
| CH25-REF-03 | REF-082 | [Playwright Assertions](https://playwright.dev/docs/test-assertions) | Playwright 官方文档 | 2026-07-16 | Web-first 异步断言会重新获取目标并持续检查，直到条件满足或超时。 | 不把一个断言通过视为完整用户流程、外部效果或发布验收。 |
| CH25-REF-04 | REF-083 | [Playwright Locators](https://playwright.dev/docs/locators) | Playwright 官方文档 | 2026-07-16 | 文档建议用用户可见属性或显式测试契约增强定位韧性；Locator 每次用于动作会定位当前 DOM。 | 不保证任意 DOM、定位器、可访问名称或测试 ID 都正确、稳定或代表用户目标。 |
| CH25-REF-05 | REF-084 | [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) | Chrome DevTools 官方协议文档 | 2026-07-16 | CDP 以 domains、commands、events 组织 Chromium 系浏览器的检查、调试与分析能力； tip-of-tree 协议可变且无向后兼容保证。 | 不把 CDP 当作跨浏览器标准、稳定 API、授权机制或真实观察完成证明。 |

## 使用规则

- 仅引用 CH25-REF-01 说明浏览器自动化协议的一个标准实例；不将浏览器控制与用户批准混同。
- CH25-REF-02 至 CH25-REF-04 仅支持 Playwright 当前文档中的动作、断言和 Locator 行为；本章不引用默认超时、浏览器版本、成功率或性能数据。
- CH25-REF-05 仅说明 CDP 的协议组织和版本漂移边界；本章不连接远程调试端口或真实浏览器。
- “必须在主动作后重新快照”是本书工程模型和项目 E2E 规则，不能归因给上述任一来源。

## 主线程集成记录

1. 已登记全局 `REF-080` 至 `REF-084`，对应映射见上表；产品资料的限定范围与本地键一致。
2. 本章新增“浏览器自动化 Agent”和 “E2E Evidence Contract”仅作为正文工程术语，术语表无需把产品机制写成统一规范。
3. 动态资料在未来改写产品行为时必须重新访问对应官方页面。
