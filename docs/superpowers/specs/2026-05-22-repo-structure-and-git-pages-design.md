# Smart Garden Repo Structure And Git Pages Design

## Goal

把当前 Smart Garden Web 原型整理成一个适合长期演进的多端仓库骨架：
- 当前只保留 Web 实现可运行、可提交、可发布
- 为后续小程序版本、轻量服务端和 Supabase 主后端接入预留明确目录
- 准备好 Git 环境、忽略规则和 GitHub Pages 发布方案

## Scope

本次只处理仓库结构和发布基础设施，不做新的业务功能开发，不接入小程序代码，也不接入真实 Supabase 项目。

包含内容：
- 调整项目目录为多端预留结构
- 初始化 Git 仓库
- 增加 `.gitignore`
- 增加环境变量模板
- 清理不应进入版本库的产物
- 增加仓库级说明文档
- 配置 Web 在 GitHub Pages 的构建与发布

不包含内容：
- 小程序代码实现
- 服务端实现
- Web / server / 小程序共享包抽离
- 真实 Supabase 项目初始化与 schema 设计
- CI 之外的部署平台接入

## Target Structure

目标目录结构如下：

```text
.
├── apps/
│   ├── web/                 # 当前 Vite + React Web 项目
│   ├── mp/                  # 后续小程序预留目录，先放说明文件
│   └── server/              # 后续轻量服务端/BFF 预留目录
├── docs/                    # 设计稿、方案、说明文档
├── .github/
│   └── workflows/           # GitHub Pages 自动发布
├── .env.example
├── .gitignore
├── README.md
└── package.json             # 根目录工作区与统一脚本
```

`apps/web` 内保留现有前端代码与构建配置：

```text
apps/web/
├── src/
├── public/                  # 如后续需要静态资源可放这里
├── index.html
├── package.json
├── package-lock.json
├── tsconfig*.json
└── vite.config.*
```

## Architecture Decisions

### 1. 使用“单仓多端 + 薄服务端预留”而不是继续单应用平铺

原因：
- 当前已经明确后续要做小程序，目录边界现在建立最便宜
- 当前已经明确后续还会接服务端层和 Supabase，边界应一次建好
- Web 仍然可以独立开发，不需要现在就进入复杂 monorepo 抽包
- 未来如果要共享类型、mock、设计 token，可以再增补 `packages/*`

### 2. 本次不抽 `packages/ui` 或 `packages/shared`

原因：
- 当前代码规模还不足以支撑共享包拆分
- 现在强拆会增加路径改造、构建配置和维护复杂度
- 先把应用边界理顺，再在后续第二阶段抽公共层

### 3. Supabase 作为主后端，`apps/server` 作为薄服务端层

采用的职责分工：
- Supabase：数据库、认证、存储，以及后续可选的 Edge Functions
- `apps/server`：BFF、Webhook、定时任务、第三方集成、需要保护服务密钥的逻辑

原因：
- 这比“先做一个完整自建后端”更轻
- 与当前产品阶段匹配
- 能避免把 `service_role` 或其他敏感能力放进前端

### 4. GitHub Pages 使用 GitHub Actions 自动发布

采用 GitHub 官方 Pages 工作流，从默认分支构建 `apps/web` 并发布。

原因：
- 不依赖本地手动构建和推送 `gh-pages`
- 对后续协作更稳定
- 配置一旦完成，后续只需 push

### 5. Vite 的 `base` 需要显式处理

GitHub Pages 通常部署在：
- 用户站点：`https://<user>.github.io/`
- 项目站点：`https://<user>.github.io/<repo>/`

默认按“项目站点”处理更稳妥，因此 `apps/web` 的 Vite 配置需要支持可配置 `base`，避免静态资源路径在 Pages 下失效。

## Git Boundaries

必须忽略的内容：
- `node_modules/`
- `dist/`
- `.DS_Store`
- `*.tsbuildinfo`
- Vite/Vitest 缓存
- 本地环境文件，例如 `.env.local`
- 真实密钥文件与未忽略的 `.env`

建议保留：
- `docs/superpowers/specs/*`
- `docs/superpowers/plans/*`
- 设计参考 HTML/PNG，如果你希望把设计过程一起保留在仓库中

建议删除或迁移出仓库根目录的内容：
- 已构建产物 `dist/`
- 依赖目录 `node_modules/`
- 所有 Finder 生成的 `.DS_Store`

## Migration Plan For Files

### Web 项目迁移

当前根目录中的 Web 项目文件迁入 `apps/web`：
- `src`
- `index.html`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `vite.config.js`
- `vite.config.d.ts`

可选保留在仓库根目录的设计参考文件：
- `stitch-owner-scenes-list.html`
- `stitch-owner-scenes-detail.html`
- 对应截图资源

更合理的位置是：

```text
docs/references/stitch/
```

### 小程序预留

新增：

```text
apps/mp/README.md
```

用于明确说明该目录预留给未来小程序端，当前不包含实现。

### 服务端预留

新增：

```text
apps/server/README.md
```

用于明确说明该目录预留给未来轻量服务端层，当前不包含实现。

## README Requirements

根目录 `README.md` 需要说明：
- 仓库目标：Smart Garden 多端产品仓库，采用 Supabase 主后端方向
- 当前状态：仅 Web 版本已实现
- 目录结构简介
- 本地开发命令
- GitHub Pages 发布地址与方式
- Web / server / Supabase 的职责边界

## Environment Requirements

根目录需要增加 `.env.example`，至少说明这些变量类别：
- `VITE_SUPABASE_*` 给 Web 使用
- `SUPABASE_*` 给未来 `apps/server` 使用
- 未来应用地址和平台标识

## Testing And Verification

实施完成后至少验证：
- Web 在新目录下仍可 `npm run build`
- 关键页面测试仍可运行
- GitHub Actions 工作流语法正确
- Vite 构建产物在 Pages `base` 配置下资源路径正确
- 仓库中没有真实 Supabase 密钥被纳入版本控制

## Risks

### 1. 目录迁移会影响相对路径

风险点：
- 构建配置
- 字体资源路径
- 测试入口与脚本路径

策略：
- 优先保持应用内部相对路径不变，只移动整个项目根

### 2. GitHub Pages 路径错误

风险点：
- 静态资源 404
- 路由刷新 404

策略：
- 用可配置 `base`
- 明确 Pages 仅支持静态资源托管，React Router 刷新问题要考虑 SPA fallback 方案

### 3. 还未初始化 Git 仓库

风险点：
- 不能直接提交
- 不能做“变更前后”对比

策略：
- 在整理完成后初始化 Git，并确保 `.gitignore` 先落地再执行 `git add`

## Recommended Execution Order

1. 新建目标目录骨架
2. 将 Web 项目整体迁入 `apps/web`
3. 增加根目录工作区配置和统一脚本
4. 增加 `.gitignore`
5. 清理 `dist`、`node_modules`、`.DS_Store`
6. 增加 `README.md` 与 `apps/mp/README.md`
7. 配置 GitHub Pages Actions
8. 调整 Vite `base`
9. 运行构建与关键测试验证
10. 初始化 Git 并准备首次提交
11. 增加 `apps/server` 占位与 `.env.example`
