<script setup lang="ts">
import type { PostWrapper, Post } from '~/types'
import { decodeHtml } from '~/composables/useHtml'
const { t } = useI18n()
const route = useRoute()
const mid = computed(() => route.params.id as string)

// 加载分类下的文章
const { data: postsData, pending } = await usePostsByCategory(Number(mid.value))

// 将 PostWrapper 转换为 Post
const posts = computed<Post[]>(() => {
  if (!postsData.value) return []
  return postsData.value.map((item: PostWrapper) => {
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
  title: computed(() => `${t('categoryPosts')} - Typecho Blog`),
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonPageHero
      :title="t('categoryPosts')"
      :description="t('categoryPostsDesc')"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Posts -->
      <div v-else-if="posts?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard
          v-for="post in posts"
          :key="post.cid"
          :post="post"
        />
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-lg mb-4">{{ t('noCategoryPosts') }}</p>
        <NuxtLink to="/category" class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('backToCategoryList') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
