---
title: "第 12 章 Research Brief：Environment、Sandbox 与权限"
chapter: "12"
status: "research-complete"
sources:
  - "C12-REF-001"
  - "C12-REF-002"
  - "C12-REF-003"
  - "C12-REF-004"
  - "C12-REF-005"
updated_at: "2026-07-16"
---

# 第 12 章 Research Brief：Environment、Sandbox 与权限

## 研究目标

本章要让读者把“Agent 能提出一个动作”与“运行环境允许这个动作发生”分开。读者应能为同一任务区分 dry-run、测试环境与生产环境的权限边界，并在边界、凭证、网络、目标和批准证据不匹配时停止，而不是因为工具可见或命令可执行就默认放行。

本章提出的环境契约（Environment Contract）、权限阶梯与环境准入记录都是本书工程模型。它们不是 Docker、Kubernetes、GitHub Actions、Codex 或任何操作系统的配置格式，也不提供真实隔离、密钥管理或审计保证。

## 本章要回答的问题

1. 运行环境（Environment）、沙箱（Sandbox）、凭证（Credential）、源系统权限和人工批准各自回答什么问题？
2. 为什么“能在本机执行”不能推出“可以在测试或生产环境执行”？
3. 如何把文件系统、网络、凭证、目标范围和可产生的效果写进可审查的环境边界？
4. 为什么只读、受限写入、网络调用和生产发布需要不同的证据与升级路径？
5. dry-run 为何只能说明某种计划或预检查完成，不能替代真实写入后的回读和验收？
6. 怎样让环境拒绝、权限不足、批准缺失与动作失败在记录中保持可区分？

## 一手来源与允许用途

| ID | 来源明确表达的内容 | 本章允许用途 | 禁止外推 |
| --- | --- | --- | --- |
| C12-REF-001 | OpenAI 的 GPT-5.2-Codex 安全说明描述云端隔离容器、默认网络限制、工作区文件编辑限制，以及在需要时由用户批准非沙箱命令。 | 用作一个产品限定例子，区分技术边界和用户批准。 | 所有 Agent、操作系统或本仓库都具有相同隔离能力、默认策略、配置字段或审批流程。 |
| C12-REF-002 | Docker Engine 安全文档说明容器依赖内核 namespace、cgroup 与 capability 等机制；其建议是移除进程未明确需要的 capability。 | 用作容器环境中“最小能力”而非二元 root/non-root 的限定例子。 | 容器天然安全、能力移除能独自提供隔离、任何 Docker 默认值或配置适用于其他平台。 |
| C12-REF-003 | Kubernetes RBAC API 文档定义 Role、RoleBinding、ClusterRole 与 ClusterRoleBinding，并说明某命名空间的 RoleBinding 只在该命名空间内生效。 | 用作作用域受绑定对象限制的 RBAC 例子。 | 所有权限系统都有 namespace、RoleBinding 或相同继承语义。 |
| C12-REF-004 | GitHub Actions 的 workflow syntax 文档说明可在 workflow 或 job 层以 `permissions` 修改 `GITHUB_TOKEN` 的访问范围；指定任何权限后，未指定范围会被设为 `none`。 | 用作任务级凭证范围显式化的产品例子。 | 某个仓库的默认 token 范围、触发器行为、第三方 action 安全性或其他 CI 的权限模型。 |
| C12-REF-005 | GitHub 的 secure use 文档建议将 `GITHUB_TOKEN` 默认限制为仓库内容只读，并按 job 增加最小所需访问。 | 支持“默认收紧，再按任务增加最小权限”的 CI 实践。 | 该建议是唯一正确配置、能消除供应链风险，或代表所有凭证系统。 |

## 来源陈述与本书模型的分界

### 可由来源支持的最小陈述

