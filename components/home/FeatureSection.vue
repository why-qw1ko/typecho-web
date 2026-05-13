<script setup lang="ts">

const features = [
  {
    icon: 'rocket',
    title: '极速体验',
    description: '采用 Nuxt 4 构建，支持 SSR 和静态生成，首屏加载极快',
  },
  {
    icon: 'moon',
    title: '暗色模式',
    description: '自动跟随系统，一键切换，保护你的眼睛',
  },
  {
    icon: 'mobile',
    title: '响应式设计',
    description: '完美适配手机、平板、桌面，随时随地阅读',
  },
  {
    icon: 'code',
    title: '代码高亮',
    description: '支持多种编程语言语法高亮，阅读代码更轻松',
  },
]

onMounted(() => {

})
</script>

<template>
  <section class="feature-section py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          <span class="gradient-text">为什么选择我们</span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          现代化的博客体验，专为内容创作者打造
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-soft hover:shadow-medium transition-all group"
        >
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <!-- Rocket -->
            <svg v-if="feature.icon === 'rocket'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.98 14.98 0 00-6.16 12.12M3.34 9.47a6 6 0 005.84 7.38V12m-.002-2.58A14.98 14.98 0 019.631 8.41" />
            </svg>
            <!-- Moon -->
            <svg v-else-if="feature.icon === 'moon'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <!-- Mobile -->
            <svg v-else-if="feature.icon === 'mobile'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <!-- Code -->
            <svg v-else-if="feature.icon === 'code'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">
   {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>