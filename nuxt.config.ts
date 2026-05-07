// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  // Nuxt SEO 配置
  site: {
    url: 'https://your-domain.com',
    name: 'Typecho Blog',
    description: '一个现代化的博客系统',
    defaultLocale: 'zh-CN',
  },

  // 图片优化
  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // 暗色模式
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Tailwind CSS v4 配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // 应用配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8088/api',
    },
  },

  // 多语言支持
  i18n: {
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    defaultLocale: 'zh-CN',
    // lazy: true, 没有这个属性
    langDir: 'locales',
  },

  // 实验性功能
  experimental: {
    componentIslands: true,
    typedPages: true,
  },
})