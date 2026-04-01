# Typecho Blog Frontend

基于 Nuxt 4 构建的现代化博客前端，配合 Spring Boot 后端 API 使用。

## 技术栈

- **框架**: Nuxt 4 (Vue 3)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **状态管理**: Pinia
- **动画**: GSAP + VueUse Motion
- **数据获取**: Nuxt useFetch
- **SEO**: @nuxtjs/seo

## 功能特性

- 🌓 暗/亮色模式切换
- 📱 响应式设计 (手机、平板、桌面)
- ⚡ SSR 支持，SEO 友好
- 🎨 现代化 UI 设计
- 🔍 文章搜索
- 📂 分类和标签浏览
- ✨ 流畅的页面过渡动画

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 配置

修改 `nuxt.config.ts` 中的 `apiBase` 配置指向你的后端 API：

```ts
runtimeConfig: {
  public: {
    apiBase: 'http://your-api-server:8080/api',
  },
}
```

## 项目结构

```
typecho-web/
├── assets/          # 静态资源
│   └── css/         # 样式文件
├── components/      # 组件
│   ├── base/        # 基础组件 (Header, Footer)
│   ├── common/      # 通用组件
│   ├── home/        # 首页组件
│   └── post/        # 文章组件
├── composables/     # 组合式函数
├── layouts/         # 布局
├── locales/         # 多语言文件
├── pages/           # 页面
├── public/          # 公共静态文件
├── stores/          # Pinia 状态
├── types/           # TypeScript 类型
└── utils/           # 工具函数
```

## License

MIT