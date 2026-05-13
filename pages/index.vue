<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// SEO
useSeoMeta({
  title: computed(() => `${t('welcome')} - Typecho Blog`),
  description: computed(() => t('heroDesc')),
  ogTitle: 'Typecho Blog',
  ogDescription: computed(() => t('heroDesc')),
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonHeroSection
      :title="t('heroTitle')"
      :description="t('heroDesc')"
    >
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <NuxtLink
          to="/"
          class="px-8 py-3.5 bg-white dark:bg-slate-800 text-primary-500 dark:text-primary-400 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {{ t('startReading') }}
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="px-8 py-3.5 border-2 border-white text-primary-500 dark:text-primary-400 rounded-xl font-semibold shadow-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          {{ t('learnMore') }}
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