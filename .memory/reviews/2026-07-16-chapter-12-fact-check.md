---
chapter: "12-environment-sandbox-and-permissions"
stage: "Fact Check"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 12 章 Fact Check：Environment、Sandbox 与权限

## 事实范围与结论

| 正文陈述 | 直接来源 | 访问日期 | 结论与写作限制 |
| --- | --- | --- | --- |
| OpenAI 的 GPT-5.2-Codex 安全说明描述云端隔离容器、默认网络限制、工作区文件编辑限制，以及由用户批准非沙箱命令。 | [C12-REF-001](https://deploymentsafety.openai.com/gpt-5-2-codex/cybersecurity) | 2026-07-16 | 已验证。仅保留为 OpenAI 产品的限定描述；不引用其配置字段，不外推到本仓库或其他 Agent。 |
| Docker 文档说明 container 使用 namespace、cgroup 和 capability；capability 是细粒度控制的一部分，并建议移除进程未明确需要的 capability。 | [C12-REF-002](https://docs.docker.com/engine/security/) | 2026-07-16 | 已验证。保留“Docker 文档”“容器语境”和“不是绝对隔离”的限定。 |
| Kubernetes RoleBinding 可以引用同 namespace 的 Role 或全局 ClusterRole，并且仅在其 namespace 内有作用。 | [C12-REF-003](https://kubernetes.io/docs/reference/kubernetes-api/rbac/) | 2026-07-16 | 已验证。仅用来说明 scope 需要明确；不推导其他 RBAC 的继承或业务授权规则。 |
| GitHub Actions 可在 workflow 或 job 设置 `GITHUB_TOKEN` 权限；指定任一权限时，未指定权限为 `none`。 | [C12-REF-004](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?apiVersion=2022-11-28) | 2026-07-16 | 已验证。正文只讨论该产品的配置语义，不写任何仓库的默认权限或触发器保证。 |
| GitHub 建议默认只读并按 job 增加最小必要的 `GITHUB_TOKEN` 权限。 | [C12-REF-005](https://docs.github.com/en/actions/reference/security/secure-use) | 2026-07-16 | 已验证。保留为安全建议，不声称可单独解决所有 secret、供应链或发布风险。 |

## 本书模型与真实系统的分离

| 工件或术语 | 本章定位 | 不可声称 |
| --- | --- | --- |
| Environment Contract、环境阶梯与准入记录 | 本书工程模型。 | 是 Docker、Kubernetes、Codex 或 GitHub Actions 的实际 schema。 |
| `read_only`、`write`、`external` | 教学效果分类。 | 是操作系统、云 IAM 或业务系统的权限标准。 |
| `assessEnvironmentAccess` | 只判断注入对象。 | 验证真实 Sandbox、凭证、网络、源系统权限、审批、部署或审计。 |
| Mermaid 图及导出 | 本书准入模型的可读图。 | 证明产品行为、目标状态改变或结果验收。 |
| 部署教学案例 | 原创假设。 | 本仓库或任何服务发生过部署。 |

## 动态资料与未验证范围

- C12-REF-001 至 C12-REF-005 是产品/项目文档或安全说明，后续修订正文时必须在写作日重新读取相关页面。
- `TODO(verify)：` 若章节未来增加真实 Docker、Kubernetes、GitHub Actions、Codex、CI、网络或云配置，需要以具体版本和执行环境重新取证，不得复用本章背景资料或测试结果作为运行证明。
- 未核验默认策略、版本兼容性、命令行为、性能、价格、集群配置、token 生命周期、具体 secret 实现、平台审计属性或任何部署结果；正文没有把这些信息包装为事实。
