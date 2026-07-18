---
title: "第 31 章事实核验：测试自动化 Harness：pytest 与 Playwright"
chapter: "31"
status: "completed"
updated_at: "2026-07-16"
---

# 第 31 章事实核验：测试自动化 Harness：pytest 与 Playwright

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | pytest 测试函数通过参数请求 fixture，fixture 具有作用域。 | CH31-REF-01，2026-07-16 重读 pytest 官方 fixture 指南。 | 可用于讨论受控依赖的请求和生命周期；不能推断真实 API、网络或数据已经隔离。 |
| FC-02 | pytest `monkeypatch` 的修改会在请求测试或 fixture 结束后撤销。 | CH31-REF-02，2026-07-16 重读 pytest 官方 monkeypatch 指南。 | 可用于要求替身具有恢复边界；不能推断替身等价于真实依赖。 |
| FC-03 | Playwright Browser Context 为每项测试隔离 local storage、session storage 和 cookies。 | CH31-REF-03，2026-07-16 重读 Playwright Isolation 文档。 | 可用于讨论浏览器状态隔离；不能推断账户、服务或业务流程已经运行。 |
| FC-04 | Playwright 建议优先用户可见属性或显式测试契约定位，且 locator 动作时会解析当前 DOM。 | CH31-REF-04，2026-07-16 重读 Playwright locator 文档。 | 可用于讨论定位策略与动作目标新鲜度；不能推断元素语义或业务效果正确。 |
| FC-05 | Playwright 的异步断言会重新检查目标直至条件满足或 timeout。 | CH31-REF-05，2026-07-16 重读 Playwright assertion 文档。 | 可用于讨论可重试观察与 timeout；不能替代完整用户流程、后端状态或人工审查。 |

CH31-REF-01 至 CH31-REF-05 分别映射 REF-095、REF-096、REF-097、REF-083、REF-082。映射只支持本表列出的有限机制。

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-01 | Test Evidence Plan、API Contract Check、UI Flow Evidence、Failure Record 和 Report Gate。 | 是本书教学工件，不称为 pytest、Playwright 或任何厂商的固定 schema。 |
| EM-02 | `accepted-credential`、`credential-rejected`、`service-unavailable` 是虚构登录场景键。 | 不代表认证协议、真实 API 响应或用户体验。 |
| EM-03 | `ready`、`stopped`、`requires_approval` 和 `executionPerformed: false` 是纯内存准入器的返回合同。 | 不构成测试环境安全控制、权限系统或真实报告。 |
| EM-04 | 图中的 Observation Record、Failure Record 和环境批准出口。 | 只表示本书的证据路由，不表示工具、浏览器或服务已经执行。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-06 | `node --test examples/agent/test-evidence-plan-assessment.test.mjs`（实现前） | 退出失败，`ERR_MODULE_NOT_FOUND`，因为被测模块尚未创建。 | 红灯在实现前真实出现；不代表 pytest、Playwright、API 或浏览器失败。 |
| FC-07 | `npm run test:test-evidence-plan-assessment` | 8 项通过、0 项失败。 | 纯函数在测试构造的对象上按合同分类。 |
| FC-08 | `npm run example:test-evidence-plan-assessment` | 输出 `ready`、`test_evidence_plan_ready`、`implement_in_isolated_example` 和 `executionPerformed: false`。 | 演示对象是可开始的教学计划；没有执行 pytest、Playwright、API 或浏览器。 |

## 明确未核验或不覆盖的范围

- 未安装、配置、运行或测试 pytest、Playwright、浏览器、HTTP 服务、数据库、网络代理、账户、认证、cookie、凭证或 CI 作业。
- 未验证真实 API 契约、用户可见登录流程、可访问性、性能、并行稳定性、浏览器兼容性、安全、发布、截图、trace、日志或真实测试报告。
- Mermaid 图与纯内存示例都不产生外部观察；图中的“获批后的实际观察”只是受控升级边界，不是本轮运行结果。
