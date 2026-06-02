<script setup lang="ts">
import type { PostWrapper, Post, PageResult } from '~/types'
import { decodeHtml } from '~/composables/useHtml'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const searchQuery = ref((route.query.q as string) || '')
const query = computed(() => (route.query.q as string) || '')

// 使用 useApiGet 获取搜索结果 - params 会自动响应式更新
const { data: postsData, pending, error } = await useApiGet<PageResult<PostWrapper>>('/contents/page', {
  pageNum: 1,
  pageSize: 20,
  keyword: query,
  type: 'post',
  status: 'publish',
})

// 搜索处理
const handleSearch = () => {
  const trimmed = searchQuery.value.trim()
  if (trimmed) {
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }
}

const posts = computed<Post[]>(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper) => {
    const content = item.content || item
    return {
      ...content,
      slug: content.slug || '',
      modified: content.modified || content.created,
      type: content.type || 'post',
      status: content.status || 'publish',
      authorId: content.authorId || (item.author?.uid || 0),
      category: item.category,
      tags: item.tags,
    }
  })
})

useHead({
  title: computed(() => query.value ? `${t('searchResults')}: ${query.value} - Typecho Blog` : `${t('search')} - Typecho Blog`),
  meta: [
    { name: 'description', content: computed(() => t('inputSearchKeyword')) }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonPageHero
      :title="query ? t('searchResults') : t('searchArticles')"
      :description="t('inputSearchKeyword')"
    >
      <div class="max-w-xl mx-auto mt-4">
        <form @submit.prevent="handleSearch" class="relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('searchPlaceholder')"
            class="w-full px-6 py-4 pr-14 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg shadow-soft"
          >
          <button
            type="submit"
            @click="handleSearch"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </CommonPageHero>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Results -->
      <div v-else-if="query && posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard
          v-for="post in posts"
          :key="post.cid"
          :post="post"
        />
      </div>

      <!-- Empty Search -->
      <div v-else-if="query && !posts.length && !pending" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-lg mb-4">{{ t('notFoundRelated') }}</p>
        <button
          @click="searchQuery = ''; $router.push('/search')"
          class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          {{ t('searchAgain') }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!query" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-lg">{{ t('inputSearchKeyword') }}</p>
      </div>
    </div>
  </div>
</template>
