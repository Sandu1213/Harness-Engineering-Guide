---
title: "第 35 章参考资料：企业级 Harness 架构"
chapter: "35"
status: "registered"
updated_at: "2026-07-16"
---

# 第 35 章参考资料：企业级 Harness 架构

> 本地 `CH35-REF-*` 键用于章节内追溯，已依次登记为 REF-110、REF-111、REF-112、REF-113。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- |
| CH35-REF-01 | [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) | NIST 最终出版物，2020-08 | 零信任将保护重点从静态网络边界转向用户、资产和资源；不按位置或资产所有权给予隐式信任，主体和设备的认证/授权在资源会话前是离散功能。 | 2026-07-16：写作日重读；已登记为 REF-110。 | 任何零信任实施细节、字段、审批策略、合规状态或本章系统已部署。 |
| CH35-REF-02 | [Kubernetes Documentation: Multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) | Kubernetes 官方文档 | 共享集群有成本与管理收益，也有安全、公平性和 noisy-neighbor 挑战；租户定义依场景变化，文档在共享集群语境讨论 RBAC、配额和网络策略。 | 2026-07-16：写作日重读；已登记为 REF-111。 | Kubernetes 是必选运行时，或这些机制对任意 Harness/组织提供充分隔离。 |
| CH35-REF-03 | [Open Policy Agent Documentation: Philosophy](https://www.openpolicyagent.org/docs/latest/philosophy/) | OPA 官方文档 | 策略是约束软件服务行为的规则；OPA 可将策略与受其约束的服务解耦，服务以查询让 OPA 对策略和数据求值。 | 2026-07-16：写作日重读；已登记为 REF-112。 | Rego、sidecar、远程策略加载、自动授权、正确性、安全性、数据新鲜度或合规。 |
| CH35-REF-04 | [OpenTelemetry Documentation: Traces](https://opentelemetry.io/docs/concepts/signals/traces/) | OpenTelemetry 官方文档 | span 是工作单元；span context 含 trace ID 和 span ID；上下文传播能关联不同位置产生的 span 并组成 trace。 | 2026-07-16：写作日重读；已登记为 REF-113。 | trace 等于完整日志、审计记录、不可抵赖性、数据保留、取证或任何遥测已经采集。 |

## 写作规则

- 四项资料只支持本表中的限定陈述。企业控制平面、执行平面、策略决定记录、租户与数据边界、关联观察记录、人工升级门和分阶段案例均是本书工程模型。
- 本章不承诺或描述真实身份提供方、策略引擎、Kubernetes 集群、OPA 部署、OpenTelemetry Collector、云资源、队列、工单系统、租户、预算、成本、日志、追踪、审批或合规审计已运行。
- 后续写入任何具体产品版本、配置、API、默认行为、价格、隔离强度、保留期限、法规适用性或审计要求前，必须在写作当天重新核验相应的一手资料，并把受限结论登记到全局引用表。
