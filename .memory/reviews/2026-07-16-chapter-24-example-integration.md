# 第 24 章 Example Integration

- **红灯：** 模块尚不存在时，Node 内置测试预期报告 `ERR_MODULE_NOT_FOUND`。
- **实现：** `assessMcpIntegrationAdmission` 只判断注入的 Profile、请求、环境、批准和观察计划。
- **绿灯：** 实现后运行 8 项 Node 内置测试；覆盖只读准备、写入缺批准、来源不明、目标越界、scope 越界、缺观察、annotations 不可信与未知效果类别。
- **边界：** 模块不连接 MCP、不启动进程、不读取文件、不访问网络、不使用凭证，也不验证外部效果。
