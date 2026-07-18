---
title: "第 34 章示例计划：团队 Skill 准入"
chapter: "34"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 34 章示例计划：团队 Skill 准入

## 目标与边界

`assessTeamSkillAdmission(candidate)` 只检查调用方传入的 JavaScript 对象，判断一个虚构团队 Skill 候选是否具有登记所有者、只读技能契约、质量证据、兼容性状态与弃用状态。它只返回教学用的准入结论，既不发现、安装、发布、选择或执行 Skill，也不读取注册表、仓库、文件、环境变量、凭证或网络。

| 允许 | 不允许 |
| --- | --- |
| 检查注入字段、返回结构化结论、打印无副作用演示 JSON。 | 扫描目录、读写文件、访问网络、调用产品 API、安装 plugin、执行脚本、修改注册表或调用外部系统。 |

## 接口草图

```js
assessTeamSkillAdmission({
  registry: { id, owner },
  contract: {
    version,
    trigger,
    nonTrigger,
    effect: 'read_only' | 'write',
  },
  admission: { qualityEvidence },
  compatibility: { status: 'compatible' | 'incompatible' },
  deprecation: { status: 'active' | 'deprecated' },
});
```

完整的只读候选返回：

```json
{
  "status": "ready",
  "code": "skill_library_candidate_ready",
  "next": "implement_in_isolated_example",
  "executionPerformed": false
}
```

缺失所有者、契约或质量证据时，函数返回 `stopped` 和具名状态码。`effect: 'write'` 返回 `requires_approval / write_candidate_requires_approval`；不兼容或已弃用候选返回 `requires_review`，分别使用 `incompatible_skill_contract` 与 `deprecated_skill_candidate`。以上均是本书的纯内存教学路由，不代表任何 Skill、产品、组织审查或外部动作已经发生。

## 红绿过程

1. **RED：** 先创建 import `skill-library-admission-assessment.mjs` 的测试，再执行：

   ```bash
   node --test examples/agent/skill-library-admission-assessment.test.mjs
   ```

   实际结果：模块尚不存在，Node 报告 `ERR_MODULE_NOT_FOUND`，测试文件加载失败。该红灯只证明教学模块尚未创建。
2. **GREEN：** 创建纯函数后，重跑同一命令，覆盖完整只读候选、三种缺证据、写入候选、不兼容候选与弃用候选。
3. **EXECUTE：** 运行：

   ```bash
   node examples/agent/skill-library-admission-assessment.mjs
   ```

   演示输入是一项完整、只读、兼容且未弃用的虚构“文档事实核验”候选；预期只打印上述 `ready` 结果，且固定 `executionPerformed: false`。

## 测试矩阵

| 路径 | 预期决定 | 关键断言 | 不证明 |
| --- | --- | --- | --- |
| 完整只读候选 | `ready` | 准备码、下一步和 `executionPerformed: false`。 | 真实 Skill 可被发现、安装或执行。 |
| 缺所有者 | `stopped` | `missing_skill_owner`。 | 某团队不存在负责人。 |
| 缺技能契约 | `stopped` | `missing_skill_contract`。 | 候选无法具有任何行为。 |
| 缺质量证据 | `stopped` | `missing_quality_evidence`。 | 外部评估没有发生。 |
| 写入候选 | `requires_approval` | `write_candidate_requires_approval`。 | 已获授权或存在写入目标。 |
| 不兼容候选 | `requires_review` | `incompatible_skill_contract`。 | 任何版本迁移已完成。 |
| 已弃用候选 | `requires_review` | `deprecated_skill_candidate`。 | 文件、权限或调用方已经被删除。 |

## 运行前提与命令

- 只需要本仓 Node.js；无需 Skill、plugin、注册表、产品账户、网络、浏览器、文件权限或密钥。

```bash
node --test examples/agent/skill-library-admission-assessment.test.mjs
node examples/agent/skill-library-admission-assessment.mjs
```

这些命令只验证注入教学对象的确定性分类，不能成为真实 Skill 准入、发布、授权、兼容性、弃用、产品发现或外部效果已经发生的证据。
