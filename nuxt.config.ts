export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  pages: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  site: {
    url: 'https://your-domain.com',
    name: 'Typecho Blog',
    description: '一个现代化的博客系统',
    defaultLocale: 'zh-CN',
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
    viewer: true,
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

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

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8088/api',
    },
  },

  experimental: {
    componentIslands: true,
    typedPages: false,
  },
})