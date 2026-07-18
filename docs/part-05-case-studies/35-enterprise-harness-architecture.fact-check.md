---
title: "第 35 章事实核验：企业级 Harness 架构"
chapter: "35"
status: "completed"
updated_at: "2026-07-16"
---

# 第 35 章事实核验：企业级 Harness 架构

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | NIST SP 800-207 将零信任的保护重点从静态网络边界移向用户、资产和资源；它不因物理或网络位置、资产所有权给予隐式信任，并将主体和设备的认证、授权置于建立企业资源会话前的离散功能中。 | REF-110，2026-07-16 通过 AgentReach 的网页读取路径重读 NIST 原始出版页面。 | 可作为“内网位置不等于某个资源能力获准”的受限背景；不支持控制平面字段、身份流程、产品部署或合规结论。 |
| FC-02 | Kubernetes 的多租户文档说明，共享集群虽可节省成本并简化管理，也有安全、公平性和 noisy-neighbor 挑战；“tenant”的定义随多团队或多客户等场景而变化。 | REF-111，2026-07-16 通过 AgentReach 的网页读取路径重读 Kubernetes 官方文档。 | 可作为先定义租户语义、隔离目标与资源竞争的受限背景；不支持 Kubernetes 是必选运行时，或 RBAC、配额、网络策略为任意 Harness 提供充分隔离。 |
| FC-03 | OPA 将 policy 描述为约束软件服务行为的规则，并支持把策略与服务解耦；服务通过查询让 OPA 对策略和数据求值得到结果。 | REF-112，2026-07-16 通过 AgentReach 的网页读取路径重读 OPA 官方 Philosophy 文档。 | 可作为把策略决定与执行器实现分开的受限背景；不支持本章采用 OPA、Rego、sidecar、远程加载、自动授权、策略正确性、安全性或合规。 |
| FC-04 | OpenTelemetry 的 trace 用于描述请求在应用中的路径；span 是其工作单元，span context 包含 trace ID 与 span ID；上下文传播可将不同位置生成的 span 关联并组装为 trace。 | REF-113，2026-07-16 通过 AgentReach 的网页读取路径重读 OpenTelemetry 官方 traces 文档。 | 可作为需要可关联标识的受限背景；不支持日志完整、遥测已采集、审计充分、不可抵赖、保留期限或业务效果结论。 |

CH35-REF-01 至 CH35-REF-04 分别映射 REF-110、REF-111、REF-112、REF-113。上述映射只支持本表列出的有限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-01 | 企业控制平面、执行平面、策略决定记录、租户与数据边界、关联观察记录与人工升级门。 | 是本书用于分离责任和结论范围的模型，不是 NIST、Kubernetes、OPA 或 OpenTelemetry 的固定 schema、产品接口或部署蓝图。 |
| EM-02 | `request_received`、`policy_allowed`、`execution_observed` 与 `business_effect_verified` 的结论表。 | 是本书的教学结论模型，不是任何审计标准、状态机或产品 API。 |
| EM-03 | 三阶段虚构知识助手和只读、草稿、有限更新的升级路线。 | 不代表真实企业、工单、知识库、账户、审批、预算、遥测或数据边界。 |
| EM-04 | `ready`、`stopped`、`requires_approval` 与 `executionPerformed: false`。 | 是纯内存评估器的返回合同，不构成真实策略决定、授权、执行、观察、人工批准或业务效果。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-05 | `node --test examples/agent/enterprise-harness-admission-assessment.test.mjs` | 退出码 0；9 项通过、0 项失败。 | 纯函数在测试构造的教学对象上按合同分类完整只读候选和保守升级路径。 |
| FC-06 | `node examples/agent/enterprise-harness-admission-assessment.mjs` | 退出码 0；输出 `ready`、`enterprise_read_only_candidate_ready`、`continue_read_only_candidate` 与 `executionPerformed: false`。 | 演示对象可进入受限只读候选路径；没有执行企业目录、身份、策略、预算、追踪、人工审批或外部动作。 |

## 明确未核验或不覆盖的范围

- 未部署或运行企业目录、身份提供方、Kubernetes、OPA、OpenTelemetry、云账户、队列、工单系统、知识库、审计、网络、凭证、API、人工审批或任何外部系统。
- 未验证真实身份认证、资源授权、租户隔离、策略数据新鲜度、预算计量、遥测采集、审计保留、法律合规、业务效果、性能、并发、故障恢复、回滚或发布。
- 未把四项来源的受限背景拼接为跨产品的自动化、隔离、合规、审计或效果保证。
