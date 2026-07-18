---
chapter: "35"
type: "technical-review"
status: "needs-shared-glossary-follow-up"
reviewed_at: "2026-07-16"
---

# 第 35 章 Technical Review：企业级 Harness 架构

## 审查范围

- 工件：`docs/part-05-case-studies/35-enterprise-harness-architecture.md`、本章 Research Brief／参考资料／Outline，以及第 34、36 章正文的衔接段。
- 审查类型：技术、来源范围、术语、阶段状态与相邻章节边界。
- 使用的规则与来源：`BOOK_RULES.md`、`.ai/review-checklist.md`、CH35-REF-01 至 CH35-REF-04（REF-110 至 REF-113），以及 2026-07-16 写作日对四项官方页面的重新读取。

## 结论

`需主线程收口`。第 35 章正文对四项来源的可归因陈述、六项本书模型、虚构三阶段案例与未执行边界均已分开；正文只需把测试表的阶段时态改为本次审阅已完成。全局术语表尚缺六个本章术语，必须由拥有共享文件权限的主线程登记后再把本章视为术语一致。

## 来源与正文核对

| 来源 | 本次重读确认的受限陈述 | 正文处理 | 不可外推 |
| --- | --- | --- | --- |
| REF-110 — NIST SP 800-207 | 不因物理／网络位置或资产所有权授予隐式信任；主体与设备认证、授权是建立企业资源会话前的离散功能。 | 仅作为“内网位置不能代替资源级判断”的背景。 | 具体身份流程、控制字段、部署或合规结论。 |
| REF-111 — Kubernetes Multi-tenancy | 共享集群存在安全、公平性和 noisy-neighbor 挑战；租户定义随使用场景变化，RBAC、配额与网络策略属于其共享集群语境。 | 仅用于要求先定义租户语义、隔离目标和资源竞争。 | Kubernetes 为必选运行时，或任一机制构成充分隔离。 |
| REF-112 — OPA Philosophy | 策略是约束软件服务行为的规则；OPA 可将策略与服务解耦，服务以查询让 OPA 对策略和数据求值。 | 仅用于说明策略决定可与执行器实现分开。 | OPA／Rego／sidecar／远程加载已采用，或策略正确、安全、自动授权、合规。 |
| REF-113 — OpenTelemetry Traces | trace 由有关联的 span 表示；span context 有 trace ID 与 span ID；上下文传播可将不同位置产生的 span 关联成 trace。 | 仅用于说明控制、执行与人工处理之间需要可关联标识。 | 完整日志、审计充分性、不可抵赖、数据保留或遥测已采集。 |

## 已核对的分层与衔接

- 企业控制平面、执行平面、策略决定记录、租户与数据边界、关联观察记录和人工升级门均明确为本书工程模型；虚构知识助手的只读试点、候选生成与有限更新也没有被归因给四项来源。
- 正文反复保留“策略允许不等于执行／业务效果”“关联不等于审计”的断点；没有把 NIST、Kubernetes、OPA 或 OpenTelemetry 写成真实部署、认证、集群、Collector、工单、预算、审批或合规证据。
- 第 34 章已将跨团队／跨租户的身份、策略、隔离、预算、审计与人工升级留给第 35 章；第 35 章把模式抽象留给第 36 章。两个方向都没有倒置为真实企业运行结论。

## 必须由主线程修复的共享项

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `.ai/glossary.md` | 缺少第 35 章的六个核心术语。 | `BOOK_RULES.md` 要求以全局术语表为准；正文首现已在第 39、41–43、142 行采用中文（English）。 | 登记 Enterprise Control Plane、Execution Plane、Policy Decision Record、Tenant and Data Boundary、Correlated Observation Record 与 Human Escalation Gate，并保持本章现有中文译名。 |

## 本章已修复项

| 位置 | 问题 | 最小修复 |
| --- | --- | --- |
| `35-enterprise-harness-architecture.md` 的“测试与验证” | 仍写“处于 First Draft 阶段”与“后续 Technical Review”，与本次已完成的来源复核不一致。 | 改为本章已完成 First Draft、正在完成 Technical Review，并如实记录 2026-07-16 的四项官方资料重读。 |

## 已执行验证与未验证范围

- 已执行（写作日来源复核）：读取 NIST SP 800-207、Kubernetes Multi-tenancy、OPA Philosophy、OpenTelemetry Traces 的官方页面；结论见上表。
- 已执行（定向文档校验）：`./node_modules/.bin/markdownlint-cli2 docs/part-05-case-studies/35-enterprise-harness-architecture.md .memory/reviews/2026-07-16-chapter-35-technical-review.md`，退出码 0，检查 2 个文件、0 个错误；`git diff --check -- docs/part-05-case-studies/35-enterprise-harness-architecture.md .memory/reviews/2026-07-16-chapter-35-technical-review.md`，退出码 0、无输出。
- 未执行：不运行企业目录、身份提供方、Kubernetes、OPA、OpenTelemetry、云账户、工单系统、知识库、审计、网络、凭证、审批或外部系统；也未建立或运行本章计划中的纯内存示例、图示或端到端验证。
