<script setup lang="ts">
import type { PostWrapper } from '~/types'
import { decodeHtml } from '~/composables/useHtml'

const route = useRoute()
const query = computed(() => route.query.q as string || '')

const { data: postsData, pending } = await usePosts({
  pageNum: 1,
  pageSize: 20,
  keyword: query.value,
})

const posts = computed(() => {
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper) => ({
    cid: item.content?.cid,
    title: item.content?.title || '',
    text: item.content?.text || '',
  }))
})

useHead({
  title: `搜索：${query.value} - Typecho Blog`,
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            搜索结果
          </span>
        </h1>
        <p class="text-lg text-slate-600">关键词：{{ query }}</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Results -->
      <div v-else-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.cid"
          class="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md"
        >
          <h3 class="font-semibold text-xl mb-2 text-blue-600">
            <NuxtLink :to="`/post/${post.cid}`" class="hover:underline">
              {{ decodeHtml(post.title) }}
            </NuxtLink>
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
            {{ post.text?.replace(/<[^>]*>/g, '').slice(0, 150) }}
          </p>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">未找到相关文章</p>
        <NuxtLink to="/search" class="text-blue-500 hover:underline mt-4 inline-block">
          重新搜索
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
