# 第 17 章示例整合审查

## 范围

- `examples/agent/evaluation-spec-assessment.mjs`
- `examples/agent/evaluation-spec-assessment.test.mjs`
- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.example-plan.md`
- 第 17 章正文中的最小示例与测试说明。

## 红绿过程

先实现基础质量门后，为“同一必需标准出现通过与失败两条记录”新增精确断言：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
```

该次实际运行退出 1：9 项中 8 项通过、1 项失败。失败断言显示函数错误返回 `accepted` / `evaluation_accepted`，而期望是 `needs_evidence` / `criterion_evidence_conflict`。根因是函数只读取第一个匹配记录，忽略了同一标准的相反状态。

修正为先收集同一标准的所有记录，并在状态不一致时返回冲突证据后，实际运行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
```

两条命令均退出 0。测试为 9 项通过、0 项失败；演示输出：

```text
{ status: 'accepted', code: 'evaluation_accepted', taskId: 'docs-update-evaluation' }
```

## 覆盖的教学路径

- 完整规格与允许证据的接受。
- 成功标准缺失时的 `needs_spec`。
- 必需证据缺失时的 `needs_evidence`。
- 自我报告不作为必需证据。
- 必需检查失败时的 `rejected`。
- 未校准模型评判时的 `needs_evidence`。
- 已允许且标为校准的模型评判路径。
- 同一标准的冲突记录路径。
- 可选项未通过时的 `needs_review`。

## 交叉审查修复

独立交叉审查指出：未知或缺失状态被误判为失败、教学记录没有验证范围和新鲜度、可选标准缺证会被静默接受。修复前，新增的 14 条测试中 9 条通过、5 条失败，分别暴露 `unknown`、缺失 `status`、缺失 `scope`、陈旧 `freshness` 和可选标准缺记录的错误出口。

修复后实际运行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
```

两条命令均退出 0。Node 内置测试为 14 项通过、0 项失败；演示输出仍为：

```text
{ status: 'accepted', code: 'evaluation_accepted', taskId: 'docs-update-evaluation' }
```

新增契约是：只有明确 `failed` 的适用必需证据才返回 `rejected`；`unknown`、缺失或不支持的状态均返回 `needs_evidence`。每条接受路径还必须匹配任务 `scope` 和策略的 `requiredFreshness`。可选标准没有记录时返回 `needs_review` / `optional_criterion_evidence_missing`，而非被悄悄跳过。

## 边界

函数只处理显式注入对象，不读取或写入真实 Markdown、文件、环境变量、时钟、网络、账户、密钥、模型、浏览器、CI、链接检查、数据库或外部评分服务。`accepted` 只代表本书教学质量门接受，不能证明真实任务、真实校准、权限、外部效果或读者体验。

## 主线程整合项

专用命令尚未由本子任务加入 `package.json` 或 `scripts/validate.sh`，以避免并发改动共享入口。主线程可在整合后将这两条 Node 命令加入总校验。
