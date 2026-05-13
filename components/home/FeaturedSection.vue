<script setup lang="ts">
import type { PostWrapper } from '~/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 获取精选文章
const { data: postsData, pending, error } = await usePosts({
  pageNum: 1,
  pageSize: 3,
  type: 'post',
  status: 'publish',
}, {
  key: 'home-featured-posts',
})

const featuredPosts = computed(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.slice(0, 3).map((item: PostWrapper) => {
    const content = item.content || item
    return {
      cid: content?.cid,
      title: content?.title || '',
      text: content?.text || '',
      created: content?.created || 0,
      category: item.category,
      tags: item.tags,
      views: content?.views || 0,
      commentsNum: content?.commentsNum || 0,
    }
  })
})

// 错误处理
if (error.value) {
  console.error('Failed to fetch featured posts:', error.value)
}
</script>

<template>
  <section class="py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          <span class="gradient-text">{{ t('featured') }}</span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          {{ t('featuredDesc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, index) in featuredPosts"
          :key="post.cid"
          :to="`/post/${post.cid}`"
          class="group relative overflow-hidden rounded-2xl aspect-[4/5]"
        >
          <!-- Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500" />

          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
            <span
              class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-3 w-fit"
            >
              {{ t('featured') }} #{{ index + 1 }}
            </span>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-white/80 text-sm line-clamp-2">
              {{ t('readMore') }} →
            </p>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>