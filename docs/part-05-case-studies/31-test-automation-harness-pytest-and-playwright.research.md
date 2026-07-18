---
title: "第 31 章 Research Brief：测试自动化 Harness：pytest 与 Playwright"
chapter: "31"
status: "completed"
updated_at: "2026-07-16"
---

# 第 31 章 Research Brief：测试自动化 Harness：pytest 与 Playwright

## 要解决的工程问题

同一登录需求可能同时有 API 与网页界面：接口返回 200，不代表用户已经完成可见流程；浏览器中的某个元素可见，也不代表接口契约、隔离数据或失败路径正确。本章要研究如何让 Agent 为两类测试准备互补、可诊断的证据，而不是把 pytest 的替身、Playwright 的定位器或一条绿色断言当作端到端交付结论。

## 读者问题与范围

| 读者问题 | 本章研究的回答 | 本章不回答 |
| --- | --- | --- |
| API 测试与 UI 测试为何不能互相替代？ | API Contract Check 检查接口输入、输出和错误分类；UI Flow Evidence 检查用户动作前后可见状态。二者需要关联，但各自的证据范围不同。 | 任何真实登录服务、接口地址或业务协议已经通过。 |
| 怎样减少测试间状态泄漏？ | 研究 pytest fixture／monkeypatch 与 Playwright Browser Context 的受限隔离语义，并把清理与替身边界写入计划。 | fixture、mock 或 Browser Context 自动保证真实服务安全、数据正确或无并发问题。 |
| 怎样让浏览器步骤不只停留在“页面加载了”？ | 研究面向用户属性或显式测试契约的 locator，以及动作后的可重试观察与报告字段。 | 定位器或单个断言本身等同完整用户旅程、可访问性或发布验收。 |

## 已核验的一手资料

| 本地键 | 来源明确表达的内容 | 允许用途 | 不可外推 |
| --- | --- | --- | --- |
| CH31-REF-01 | pytest 的测试函数可通过参数请求 fixture；fixture 可按作用域共享，并可承载准备和清理。 | 讨论 API 检查所需受控依赖与生命周期。 | 真实 API、数据库或网络已被隔离。 |
| CH31-REF-02 | pytest `monkeypatch` 可安全修改属性、映射或环境变量；修改会在请求它的测试函数或 fixture 完成后撤销。 | 讨论替身必须有显式恢复边界。 | 替身一定与真实依赖等价，或真实副作用已被覆盖。 |
| CH31-REF-03 | Playwright 将每项测试放在独立的 Browser Context；独立 contexts 具有自己的 storage 和 cookies。 | 讨论 UI 流程隔离与状态泄漏风险。 | 某个浏览器、账户、并行执行或业务流程已经实际运行。 |
| CH31-REF-04 | Playwright 建议优先使用用户可见属性或显式测试契约定位；每次 locator 动作会定位当前 DOM 元素。 | 讨论定位策略与重渲染下的目标解析。 | 定位到元素即证明业务语义、可访问性或动作效果正确。 |
| CH31-REF-05 | Playwright 的 Web-first 异步断言会重取目标直至条件满足或超时。 | 讨论动作后重新观察与超时失败边界。 | 自动重试能替代用户流程、服务状态或人工审查。 |

访问日期均为 2026-07-16。正式映射为：CH31-REF-01 至 CH31-REF-05 分别对应 REF-095、REF-096、REF-097、REF-083、REF-082；完整 URL、限定语义见[本章参考资料](31-test-automation-harness-pytest-and-playwright.references.md)与[全局引用](../../.ai/references.md)。pytest 与 Playwright 的接口、默认值、浏览器支持和运行命令均可能变化；First Draft、Technical Review 和 Fact Check 必须在写作当天重新读取官方页面。

## 本书研究框架

下列名称是本书为教学案例提出的工作框架，不是 pytest、Playwright 或任何测试平台的固定 schema。

| 工件或边界 | 要解决的问题 | 关键限制 |
| --- | --- | --- |
| Test Evidence Plan | 将场景、层级、目标、隔离、观察和报告要求写成可审查计划。 | 计划不是一次执行。 |
| API Contract Check | 为 API 路径声明请求前提、预期响应形状、错误分类与替身边界。 | 通过不证明用户界面或真实服务。 |
| UI Flow Evidence | 绑定页面目标、动作前快照、主动作、动作后重新观察和有限断言。 | 通过不证明后端数据、权限或发布。 |
| Failure Record | 将 API／UI／隔离／定位／观察问题分别记录，避免把所有失败称为“flaky”。 | 分类不自动给出根因。 |
| Report Gate | 只允许关联到具体场景、层级、观察和限制的结论进入报告。 | 报告字段不能生成运行事实。 |

## 教学案例、图示与示例计划

教学案例延续第 30 章的虚构登录场景。第一条计划以 API Contract Check 区分成功、认证拒绝和服务错误；第二条计划以 UI Flow Evidence 检查输入、提交与动作后的用户可见状态。两条计划共享场景标识，但不共享“通过”结论：API 结果不能直接充当浏览器重新观察，浏览器可见成功也不能替代接口契约的错误分类。

后续图示应展示 Test Evidence Plan 如何分别流向受控 API 检查与 UI 流程检查，再将对应的 Observation Record 汇入 Report Gate；图中必须保留 API 200、fixture／monkeypatch、Browser Context、locator、可重试断言与最终业务成功之间的断点。

后续最小示例应只评估注入的 Test Evidence Plan，例如检查同一场景是否同时声明 API 契约、UI 前后观察、隔离边界和报告限制。Example Implementation 阶段才决定是否建立纯内存实现与测试；本阶段没有创建 Python 测试、Playwright 测试、浏览器会话、HTTP 请求、账户、凭证或报告。

## 风险、非范围与后续核验

- 不将 HTTP 200、fixture 成功创建、`monkeypatch` 撤销、locator 解析或单条断言通过写成完整用户登录成功。
- 不记录或使用真实 URL、账户、密码、token、cookie、浏览器 profile、接口响应、屏幕截图或 CI 输出。
- 不把 Playwright 的 Browser Context 隔离外推为跨系统授权、数据库回滚、第三方会话清理或测试数据治理。
- `TODO(verify)：` First Draft 写作当天重读 pytest fixture／monkeypatch 及 Playwright Browser Context、locator、assertion 页面，核对版本化命令、默认 timeout、运行器与浏览器支持；未核验前不得写为固定事实。
- `TODO(verify)：` Example Implementation 前先确认本仓已有的 Python／Playwright 运行环境、依赖锁定与可用目标；没有受控目标时，示例必须保持纯内存且说明未运行边界。

## 下一阶段

Chapter Outline 应把 API 契约、UI 前后观察、fixture／替身恢复、Browser Context、定位、异步断言、失败分类和报告门拆成逐节问题，并为每节给出允许来源、最小证据和不能主张的结论。
