# Leave-debugger

一个用于破解网页无限debugger的油猴脚本。

## 功能特性

- 自动移除页面中的debugger语句
- 安全的实现方式，不影响DOM操作
- 保留原始Function的所有特性
- 具有防检测机制

## 使用方法

1. 安装油猴插件（Tampermonkey）
2. 安装此脚本
3. 脚本会自动在页面加载开始时运行

## 版本历史

- v1.0.0: 初始发布版本
  - 实现基础的debugger移除功能
  - 添加防检测机制
  - 优化错误处理

## 许可证

MIT License 