<script setup lang="ts">
import type { PostWrapper } from '~/types'
import Pagination from '~/components/common/Pagination.vue'
import { decodeHtml } from '~/composables/useHtml'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 分页状态
const currentPage = ref(1)
const pageSize = 10

// 格式化日期
const formatDate = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 获取文章列表
const { data: postsData, pending, error, refresh } = await usePosts({
  pageNum: 1,
  pageSize,
  type: 'post',
  status: 'publish',
}, {
  key: 'home-posts-list',
})

const posts = computed(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper) => {
    const content = item.content || item
    return {
      cid: content?.cid,
      title: content?.title || '',
      cover: content?.cover,
      created: content?.created || 0,
      modified: content?.modified || content?.created,
      category: item.category,
      tags: item.tags,
      views: content?.views || 0,
      commentsNum: content?.commentsNum || 0,
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
  await nextTick()
  await refresh()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
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

      <!-- Single Column Post List -->
      <div class="max-w-3xl mx-auto space-y-6">
        <article
          v-for="post in posts"
          :key="post.cid"
          class="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-0.5"
        >
          <!-- Cover Image -->
          <div class="relative overflow-hidden aspect-[21/9]">
            <img
              v-if="post.cover"
              :src="post.cover"
              :alt="decodeHtml(post.title)"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-6xl font-display font-bold text-white/20">
                  {{ post.title.charAt(0) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Category & Date -->
            <div class="flex items-center gap-3 text-sm mb-3">
              <span
                v-if="post.category"
                class="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-medium"
              >
                {{ post.category.name }}
              </span>
              <span class="text-slate-400 dark:text-slate-500">
                {{ formatDate(post.created) }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="font-display font-bold text-xl mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
              <NuxtLink :to="`/post/${post.cid}`" class="block">
                {{ decodeHtml(post.title) }}
              </NuxtLink>
            </h2>

            <!-- Tags & Meta -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
                <NuxtLink
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag.mid"
                  :to="`/tag/${tag.mid}`"
                  class="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded hover:bg-primary-500 hover:text-white transition-all"
                >
                  #{{ tag.name }}
                </NuxtLink>
              </div>

              <div class="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ post.views || 0 }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {{ post.commentsNum || 0 }}
                </span>
              </div>
            </div>

            <!-- Read More -->
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <NuxtLink
                :to="`/post/${post.cid}`"
                class="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 font-medium text-sm group-hover:gap-2.5 transition-all duration-300"
              >
                {{ t('readMore') }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
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
  </section>
</template>
