---
title: "第 41 章技术审查：安全、权限与审计"
chapter: "41"
status: "completed"
updated_at: "2026-07-17"
---

# 第 41 章技术审查：安全、权限与审计

## 审查范围

- **工件：** 第 41 章正文、Research Brief、候选参考资料与详细 Outline。
- **审查类型：** 技术、来源外推、术语、相邻章节职责、状态时态、安全与敏感数据边界。
- **规则：** `BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/research-policy.md`、`.ai/glossary.md` 与 `.ai/review-checklist.md`。
- **相邻章节：** 第 40 章的资源约束与第 42 章的版本、比较和回滚职责。
- **来源访问日期：** 2026-07-17。

## 结论

`可合并`，限于本章正文与本技术审查记录。

正文已经把来源事实、本书工程模型和虚构恶意网页案例分开。技术审查核对了 NIST 发布页、正式引用映射、缩略词首现和阶段时态；Fact Check 后续将版本表述收紧为“发布页列出 Release 5.2.0 补充材料，AC-6/AU-3 核验自 Rev. 5 原始 PDF”。没有发现需要改变章节结构或扩大后续实现范围的问题。

该结论不表示提示注入已被阻断、权限已被强制、秘密已被保护、MCP 已连接、审计记录已写入、供应链已验证或安全事件已处置。

## 动态来源与明确版本复核

| 编号 | 来源与复核结果 | 正文允许使用 | 禁止外推 |
| --- | --- | --- | --- |
| TR-41-01 | OWASP LLM Prompt Injection Prevention 动态页仍区分直接与远程／间接提示注入，并列出输入检查、指令与数据分离、输出验证、最小权限和高风险人工监督。 | 支持提示注入需要纵深防御，以及外部内容不能自动成为控制指令。 | 单一过滤器、结构化提示、另一只模型或人工节点能够保证阻断攻击。 |
| TR-41-02 | OWASP Secrets Management 动态页仍讨论细粒度访问、创建、轮换、撤销、过期和审计，并明确秘密不应以明文进入日志。 | 支持 Secret Reference Card 的生命周期和最小暴露背景。 | 本章已部署秘密管理器、固定轮换周期、撤销或事件响应。 |
| TR-41-03 | OWASP Logging 动态页仍要求日志回答 when/where/who/what、保存交互关联，并排除或脱敏 token、密码、密钥；同时要求防日志注入和未授权读取、修改、删除。 | 支持 Audit Event Envelope 的最小字段、脱敏和日志自身保护边界。 | 记录越多越安全、字段齐全即不可篡改、满足取证或法规要求。 |
| TR-41-04 | MCP Security Best Practices 动态页仍包含 confused deputy、token passthrough、SSRF、本地 MCP Server 与 scope 最小化；页面明确禁止接受未发给目标 Server 的 token，并建议渐进、最小 scope 与提升事件关联。 | 作为 MCP 协议特定的授权、网络、进程和同意风险背景。 | MCP 资料替代其他协议、OAuth、源系统授权、沙箱或完整威胁模型。 |
| TR-41-05 | NIST SP 800-53 Rev. 5 官方页将 Release 5.2.0 列为补充材料；Rev. 5 原始 PDF 的 AC-6 要求只允许完成组织任务所需的已授权访问，AU-3 列出事件类型、时间、位置、来源、结果和关联主体／对象，并提示隐私风险。 | 作为最小权限与审计事件内容的控制背景，并分开发布页信息与原始控制文本。 | 本书字段等同 NIST 控制实施、评估、认证、身份真实性或不可抵赖性。 |
| TR-41-06 | SLSA 规范索引明确当前复核的是 Version 1.2；v1.2 威胁概览覆盖生产者、编写／审查、源码、构建、发布、分发、包选择和依赖，并明确没有覆盖列出的全部威胁。 | 支持端到端供应链视角和 `knownGaps`。 | provenance 或某个 SLSA 级别证明生产者可信、依赖无漏洞或 Agent 行为安全。 |
| TR-41-07 | NIST SP 800-61 Rev. 3 官方最终出版物日期为 2025 年 4 月，并将事件响应建议放入 CSF 2.0 风险管理活动，连接准备、检测、响应和恢复。 | 支持安全事件进入持续风险管理和具名交接。 | 固定步骤、角色、通知时限、取证方法、监管义务或真实遏制状态。 |

Research Brief 与候选参考资料保留 CH41-REF-01 至 CH41-REF-07 的研究期键；正文从本阶段起使用已登记的 REF-125、REF-126、REF-127、REF-128、REF-086、REF-129 与 REF-130。

## 本书安全工件职责复核

