<script setup lang="ts">
import { gsap } from 'gsap'
import type { PostWrapper } from '~/types'

const { data: postsData, pending } = await usePosts({
  pageNum: 1,
  pageSize: 10,
  type: 'post',
  status: 'publish',
})

const posts = computed(() => {
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper) => ({
    cid: item.content?.cid,
    title: item.content?.title || '',
    text: item.content?.text || '',
    created: item.content?.created || 0,
    category: item.category,
    tags: item.tags,
    views: item.content?.views || 0,
    commentsNum: item.content?.commentsNum || 0,
    author: item.author,
  }))
})

onMounted(() => {
  gsap.from('.post-card', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.3,
  })
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Title -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
        <span class="gradient-text">最新文章</span>
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        探索最新的技术文章和教程
      </p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard
        v-for="(post, index) in posts"
        :key="post.cid"
        :post="post"
        :featured="index === 0"
        class="post-card"
      />
    </div>

    <!-- Load More -->
    <div v-if="posts.length" class="text-center mt-12">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
      >
        查看更多
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>