- OpenAI 的 GPT-5.2-Codex 安全说明描述云端隔离容器、默认网络限制、工作区文件编辑限制，以及用户批准非沙箱命令的机制。[C12-REF-001](https://deploymentsafety.openai.com/gpt-5-2-codex/cybersecurity)
- Docker 文档将 Linux capability 作为细粒度权限机制的一部分，并建议移除进程不需要的 capability。[C12-REF-002](https://docs.docker.com/engine/security/)
- Kubernetes 的 RoleBinding 在所在 namespace 内发生作用；RoleBinding 可以引用 Role 或 ClusterRole。[C12-REF-003](https://kubernetes.io/docs/reference/kubernetes-api/rbac/)
- GitHub Actions 可在 workflow 或 job 层设置 `GITHUB_TOKEN` 权限；当配置中指定任何权限时，未指定权限会被设为 `none`。[C12-REF-004](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?apiVersion=2022-11-28)
- GitHub 建议默认收紧 token 并按 job 增加最小所需权限。[C12-REF-005](https://docs.github.com/en/actions/reference/security/secure-use)

### 本书工程扩展：Environment Contract

本书建议在一个动作进入运行环境前，形成一份环境契约（Environment Contract），至少记录：环境身份与用途、允许效果类别、可读写路径或资源范围、网络策略、凭证引用与允许作用域、目标范围、批准引用、观察要求和停止条件。契约只描述应当审查什么；它不会创建 sandbox、发放凭证、校验时间、阻止绕过或替代源系统授权。

## 范围与非目标

本章讨论任务与环境的准入边界、最小权限、dry-run、测试与生产分层、凭证范围、网络范围、确认门与审计记录。它不：

- 实现容器、虚拟机、操作系统隔离、网络代理、Kubernetes 集群、GitHub Actions workflow 或具体密钥管理产品；
- 定义第 11 章 Tool Contract 的参数、调用结果或效果不确定性协议；
- 定义第 14 章的责任归属、审批界面、组织升级规则或人工最终决策；
- 把环境允许解释为执行成功、目标状态正确、发布完成或业务验收通过；
- 给出可复制到真实生产环境的命令、默认 port、密钥格式、云账户策略或安全基线。

## 计划正文结构

1. **环境不是工具列表：** 解释动作候选、工具协议和可执行环境的边界。
2. **最小权限的五个维度：** 文件系统、网络、凭证、目标范围和效果类别。
3. **Sandbox 与批准的关系：** 技术限制不等于责任确认，批准也不自动扩大技术可达范围。
4. **环境阶梯：** dry-run、测试、生产的输入、允许动作、观察和停止条件。
5. **环境准入记录：** 用可关联的工件记录请求、判断、批准与观察要求。
6. **教学案例：** 同一部署意图在三个环境中被允许、阻塞或要求批准的路径。

## 拟议图示、示例与验证边界

- **图示：** 画出从 dry-run、测试到生产的权限阶梯；每一层都有文件、网络、凭证、目标、效果与批准边界，并明确只有“准入候选”而不是执行结论。
- **最小示例：** 实现纯内存 `assessEnvironmentAccess`，比较注入的任务效果类别、环境 profile、凭证 scope 和批准 snapshot，返回 `allowed`、`blocked` 或 `requires_approval`。它不读取环境变量、不创建文件、不调用网络或真实身份系统。
- **计划测试：** 覆盖只读 dry-run、dry-run 写入拒绝、目标范围拒绝、测试写入允许、生产外部动作缺批准、批准 scope 不匹配、网络边界不满足和凭证 scope 缺失。
- **计划案例：** 虚构部署意图只有在测试环境满足契约时才形成允许候选；生产部署必须具有匹配的环境、凭证和批准引用。案例不执行部署。

## 风险与待核验事项

- `TODO(verify)：` Codex、Docker、Kubernetes 与 GitHub Actions 均持续演进。每次修改产品限定陈述时，都要在写作日重新访问对应来源，不能把本 Brief 的访问日期当作长期事实。
- `TODO(verify)：` 若引入真实 CI、容器、集群、云账户、网络、MCP、浏览器、文件系统或秘密管理器，需要另行记录具体产品版本、环境准入、命令、批准与观察证据。
- `TODO(verify)：` 任何实际生产操作还需要由其源系统权限、组织政策、变更流程和回读验证共同限制；本章图示、表格和纯内存示例均不构成授权或操作证明。

## Research 完成检查

- [x] 记录了五项官方一手来源及各自允许用途与外推禁区。
- [x] 将技术 Sandbox、凭证范围、源系统权限、批准与结果验证分开。
- [x] 为环境阶梯、教学案例、图示和纯内存示例定义了范围。
- [x] 为动态产品材料和真实集成保留重新核验条件。
