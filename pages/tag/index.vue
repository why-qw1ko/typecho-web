<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 加载标签列表
const { data: tags, pending } = await useTags()

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
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {{ t('hotTags') }}
          </span>
        </h1>
        <p class="text-lg text-slate-600">{{ t('inputSearchKeyword') }}</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Tags Cloud -->
      <div v-else class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.mid"
          :to="`/tag/${tag.mid}`"
          class="group px-6 py-3 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <span class="font-medium group-hover:text-blue-500 transition-colors">
            #{{ tag.name }}
          </span>
          <span class="ml-2 text-sm text-slate-500 dark:text-slate-400">
            ({{ tag.count }})
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>