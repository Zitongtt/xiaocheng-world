# 小程的世界 · 个人网站

一个以「可交互色环」导航的个人主页，纯静态站点，可免费托管在 GitHub Pages。

## 目录结构

```
.
├── frontend/            # 网站源码（React + Vite + Tailwind + framer-motion）
│   ├── public/          # 静态资源（图片、简历 PDF）
│   │   └── images/      # 生活照、求学时间轴配图（见下方说明）
│   └── src/
│       ├── data/content.ts   # ★ 所有文字内容集中在这里改
│       ├── components/        # 首页、色环、弹窗、各板块组件
│       └── ...
├── .github/workflows/deploy.yml   # 推送到 main 自动部署到 GitHub Pages
└── docs/                # 产品说明（自动生成）
```

## 本地运行

```bash
cd frontend
pnpm install      # 或 npm install
pnpm dev          # 本地预览，默认 http://localhost:5173
pnpm build        # 打包到 frontend/dist，可用于任意静态托管
```

## 部署到 GitHub Pages

1. 把整个项目推送到你的 GitHub 仓库 `main` 分支。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 推送后 Actions 会自动构建并发布，几分钟后即可访问 `https://<用户名>.github.io/<仓库名>/`。

> `frontend/vite.config.ts` 里的 `base` 已自动匹配仓库名，无需手动改。

## 放入你的真实资料

**图片**（放进 `frontend/public/images/`，文件名需一致）：
- `life.jpg` — 首页右侧生活照（对应你本地 1.jpg）
- `origin-elementary.jpg` — 小学配图（2.2.jpg）
- `origin-junior.jpg` — 初中配图（2.3.jpg）
- `origin-senior.jpg` — 高中配图（2.4.jpg）
- `origin-university.jpg` — 大学配图（2.5.jpg）

**简历**：`frontend/public/resume.pdf`（首页「下载简历 / 查看简历」会打开它）。

**文字内容**：姓名、电话、邮箱、社会实践、获奖、项目经历等，全部在 `frontend/src/data/content.ts` 一个文件里修改，保存后自动刷新预览。

## 色环板块

点击色环不同颜色，平滑展开对应板块：

| 颜色 | 板块 | 内容 |
|------|------|------|
| 黄 | Origin | 求学时间轴 |
| 红 | Drive | 社会实践 |
| 粉 | Experience | 比赛获奖 |
| 紫 | Projects | 项目经历 |
| 蓝 | Skills | 抽卡式技能卡 / 兴趣卡 |
| 灰 | Thinking | 思考随笔 |
| 绿 | Life | 旅行地图 |
| 多彩 | All | 关于我 + 联系我 + 结语 |
