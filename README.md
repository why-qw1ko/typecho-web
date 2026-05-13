# Typecho Blog Frontend

基于 Nuxt 4 构建的现代化博客前端，配合 Spring Boot 后端 API 使用。

## 🚀 技术栈

### 核心框架
- **框架**: Nuxt 4 (Vue 3.5+)
- **语言**: TypeScript 5
- **路由**: Vue Router 5
- **状态管理**: Pinia

### UI 与样式
- **CSS 框架**: Tailwind CSS 3.4
- **颜色模式**: @nuxtjs/color-mode
- **组件库**: Shadcn-Vue (部分组件)
- **图标**: Lucide Vue Next

### 功能模块
- **动画**: GSAP 3.15
- **工具集**: @vueuse/nuxt
- **国际化**: @nuxtjs/i18n
- **图片优化**: @nuxt/image
- **SEO**: @nuxtjs/seo
- **Markdown 渲染**: marked

## ✨ 功能特性

- 🌓 **暗/亮色模式** - 自动跟随系统或手动切换
- 📱 **响应式设计** - 完美适配手机、平板、桌面端
- ⚡ **SSR 支持** - 服务端渲染，SEO 友好
- 🎨 **现代化 UI** - 清新简约的设计风格
- 🔍 **全文搜索** - 支持关键词搜索文章
- 📂 **分类标签** - 完善的分类和标签系统
- 🌍 **多语言** - 支持中文和英文切换
- ✨ **流畅动画** - GSAP 驱动的页面过渡效果
- 🔐 **用户认证** - JWT Token 登录认证

## 📦 项目结构

```
typecho-web/
├── app/                    # Nuxt 应用入口
│   └── app.vue            # 根组件
├── assets/                 # 静态资源
│   └── css/               # 样式文件
│       └── tailwind.css   # Tailwind 样式
├── components/             # Vue 组件
│   ├── base/              # 基础组件
│   │   ├── Header.vue     # 顶部导航
│   │   └── Footer.vue     # 页脚
│   ├── common/            # 通用组件
│   │   ├── HeroSection.vue
│   │   └── Toast.vue      # 提示框
│   ├── home/              # 首页组件
│   │   ├── PostList.vue   # 文章列表
│   │   ├── FeaturedSection.vue
│   │   ├── StatsSection.vue
│   │   └── CategoryTagSection.vue
│   └── PostCard.vue       # 文章卡片
├── composables/            # 组合式函数
│   ├── useApi.ts          # API 请求封装
│   ├── usePosts.ts        # 文章相关 API
│   ├── useToast.ts        # Toast 提示
│   └── useMarkdown.ts     # Markdown 渲染
├── i18n/                   # 国际化
│   └── locales/           # 语言文件
│       ├── zh-CN.json     # 中文
│       └── en-US.json     # 英文
├── layouts/                # 布局文件
│   └── default.vue        # 默认布局
├── pages/                  # 页面路由
│   ├── index.vue          # 首页
│   ├── post/[id].vue      # 文章详情
│   ├── search/            # 搜索页面
│   ├── category/          # 分类页面
│   ├── tag/               # 标签页面
│   ├── about/             # 关于页面
│   └── login/             # 登录页面
├── public/                 # 公共静态文件
│   ├── favicon.ico
│   └── favicon.svg
├── stores/                 # Pinia 状态管理
│   └── user.ts            # 用户状态
├── types/                  # TypeScript 类型定义
│   └── index.ts
├── nuxt.config.ts          # Nuxt 配置
├── tailwind.config.ts      # Tailwind 配置
├── i18n.config.ts          # 国际化配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 🛠️ 开发指南

### 环境要求

- Node.js 20+
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 开发模式（热重载）
npm run dev

# 指定端口
npm run dev -- -p 3001
```

### 构建与部署

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 生成静态站点
npm run generate
```

### 代码检查

```bash
# TypeScript 类型检查
npm run typecheck

# 代码格式化
npm run lint
```

## ⚙️ 配置说明

### 环境变量

创建 `.env` 文件配置环境变量：

```env
NUXT_PUBLIC_API_BASE=http://localhost:8088/api
```

### Nuxt 配置

关键配置项在 `nuxt.config.ts`：

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8088/api',
    },
  },

  i18n: {
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
  },
})
```

## 🎨 设计系统

### 颜色主题

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      },
      accent: {
        500: '#8b5cf6',
        // ...
      }
    }
  }
}
```

### 阴影层级

- `shadow-soft` - 柔和阴影（卡片默认）
- `shadow-medium` - 中等阴影（悬停效果）
- `shadow-lg` - 大阴影（强调元素）
- `shadow-2xl` - 超大阴影（Hero 区域）

## 📱 页面路由

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | 文章列表、精选推荐、统计数据 |
| `/post/:id` | 文章详情 | 文章正文、评论 |
| `/search` | 搜索 | 关键词搜索文章 |
| `/category` | 分类列表 | 所有分类 |
| `/category/:id` | 分类详情 | 分类下的文章 |
| `/tag` | 标签列表 | 所有标签 |
| `/tag/:id` | 标签详情 | 标签下的文章 |
| `/about` | 关于 | 博客介绍 |
| `/login` | 登录 | 用户登录 |

## 🔌 API 集成

### 统一 API 封装

所有 API 请求通过 `composables/useApi.ts` 封装：

```typescript
// 使用示例
const { data } = await usePosts({
  pageNum: 1,
  pageSize: 10,
  type: 'post',
  status: 'publish',
})
```

### 认证机制

- 使用 JWT Token 进行身份验证
- Token 存储在 Cookie 中
- 401 错误自动跳转登录页

## 🌍 国际化

支持中文和英文切换：

```json
// locales/zh-CN.json
{
  "welcome": "欢迎来到我的博客",
  "readMore": "阅读全文",
  "search": "搜索"
}

// locales/en-US.json
{
  "welcome": "Welcome to my blog",
  "readMore": "Read More",
  "search": "Search"
}
```

## 🎯 待办事项

- [ ] 完善评论功能
- [ ] 添加文章归档页面
- [ ] 实现阅读历史记录
- [ ] 添加 RSS 订阅
- [ ] 优化移动端导航
- [ ] 添加 PWA 支持

## 📄 许可证

MIT License

---

**开发者**: Typecho Team  
**版本**: 1.0.0  
**最后更新**: 2026-05-13
