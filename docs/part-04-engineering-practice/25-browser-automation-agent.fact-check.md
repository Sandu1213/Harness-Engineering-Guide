---
title: "第 25 章事实核验：浏览器自动化 Agent"
chapter: "25"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 25 章事实核验：浏览器自动化 Agent

## 核验范围

本次核验覆盖本章的协议/产品陈述、示例运行结果、图示边界与“本书工程模型”标记。它**不**核验真实浏览器、站点、DOM、登录态、Cookie、用户路径、网络响应、截图、数据写入、浏览器权限或业务完成。

## 来源级核验

| 本地键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 结论与外推禁区 |
| --- | --- | --- | --- |
| CH25-REF-01 | [W3C WebDriver](https://www.w3.org/TR/webdriver2/) | WebDriver 是远程检查和控制用户代理的跨语言、跨平台协议，并主要面向独立控制进程自动化浏览器。 | 已验证。不能据此宣称所有自动化工具、Agent、会话隔离或安全策略一致。 |
| CH25-REF-02 | [Playwright Auto-waiting](https://playwright.dev/docs/actionability) | Playwright 在 `locator.click()` 等动作前进行其 actionability 检查；在给定超时内未满足会失败。 | 已验证。动作准备好不代表提交、导航、后台任务或业务目标完成。 |
| CH25-REF-03 | [Playwright Assertions](https://playwright.dev/docs/test-assertions) | Web-first 异步断言会重复获取并检查，直到条件满足或超时。 | 已验证。断言范围仅限所写条件，不能替代完整用户目标、权限或外部副作用验证。 |
| CH25-REF-04 | [Playwright Locators](https://playwright.dev/docs/locators) | 当前文档建议用户可见属性或显式测试契约；Locator 在动作时定位当时的 DOM。 | 已验证。定位韧性建议不是页面语义、可访问性或测试完备性保证。 |
| CH25-REF-05 | [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) | CDP 的 domain、command、event 组织与 tip-of-tree 可变且不保证向后兼容的说明。 | 已验证。仅限 Chromium 系协议，不能据此声明稳定版本、权限或跨浏览器支持。 |

## 本书模型的分界

| 内容 | 分类 | 核验结论 |
| --- | --- | --- |
| E2E Evidence Contract、快照序号、`primary_click_missing` 等状态码 | 本书模型/纯内存示例 | 不归因给 Playwright、WebDriver 或 CDP。 |
| 前快照 → 主点击 → 后快照 → 判定 | 本书工程规则 | 用于要求可检查的用户可见交互证据；不是任一产品强制 API 流程。 |
| 订单提交案例 | 教学场景 | 没有真实页面、账号、订单、网络、测试报告或用户数据。 |
| “只加载页面、只看 API、只读源码不构成 E2E” | 本书的验证原则 | 用于限制本书的完成声明，而非某个标准的规范性术语。 |

## 示例运行复核

2026-07-16 实际运行：

```bash
node --test examples/agent/browser-e2e-evidence-assessment.test.mjs
node examples/agent/browser-e2e-evidence-assessment.mjs
```

先在实现缺失时得到预期红灯：退出码 `1`、`ERR_MODULE_NOT_FOUND`。实现后专用测试退出码 `0`，10 项通过、0 项失败；演示退出码 `0`，输出 `observed` / `e2e_evidence_chain_complete`。这些结果只验证注入的 JavaScript 对象，不证明真实 UI、浏览器、点击、截图、用户路径、外部效果或业务验收。

## 仍需核验的事项

- `TODO(verify)：` 任何真实浏览器工具、版本、驱动、会话配置、超时、Trace、视频、截图、网络模拟或浏览器支持，需在实际目标环境重新读取官方文档并执行。
- `TODO(verify)：` 若 E2E 使用真实账户、支付、删除、提交、下载或生产数据，需按照第 12、14、18 章补齐环境、批准、恢复和审计证据。
- `TODO(verify)：` 若以视觉差异、无障碍树、性能指标或 API 回包作为验收标准，需要为每项标准定义独立的范围、采样、阈值与复核方法；本章没有此类数据。

## Fact Check 完成检查

- [x] 每项来源级陈述都已在写作日以官方或标准来源实际读取。
- [x] 产品行为、协议实例、本书模型和纯内存运行结果已分开标注。
- [x] 没有伪称真实浏览器、真实 UI 或真实 E2E 已执行。
- [x] 动态资料和未来真实运行保留重新核验条件。
