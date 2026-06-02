<script setup lang="ts">
import type { PostWrapper, Post } from '~/types'
import { decodeHtml } from '~/composables/useHtml'
const { t } = useI18n()
const route = useRoute()
const mid = computed(() => route.params.id as string)

// 加载标签下的文章
const { data: postsData, pending } = await usePostsByTag(Number(mid.value))

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
  title: computed(() => `${t('tagPosts')} - Typecho Blog`),
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonPageHero
      :title="t('tagPosts')"
      :description="t('tagPostsDesc')"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-lg mb-4">{{ t('noTagPosts') }}</p>
        <NuxtLink to="/tag" class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('backToTagList') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
