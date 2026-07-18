---
title: "第 12 章事实核验清单：Environment、Sandbox 与权限"
chapter: "12"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 12 章事实核验清单：Environment、Sandbox 与权限

## 核验范围

本清单覆盖正文中关于 GPT-5.2-Codex、Docker、Kubernetes RBAC 和 GitHub Actions 的限定陈述，以及纯内存示例与 Mermaid 图的边界。它不验证真实环境、沙箱、容器、网络、凭证、身份、审批、部署、审计或业务结果。

## 来源级核验

| 正式引用 | 写作日已读取的来源 | 正文允许陈述 | 禁止外推 |
| --- | --- | --- | --- |
| REF-040 | [OpenAI：GPT-5.2-Codex cybersecurity](https://deploymentsafety.openai.com/gpt-5-2-codex/cybersecurity) | 该产品安全说明中的云端隔离容器、默认网络限制、工作区文件编辑限制与非沙箱命令的用户批准。 | 本仓库、其他 Codex 部署、其他 Agent 或平台具有相同行为。 |
| REF-041 | [Docker Engine security](https://docs.docker.com/engine/security/) | Docker 安全语境中的 namespace、cgroup、capability 及移除未明确需要 capability 的建议。 | 容器天然隔离、任何 host/orchestrator 默认安全，或本书矩阵必须映射到 capability。 |
| REF-042 | [Kubernetes RBAC API reference](https://kubernetes.io/docs/reference/kubernetes-api/rbac/) | RoleBinding 在其 namespace 内生效，并可引用 Role 或 ClusterRole 的限定例子。 | 通用 RBAC 继承规则、应用业务授权或审计完整性。 |
| REF-043 | [GitHub Actions workflow syntax：permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?apiVersion=2022-11-28) | workflow/job 层 `GITHUB_TOKEN` 权限和指定任一权限时未声明范围为 `none` 的产品语义。 | 任意仓库默认权限、触发器行为、第三方 Action 或其他 CI 的安全性。 |
| REF-044 | [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | 默认限制 `GITHUB_TOKEN` 并按 job 增加最小必要访问的安全建议。 | 该建议可单独消除供应链、提示注入、secret 泄漏或生产发布风险。 |

上述来源于 2026-07-16 的 Research、Technical Review 与 Fact Check 阶段实际读取；每次改写动态产品资料时必须在当天重新读取官方页。原始阅读记录见[第 12 章 Fact Check 审查](../../.memory/reviews/2026-07-16-chapter-12-fact-check.md)。

## 本书模型与事实的分界

| 内容 | 分类 | 处理结果 |
| --- | --- | --- |
| 环境契约、环境准入记录、权限阶梯和教学 profile | 本书工程模型 | 不归因给任何平台配置格式。 |
| `allowed`、`blocked`、`requires_approval` 与返回代码 | 纯内存教学状态 | 不代表真实授权、动作执行或结果验收。 |
| `assessEnvironmentAccess` | 纯内存教学函数 | 只比较注入任务、环境、policy 和批准快照。 |
| Environment Contract 图及 SVG/PNG | 本书图示 | 可读图不证明真实环境或控制面行为。 |

## 示例与图示复核

2026-07-16 已实际运行：

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
node examples/agent/environment-sandbox-assessment.mjs
```

交叉审查补齐目标范围准入后，前者为 8 项 Node 内置测试通过、0 项失败；后者输出 `allowed` / `environment_admission_allowed` / `inspect-preview`。这些结果只验证注入教学对象的判断，不验证真实 Sandbox、权限、目标、凭证或外部效果。

Mermaid 图已导出 SVG/PNG 并实际查看；正文 Mermaid 块与图源以 `diff -u` 比较无差异。渲染和可读性只说明本书图源可用，不证明任何真实平台、网络、部署或审计行为。

## 动态资料与后续取证

- `TODO(verify)：` 若正文写入具体产品版本、默认配置、命令、API 字段、限额、价格或实际安全承诺，必须在写作日以对应官方页重新取证。
- `TODO(verify)：` 接入真实容器、Kubernetes、GitHub Actions、CI、secret、网络、云账户或生产目标前，必须另行记录组织授权、配置、观察、回读和验收证据。
- 未验证的隔离强度、权限覆盖率、攻击面、延迟、成本、可用性或合规结论不得写入正文。

## 完成检查

- [x] REF-040 至 REF-044 已映射到具体来源、限定用途与外推禁区。
- [x] 产品资料、本书模型、纯内存示例和图示没有混为同一事实层级。
- [x] 动态来源与未来真实集成的重新取证要求已记录。
- [x] 没有把测试、演示或 Mermaid 渲染写成真实环境、权限或部署证据。
