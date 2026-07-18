---
chapter: "13-knowledge-base-and-retrieval"
stage: "Example Implementation"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 13 章示例整合记录：检索证据评估

## 范围

本次实现 [`assessRetrievalEvidence`](../../examples/agent/retrieval-evidence-assessment.mjs)。它只根据注入的查询范围、候选元数据、来源种类 Policy 和选中/引用关系判断候选是否可进入教学用 Evidence Card；不读取、查询、索引、排序、生成或验证真实知识内容。

## 红灯记录

先创建测试文件，目标实现模块尚不存在。随后实际运行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
```

命令以退出码 `1` 结束，报告 `ERR_MODULE_NOT_FOUND`，缺失路径是 `examples/agent/retrieval-evidence-assessment.mjs`。该红灯只证明测试先于实现模块存在。

## 实现与实际运行

实现后实际运行：

```bash
node --test examples/agent/retrieval-evidence-assessment.test.mjs
node examples/agent/retrieval-evidence-assessment.mjs
```

两个命令均以退出码 `0` 结束。测试 7 项通过、0 项失败，覆盖：范围内的新鲜官方候选、候选不存在、来源种类拒绝、新鲜度未知、范围不匹配、稳定位置缺失和引用回链缺失。演示输出：

```json
{
  "status": "allowed",
  "code": "evidence_selection_allowed",
  "selectedCandidateIds": ["official-auth-doc"]
}
```

## 结论与边界

- `allowed` 只表示此函数对注入对象没有发现本章定义的范围、来源种类、新鲜度、URL 或引用缺口。
- `sourceKind`、`freshness`、URL、候选集合和引用集合都由调用者注入；函数不检查真实来源、页面状态、日期、内容、权限或产品行为。
- 示例不调用模型、网络、浏览器、文件、Git、数据库、向量库、嵌入、重排、环境变量、凭证、权限或外部系统。
- 未运行全仓 `npm run validate`，也未将脚本添加到 `package.json` 或 `scripts/validate.sh`；主线程需统一整合。

## 关联工件

- [示例实现记录](../../docs/part-02-components/13-knowledge-base-and-retrieval.example-plan.md)
- [实现](../../examples/agent/retrieval-evidence-assessment.mjs)
- [测试](../../examples/agent/retrieval-evidence-assessment.test.mjs)
- [章节正文](../../docs/part-02-components/13-knowledge-base-and-retrieval.md)
