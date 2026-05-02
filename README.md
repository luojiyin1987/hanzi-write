# 汉字书写练习

一个基于 [Hanzi Writer](https://github.com/chanind/hanzi-writer) 的纯前端汉字书写练习工具。无需构建，打开即用。

## 功能

- **笔画动画** — 观看汉字的正确书写顺序
- **书写练习** — 跟随提示手写汉字，实时判断笔画对错（颜色反馈）
- **任意汉字** — 输入任意中文字符即可加载
- **移动优先** — 响应式布局，针对手机和平板优化触摸体验
- **键盘优化** — 聚焦输入框时自动唤起中文键盘，书写区域禁止页面滚动
- **横屏适配** — 旋转屏幕或调整窗口大小后自动重绘
- **CDN + 本地兜底** — 优先从 CDN 加载依赖，失败时自动回退到本地

## 在线演示

👉 [https://luojiyin1987.github.io/hanzi-write](https://luojiyin1987.github.io/hanzi-write)

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/luojiyin1987/hanzi-write.git
cd hanzi-write

# 直接打开（推荐用于简单预览）
open index.html

# 或启动本地服务器（推荐用于完整功能测试）
npx serve .
# python3 -m http.server 3000
```

## 项目结构

```
.
├── index.html              # 主页面（全部逻辑内联）
├── lib/
│   └── hanzi-writer.min.js # 本地兜底资源
├── vercel.json             # Vercel 部署配置
├── LICENSE
└── README.md
```

## 部署

### Vercel

已包含 `vercel.json`，直接导入项目即可部署。

### GitHub Pages

将 `main` 分支的 `/ (root)` 目录作为 Pages 来源即可。

## 技术栈

- HTML5
- CSS3（原生变量、Flexbox、媒体查询）
- 原生 JavaScript（无框架、无构建步骤）
- [Hanzi Writer](https://github.com/chanind/hanzi-writer) 3.7.3

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

[MIT](LICENSE)