| 本书工件 | 唯一职责 | 必须保留的断点 | 审查结论 |
| --- | --- | --- | --- |
| Harness Threat Model | 固定资产、入口、信任边界、攻击者能力、允许效果、证据缺口和保守出口。 | 威胁模型不等于扫描、控制实施或风险接受。 | 通过。 |
| Untrusted Content Envelope | 保存外部内容来源、允许用途、任务关联和证据限制。 | `content_labeled_untrusted ≠ injection_blocked`。 | 通过。 |
| Capability Grant Record | 把工具可见性与当前任务允许的主体、目标、动作和数据范围分开。 | 记录存在不等于 token 已发放或源系统已授权。 | 通过。 |
| Security Decision Record | 保存策略版本、决定、限制、理由、批准和刷新条件。 | `policy_allowed ≠ action_executed`。 | 通过。 |
| Secret Reference Card | 只让上下文看到秘密引用与生命周期元数据。 | 引用存在不等于秘密可取用、未过期或已撤销。 | 通过。 |
| Tool Security Gate | 在候选调用前检查工具来源、目标、参数、网络、凭证受众、进程、同意与观察计划。 | schema 合法不等于调用安全；MCP 案例不外推到其他协议。 | 通过。 |
| Audit Event Envelope | 用最小字段关联请求、决定、尝试、结果和证据限制。 | `audit_event_written ≠ audit_sufficient`；关联标识不证明身份、完整性或因果。 | 通过。 |
| Harness Supply-chain Register | 登记规则、技能、钩子、Server、适配器、依赖、配置和构建／分发证据。 | 可追溯不等于生产者可信或运行时安全。 | 通过。 |
| Security Incident Handoff | 在异常时保存最小证据、未知影响、停止状态和具名责任入口。 | `incident_handoff_created ≠ incident_contained`。 | 通过。 |

## 案例、安全与后续工件边界

- 恶意网页案例保持虚构：没有目标网页、真实恶意样本、模型调用、浏览器、文件、网络、秘密、MCP、身份、权限、日志或事件响应系统。
- 正常资料候选和恶意操作请求分开路由：前者仍需事实核验，后者因任务、目标、秘密或工具边界不匹配而停止；拒绝不证明攻击者身份或平台控制有效。
- 审计事件只记录受控引用、类别、原因、结果限制和脱敏状态，不复制 token、密码、密钥、连接串、完整提示、整页内容或不必要个人数据。
- 发现秘密疑似暴露只创建 Handoff 教学对象；撤销、轮换、隔离、通知、取证、恢复和复盘仍属于真实系统与具名责任人。
- 第 40 章负责资源预算与测量，第 42 章负责版本身份、比较、有限暴露和回滚；第 41 章没有复制这些模型，也没有提前创建发布、回滚或实验工件。
- Example Implementation 仍只计划纯内存 `assessResearchSecurityPlan(input)`；本阶段没有创建模块、测试、演示或 npm 入口。
- Diagram Review 仍只保留图示契约；本阶段没有创建 Mermaid、SVG 或 PNG。

## 已修复问题

| 位置 | 问题 | 最小修复 |
| --- | --- | --- |
| Front matter 与正文引用 | First Draft 仍使用 CH41 局部键，未反映全局引用已经登记。 | 改为 REF-125、REF-126、REF-127、REF-128、REF-086、REF-129、REF-130，并保留研究期映射说明。 |
| NIST AC-6／AU-3 | 正文只写 Rev. 5，没有交代发布页所列 Release 5.2.0 补充材料。 | 在首次引用中交代补充材料，并明确 AC-6/AU-3 核验自 Rev. 5 原始 PDF；保留“控制背景而非实施证明”的限制。 |
| SLSA 版本 | 威胁页 URL 指向 v1.2，但正文未说明规范索引已确认 Version 1.2。 | 改为“SLSA 供应链安全规范 v1.2”，并将 provenance 首现写为“来源证明（provenance）”。 |
| 术语首现 | MCP、Skill、RBAC、ABAC、SIEM、API、URL、DNS 与 Hook 的首现不完整。 | 按项目风格补充中文、英文或缩略词全称；后续不重复展开。 |
| 阶段时态 | 图示、示例、验证表和完成说明仍停留在 First Draft 口吻。 | 改为“截至 Technical Review”，并勾选 Technical Review 完成项。 |

## 必须修复

上述必须修复项均已在正文完成。当前没有未解决的 `must_fix`。

## 应该修复

当前没有未解决的 `should_fix`。Research Brief 和候选参考资料是研究阶段快照，其中关于 NIST Release 5.2.0 的旧时态留待 Fact Check 统一复核；本次按任务边界没有改写研究工件。

## 建议

- Fact Check 再次重读动态 OWASP、MCP 与 SLSA 页面，并确认 REF-125 至 REF-130 的正式登记没有变化。
- Example Implementation 对任何疑似秘密只检查注入的教学分类或明确测试标记，不加入真实 secret scanner、网络或文件读取。
- Diagram Review 逐箭头核对五个责任断点，不把 `allowed`、`returned`、`logged` 或 `handoff_created` 画成外部成功。

## 已执行验证与未验证范围

- 已重读项目规则、术语表、审查清单、第 40、42 章与第 41 章 Research／references／Outline／正文。
- 已于 2026-07-17 读取 OWASP Prompt Injection、Secrets Management、Logging，MCP Security Best Practices，SLSA v1.2 索引和威胁概览，以及 NIST SP 800-53 Rev. 5、SP 800-61 Rev. 3 官方资料。
- 已直接核对 NIST Rev. 5 原始 PDF 中的 AC-6 与 AU-3，并核对发布页列出的 Release 5.2.0 补充材料；该核对不构成控制评估或合规审查。
- 没有运行真实提示注入攻击、模型、浏览器、文件、网络、OAuth、MCP、秘密管理、身份、权限、日志、SIEM、供应链验证或事件响应系统。
- `npx --no-install markdownlint-cli2` 定向检查正文与本记录，退出码 0，0 个错误。
- Node 定向检查正文与本记录，退出码 0；两个文件均非空、具有文件尾换行且没有行尾空白。
- `git diff --check` 退出码 0；该命令不检查未跟踪文件，因此本记录另由上述 Markdown lint 与空白检查覆盖。
