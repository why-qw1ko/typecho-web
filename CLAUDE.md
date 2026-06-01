# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指引。

## 项目概述

Typecho 博客平台的现代化前端，基于 Nuxt 4 (Vue 3.5+) + TypeScript 构建，对接 Spring Boot 后端 REST API。使用 Tailwind CSS 样式方案、Pinia 状态管理、vue-i18n 国际化（默认中文，支持英文）。

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器（默认端口 3000）
npm run build        # 生产环境构建
npm run preview      # 预览生产构建
npm run generate     # 生成静态站点
```

项目未配置测试框架和代码检查工具。

## 环境变量

`NUXT_PUBLIC_API_BASE` — 后端 API 地址（默认：`http://localhost:8088/api`）

## 架构设计

### API 层 (`composables/useApi.ts`)

核心 API 抽象层，封装了 Nuxt 的 `useFetch`。所有 API 调用通过 `useApiGet`、`useApiPost`、`useApiPut`、`useApiDelete` 进行。自动从 Cookie 注入 JWT Token，解包 `{ code, message, data }` 响应结构，遇到 401 错误自动清除 Token 并跳转到 `/login`。

### 内容 API (`composables/usePosts.ts`)

所有博客内容接口定义于此：`/contents/page`（分页文章列表）、`/contents/{cid}`（单篇文章）、`/contents/category/{mid}`（分类文章）、`/contents/tag/{mid}`（标签文章）、`/metas/categories`（所有分类）、`/metas/tags`（所有标签）、`/public/stats`（站点统计）。API 返回 `PostWrapper` 结构（包含 `content: Post` 以及 `author`、`category`、`tags`），由 `usePostItem.ts` 中的组合式函数进行标准化处理。

### 类型定义 (`types/index.ts`)

所有 TypeScript 接口：`Post`、`PostWrapper`、`User`、`Category`、`Tag`、`Comment`、`Link`、`LoginRequest`、`LoginResponse`、`PageResult<T>` 等。

### 认证 (`stores/user.ts`)

Pinia Store，JWT 存储在 7 天有效期的 Cookie 中。`login()` 调用 `/auth/login`，`fetchUserInfo()` 调用 `/auth/me`，`logout()` 清除状态并跳转。暴露 `isLoggedIn` 和 `isAdmin` 计算属性。

### 组件规范

Nuxt 自动导入，基于目录名添加前缀：`base/` → `Base*`，`common/` → `Common*`，`home/` → `Home*`。根目录组件（如 `PostCard.vue`）直接使用文件名。

### 样式方案

Tailwind CSS 3.4 + `@tailwindcss/typography` 插件。自定义设计令牌见 `tailwind.config.ts`：主色蓝色、强调色紫色、表面色石板色系。暗色模式基于 class 切换，支持系统偏好检测和手动切换。GSAP 用于头部入场动画。

### 国际化

`@nuxtjs/i18n`，`no_prefix` 策略（URL 不含语言前缀）。语言文件位于 `i18n/locales/{zh-CN,en-US}.json`，配置在 `i18n.config.ts`。共 42 个翻译键，涵盖导航、首屏、文章元信息、分页和认证。

### Markdown 渲染

以 `<!--markdown-->` 前缀标记的文章通过 `marked` 库渲染（支持 GFM 和换行）。见 `composables/useMarkdown.ts`。HTML 实体解码通过 `composables/useHtml.ts` 基于 textarea 元素实现。

## 页面路由

- `/` — 首页（首屏横幅、精选文章、统计数据、文章列表、分类/标签）
- `/post/[id]` — 文章详情
- `/category/`、`/category/[id]` — 分类列表和分类文章
- `/tag/`、`/tag/[id]` — 标签列表和标签文章
- `/search/` — 关键词搜索
- `/about/` — 关于页面（技能和时间线）
- `/login/` — 登录表单
