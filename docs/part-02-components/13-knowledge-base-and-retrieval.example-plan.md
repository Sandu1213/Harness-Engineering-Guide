---
title: "第 13 章示例实现记录：检索证据评估"
chapter: "13-knowledge-base-and-retrieval"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 13 章示例实现记录：检索证据评估

## 目的与边界

`assessRetrievalEvidence` 将本章的查询范围、候选集合、来源种类策略、新鲜度、稳定位置与引用回链收束为一个纯内存判断函数。它判断**被选中的候选**能否进入本书模型中的 Evidence Card；它不会生成查询、排序、读取内容、索引资料、访问知识库或生成答案。

实现位于 [`examples/agent/retrieval-evidence-assessment.mjs`](../../examples/agent/retrieval-evidence-assessment.mjs)，测试位于 [`examples/agent/retrieval-evidence-assessment.test.mjs`](../../examples/agent/retrieval-evidence-assessment.test.mjs)。

函数只处理调用者注入的普通对象。它不调用模型、网络、浏览器、文件、Git、数据库、向量数据库、嵌入模型、重排器、环境变量、凭证、权限或外部系统；输入中的 `freshness` 和 `sourceKind` 只是教学快照，不是实际页面检查或信任判定。

## 接口

```js
{
  query: {
    scope: 'api_authentication',
    requiresFreshness: true,
  },
  candidates: [{
    id: 'official-auth-doc',
    sourceKind: 'official',
    scopes: ['api_authentication'],
    url: 'https://docs.example.invalid/auth',
    freshness: 'verified',
  }],
  policy: {
    allowedSourceKinds: ['official', 'primary_paper'],
  },
  selection: {
    candidateIds: ['official-auth-doc'],
    citedCandidateIds: ['official-auth-doc'],
  },
}
```

| 判断顺序 | 条件 | 返回状态 / 代码 | 它不能说明什么 |
| --- | --- | --- | --- |
| 1 | 查询没有明确范围 | `needs_evidence` / `query_scope_missing` | 真实查询无效或没有答案。 |
| 2 | 没有选择任何候选 | `needs_evidence` / `no_evidence_selected` | 资料库为空。 |
| 3 | 选中的候选不在注入集合 | `blocked` / `candidate_not_found` | 真实索引没有该资料。 |
| 4 | 候选来源种类不符合 Policy | `blocked` / `source_kind_not_allowed` | 来源内容必然错误。 |
| 5 | 候选范围不包含查询范围 | `needs_evidence` / `candidate_scope_mismatch` | 内容毫无价值。 |
| 6 | 当前问题要求新鲜度而候选未标为已核验 | `needs_evidence` / `freshness_not_verified` | 真实网页一定过期。 |
| 7 | 候选没有稳定位置或输出没有回链 | `needs_evidence` / `source_location_missing` 或 `citation_missing` | 结论已经被证实。 |
| 8 | 所有教学门通过 | `allowed` / `evidence_selection_allowed` | 模型答案正确、来源可访问或真实 API 当前有效。 |

## 红绿验证

测试文件先于实现模块创建。实现模块缺失时，2026-07-16 实际执行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
```

命令以退出码 `1` 结束，并报告 `ERR_MODULE_NOT_FOUND`，因为 `retrieval-evidence-assessment.mjs` 当时不存在。这个红灯只证明测试先于目标模块存在。

实现后，2026-07-16 实际执行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
node examples/agent/retrieval-evidence-assessment.mjs
```

测试以退出码 `0` 结束：7 项通过、0 项失败。演示以退出码 `0` 结束，输出 `allowed / evidence_selection_allowed` 及 `official-auth-doc`。完整的命令和边界见[示例整合审查](../../.memory/reviews/2026-07-16-chapter-13-example-integration.md)。

## 测试矩阵

| 路径 | 注入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 新鲜官方候选 | 官方、范围匹配、有 URL、有回链 | `allowed` | 页面当前可访问或内容正确。 |
| 候选不存在 | `candidateIds` 不在候选集合 | `blocked` | 真实索引漏召回。 |
| 来源种类不允许 | `blog` 不在 Policy | `blocked` | 博客内容错误。 |
| 新鲜度未知 | 当前问题 + `freshness: unknown` | `needs_evidence` | 页面实际已过期。 |
| 范围不匹配 | 候选只覆盖 rate limit | `needs_evidence` | 资料不可用于任何任务。 |
| URL 缺失 | 没有稳定来源位置 | `needs_evidence` | 来源不存在。 |
| 回链缺失 | 选中项未出现于引用集合 | `needs_evidence` | 答案已经错误。 |

## 完成检查

- [x] 示例只使用显式注入的教学对象。
- [x] 已先实际记录模块缺失红灯。
- [x] 已实际运行 7 项 Node 内置测试和演示。
- [x] 覆盖来源种类、范围、新鲜度、稳定位置与引用回链。
- [x] 未把测试、演示或输入标记伪装为真实检索、索引、来源核验或答案验收。
