---
title: "第 12 章候选参考资料：Environment、Sandbox 与权限"
chapter: "12"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 12 章候选参考资料：Environment、Sandbox 与权限

> 本清单保留第 12 章研究阶段使用的本地键；正式引用已经登记到全局 `.ai/references.md`。本地键只用于历史追溯，正文和发布工件应使用对应 `REF-*` 编号，且仍只支持本章中带产品主语的限定陈述。

| 本地键 | 正式引用 | 来源 | 类型 | 可支持的限定陈述 | 不能支持的陈述 | 访问日期 |
| --- | --- | --- | --- | --- | --- | --- |
| C12-REF-001 | REF-040 | [OpenAI：GPT-5.2-Codex cybersecurity](https://deploymentsafety.openai.com/gpt-5-2-codex/cybersecurity) | 官方产品安全说明 | 云端隔离容器、默认网络限制、工作区文件编辑限制，以及需要时由用户批准非沙箱命令。 | 跨平台默认配置、所有 Codex 部署行为、其他 Agent 的安全保证。 | 2026-07-16 |
| C12-REF-002 | REF-041 | [Docker Engine security](https://docs.docker.com/engine/security/) | 官方产品文档 | Docker 文档中 namespace、cgroup、capability 的作用范围；移除未明确需要 capability 的建议。 | 容器的绝对隔离、任意 host 或 orchestrator 的默认安全性。 | 2026-07-16 |
| C12-REF-003 | REF-042 | [Kubernetes RBAC API reference](https://kubernetes.io/docs/reference/kubernetes-api/rbac/) | 官方 API 参考 | Role、RoleBinding、ClusterRole、ClusterRoleBinding，以及 namespace 内 RoleBinding 的作用范围。 | 通用 RBAC 继承规则、应用业务授权或审计完整性。 | 2026-07-16 |
| C12-REF-004 | REF-043 | [GitHub Actions workflow syntax：permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?apiVersion=2022-11-28) | 官方产品文档 | workflow/job 层权限设置、`read`/`write`/`none` 的配置语义，以及指定权限时未指定范围为 `none`。 | 任何仓库的默认权限、触发器行为、第三方 action 或其他 CI 的安全性。 | 2026-07-16 |
| C12-REF-005 | REF-044 | [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | 官方安全建议 | 默认限制 `GITHUB_TOKEN` 并按 job 增加最小必要权限的建议。 | 足以解决供应链、提示注入、secret 泄漏或生产发布风险。 | 2026-07-16 |

## 写作前复核事项

- 每次修订 REF-040 至 REF-044 的限定陈述，均在同日重新读取官方页面，并记录页面范围而不是沿用搜索摘要。
- 若正文要使用具体版本、默认 scope、平台实现、命令、API 字段、产品配置、计费或性能承诺，必须另行取证；本章不以候选资料推测这些细节。
- 真正接入文件、网络、凭证、CI、容器、Kubernetes、云账户或生产环境时，需要独立的实现资料、审批记录、环境观察和回读证据。

## 引用使用约束

- 环境契约、权限阶梯、环境准入记录、效果类别和教学拒绝代码是本书工程模型。
- “环境允许”“获得批准”“具备 token”“命令退出为 0”“目标被回读”和“业务验收通过”不是同义词。
- 本章与第 11、14、17 章的分工不得混淆：Tool Contract 描述调用接口，Human-in-the-loop 讨论责任和确认，Evaluation 判断结果是否满足任务。
