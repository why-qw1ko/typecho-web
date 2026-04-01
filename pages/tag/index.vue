<script setup lang="ts">
// 加载标签列表
const { data: tags, pending } = await useTags()

useSeoMeta({
  title: '标签 - Typecho Blog',
  description: '浏览所有文章标签',
})
</script>

<template>
  <div>
    <CommonHeroSection
      title="热门标签"
      description="通过标签发现更多相关内容"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Tags Cloud -->
      <div v-else class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.mid"
          :to="`/tag/${tag.mid}`"
          class="group px-6 py-3 bg-white dark:bg-slate-900 rounded-xl shadow-soft hover:shadow-medium transition-all"
        >
          <span class="font-medium group-hover:text-primary-500 transition-colors">
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