# 第 14 章 Example Integration Review

## 范围

- `examples/agent/human-approval-routing.mjs`
- `examples/agent/human-approval-routing.test.mjs`
- `docs/part-02-components/14-human-in-the-loop.example-plan.md`
- 第 14 章正文中的示例说明。

## 红绿证据

先创建测试文件、尚未创建目标模块时，实际运行：

```bash
node --test examples/agent/human-approval-routing.test.mjs
```

命令退出 1，Node 报告 `ERR_MODULE_NOT_FOUND`，指出 `human-approval-routing.mjs` 不存在。该红灯只证明测试先于实现存在。

实现后实际运行：

```bash
node --test examples/agent/human-approval-routing.test.mjs
node examples/agent/human-approval-routing.mjs
```

交叉审查补齐“证据状态不匹配”和“匹配批准”两条精确断言后，两条命令均退出 0。测试为 10 项通过、0 项失败；演示输出：

```json
{
  "status": "allowed",
  "code": "auto_candidate",
  "actionId": "dependency-update-plan"
}
```

## 覆盖的判断

- 新鲜、可逆且策略允许的候选返回 `allowed` / `auto_candidate`。
- 不可逆候选请求批准。
- 缺少行动卡字段或证据不新鲜时请求补证。
- 先前效果未知时先阻塞。
- 过期批准、范围不匹配、证据状态不匹配、匹配批准和明确拒绝分别保留为不同结论。

## 边界

函数只读取注入对象；不访问网络、文件、环境变量、时钟、真实身份、密钥、数据库、审批系统、Tool 或外部服务，也不修改任何外部状态。通过的测试与演示不证明真实人类批准、权限、审批安全、漏洞修复、依赖修改、测试运行或发布。

## 主线程整合项

主线程已添加 npm script 与全仓专用测试入口；完整校验的实际结果由主线程在共享状态收口后记录。
