<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 获取统计数据
const { data: stats, error } = await useStats()

// 错误处理
if (error.value) {
  console.error('Failed to fetch stats:', error.value)
}
</script>

<template>
  <section class="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Posts -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalPosts || 0 }}
          </div>
          <div class="text-white/80 font-medium">{{ t('posts') }}</div>
        </div>

        <!-- Categories -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalCategories || 0 }}
          </div>
          <div class="text-white/80 font-medium">{{ t('categories') }}</div>
        </div>

        <!-- Tags -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalTags || 0 }}
          </div>
          <div class="text-white/80 font-medium">{{ t('tags') }}</div>
        </div>

        <!-- Views -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            10K+
          </div>
          <div class="text-white/80 font-medium">{{ t('views') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>