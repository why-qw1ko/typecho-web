<script setup lang="ts">
import type { PostWrapper, PageResult } from '~/types'

const route = useRoute()
const router = useRouter()
import { useI18n } from 'vue-i18n'
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

const posts = computed(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.map((item: PostWrapper) => {
    const content = item.content || item
    return {
      cid: content?.cid,
      title: content?.title || '',
      text: content?.text || '',
      created: content?.created || 0,
    }
  })
})

useHead({
  title: computed(() => query.value ? `${t('searchResults')}: ${query.value} - Typecho Blog` : `${t('search')} - Typecho Blog`),
  meta: [
    { name: 'description', content: '搜索文章内容' }
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
            {{ query ? t('searchResults') : t('searchArticles') }}
          </span>
        </h1>
        <p class="text-lg text-slate-600 mb-8">{{ t('inputSearchKeyword') }}</p>

        <div class="max-w-xl mx-auto">
          <form @submit.prevent="handleSearch" class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('searchPlaceholder')"
              class="w-full px-6 py-4 pr-14 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-lg"
            >
            <button
              type="submit"
              @click="handleSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Results -->
      <div v-else-if="query && posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.cid"
          class="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 class="font-semibold text-xl mb-2 text-blue-600 dark:text-blue-400">
            <NuxtLink :to="`/post/${post.cid}`" class="hover:underline">
              {{ post.title }}
            </NuxtLink>
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
            {{ post.text?.replace(/<[^>]*>/g, '').replace(/<!--markdown-->/g, '').slice(0, 150) }}
          </p>
        </div>
      </div>

      <!-- Empty Search -->
      <div v-else-if="query && !posts.length && !pending" class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">{{ t('notFoundRelated') }}</p>
        <NuxtLink to="/search" class="text-blue-500 hover:underline mt-4 inline-block">
          {{ t('searchAgain') }}
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else-if="!query" class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">{{ t('inputSearchKeyword') }}</p>
      </div>
    </div>
  </div>
</template>