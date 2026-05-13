<script setup lang="ts">
import type { PostWrapper, Post } from '~/types'
import Pagination from '~/components/common/Pagination.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 分页状态
const currentPage = ref(1)
const pageSize = 10

// 响应式参数
const postsParams = computed(() => ({
  pageNum: currentPage.value,
  pageSize,
  type: 'post',
  status: 'publish',
}))

// 获取文章列表 - 使用 computed 方式传递参数，支持响应式更新
const { data: postsData, pending, error, refresh } = await usePosts(postsParams, {
  lazy: false,
  dedupe: 'defer',
  key: 'home-posts-list',
})

const posts = computed(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper): Post => {
    const content = item.content || item
    return {
      ...content,
      slug: content.slug || '',
      modified: content.modified || content.created,
      type: content.type || 'post',
      status: content.status || 'publish',
      authorId: content.authorId || (item.author?.uid || 0),
    }
  })
})

// 计算总页数
const totalPages = computed(() => {
  const total = postsData.value?.total || 0
  return Math.ceil(total / pageSize)
})

// 错误处理
if (error.value) {
  console.error('Failed to fetch posts:', error.value)
}

// 分页变化处理
const handlePageChange = async (page: number) => {
  currentPage.value = page
  // 等待响应式参数更新后刷新数据
  await nextTick()
  await refresh()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Title -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
        <span class="gradient-text">{{ t('latestPosts') }}</span>
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('latestPostsDesc') }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.cid"
        :post="post"
        class="post-card"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!pending && !posts.length" class="text-center py-12">
      <p class="text-slate-500 dark:text-slate-400">{{ t('noPosts') }}</p>
    </div>

    <!-- Pagination -->
    <div v-if="posts.length && totalPages > 0" class="flex justify-center mt-12">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>