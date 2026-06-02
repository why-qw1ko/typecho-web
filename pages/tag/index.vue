<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 加载标签列表
const { data: tags, pending } = await useTags()

// 根据文章数量计算标签大小
const getTagSize = (count: number) => {
  if (count >= 10) return 'text-lg px-6 py-3'
  if (count >= 5) return 'text-base px-5 py-2.5'
  return 'text-sm px-4 py-2'
}

useHead({
  title: computed(() => `${t('hotTags')} - Typecho Blog`),
  meta: [
    { name: 'description', content: computed(() => t('inputSearchKeyword')) }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonPageHero
      :title="t('hotTags')"
      :description="t('inputSearchKeyword')"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Tags Cloud -->
      <div v-else class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.mid"
          :to="`/tag/${tag.mid}`"
          class="group bg-white dark:bg-slate-900 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 font-medium hover:-translate-y-0.5 hover:bg-primary-500 hover:text-white"
          :class="getTagSize(tag.count)"
        >
          <span class="group-hover:text-white transition-colors">
            #{{ tag.name }}
          </span>
          <span class="ml-2 text-slate-400 dark:text-slate-500 text-xs group-hover:text-white/70 transition-colors">
            ({{ tag.count }})
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
