---
title: "第 32 章事实核验：自动分析失败并修复 Bug"
chapter: "32"
status: "completed"
updated_at: "2026-07-16"
---

# 第 32 章事实核验：自动分析失败并修复 Bug

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | Delta Debugging 可将仍触发失败的样例逐步简化为最小失败样例；存在通过与失败样例时，可隔离两者之间诱发失败的差异。 | REF-098，2026-07-16 重读 Zeller 与 Hildebrandt 的原始论文。 | 可作为失败样例最小化和通过／失败差异隔离的研究背景；论文案例、试验次数和耗时不用于推断本章或任意项目的成本、可用性或根因证明。 |
| FC-02 | 有效排障可从观察和系统理解形成候选原因，再通过支持／反证检查或受控改变更新判断。 | REF-099，2026-07-16 重读 Google SRE《Effective Troubleshooting》。 | 可作为症状、预期／实际、假设、检查和负面结果记录的工程背景；不是固定排障流程、严重性标准、自动根因分析或权限授权。 |
| FC-03 | Git `bisect` 在有可辨认的 good/bad 提交边界时测试中间提交，并报告第一个 bad 提交；不可测试的提交可被跳过，因而可能无法精确定位第一个 bad 提交。 | REF-100，2026-07-16 重读 Git 官方 `git-bisect` 参考。 | 可作为历史变化区间缩小的 Git 特定行为；第一个 bad 提交只提供待检查变化，不证明机制、根因、工作树许可或应修改的补丁。 |
| FC-04 | Playwright 会在动作前等待相关 actionability 条件；例如 `locator.click()` 要求唯一目标、可见、稳定、接收事件和启用，超时则以 `TimeoutError` 失败。 | REF-081，2026-07-16 重读 Playwright actionability 官方文档。 | 可作为虚构 UI 等待问题的产品特定背景；不证明本章运行了 Playwright、目标业务状态正确、定位器语义正确或等待问题是实际根因。 |

CH32-REF-01 至 CH32-REF-04 分别映射 REF-098、REF-099、REF-100、REF-081。上述映射只支持本表列出的有限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-01 | Bug Investigation、Reproduction Contract、Hypothesis Record、Falsifiable Check、Fix Candidate、Regression Gate 与 Escalation Record。 | 是本书为调查准入和证据路由提出的模型，不称为 Delta Debugging、Google SRE、Git 或 Playwright 的固定 schema。 |
| EM-02 | 虚构网页登录检查中“提交后未观察到预期可见状态”的症状与两条竞争假设。 | 是教学输入，不代表真实网页、账户、服务、数据、超时、测试或日志。 |
| EM-03 | `ready`、`stopped`、`requires_approval` 与 `executionPerformed: false`。 | 是纯内存准入器的返回合同；不构成修复、测试、环境执行、发布、权限或验收结论。 |
| EM-04 | Mermaid 图的症状—复现—最小化—假设—检查—候选修复—回归门链。 | 只表达本书的保守调查和升级路线，不表示 Git、浏览器、API、测试或补丁已执行。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-05 | `node --test examples/agent/bug-investigation-assessment.test.mjs`（实现前） | 退出失败，`ERR_MODULE_NOT_FOUND`，因为被测模块尚未创建。 | 红灯在实现前真实出现；不代表任何真实 Bug、pytest、Playwright、浏览器、API 或 Git 失败。 |
| FC-06 | `npm run test:bug-investigation-assessment` | 8 项通过、0 项失败。 | 纯函数在测试构造的调查对象上按合同分类。 |
| FC-07 | `npm run example:bug-investigation-assessment` | 输出 `ready`、`bug_investigation_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。 | 演示对象是可开始隔离实现的教学计划；没有执行 Bug 修复、测试框架、浏览器、API 或 Git。 |

## 明确未核验或不覆盖的范围

- 未创建、复现、最小化或修复任何真实缺陷；未运行 pytest、Playwright、浏览器、HTTP 服务、数据库、网络、账户、凭证、Git `bisect`、CI、补丁写入或发布。
- 未验证真实 UI 的可见性、稳定性、接收事件、业务状态、用户流程、性能、并发稳定性、浏览器兼容性、安全性、回归覆盖或发布结果。
- 未将 Delta Debugging 的研究案例、Google SRE 的工程建议、Git 的历史定位或 Playwright 的 actionability 条件拼接成自动修复或跨工具保证。
