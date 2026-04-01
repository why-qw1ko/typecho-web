<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Typecho Blog - 现代化的博客系统',
  description: '一个基于 Nuxt 4 + Spring Boot 构建的现代化博客系统，支持暗色模式、响应式设计、优雅动画',
  ogTitle: 'Typecho Blog',
  ogDescription: '现代化的博客系统',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonHeroSection
      title="探索 · 记录 · 分享"
      description="一个现代化的博客系统，记录技术成长，分享生活点滴"
    >
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-white dark:bg-slate-800 text-primary-500 dark:text-primary-400 rounded-xl font-medium shadow-soft hover:shadow-medium transition-all"
        >
          开始阅读
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="px-6 py-3 border-2 border-white/50 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
        >
          了解更多
        </NuxtLink>
      </div>
    </CommonHeroSection>

    <!-- Stats Section -->
    <HomeStatsSection />

    <!-- Featured Section -->
    <HomeFeaturedSection />

    <!-- Post List -->
    <HomePostList />

    <!-- Features -->
    <HomeFeatureSection />

    <!-- Categories & Tags -->
    <HomeCategoryTagSection />
  </div>
</template>