<script setup lang="ts">
import type { PostWrapper } from '~/types'
import { decodeHtml } from '~/composables/useHtml'

const route = useRoute()
const cid = computed(() => route.params.id as string)

const { data: postWrapper, pending, error } = await usePost(cid.value)
const { render } = useMarkdown()

const post = computed(() => {
  if (!postWrapper.value) return null
  return {
    title: postWrapper.value.content?.title || '',
    text: postWrapper.value.content?.text || '',
    created: postWrapper.value.content?.created || 0,
    modified: postWrapper.value.content?.modified || 0,
    views: postWrapper.value.content?.views || 0,
    commentsNum: postWrapper.value.content?.commentsNum || 0,
    category: postWrapper.value.category,
    tags: postWrapper.value.tags || [],
    author: postWrapper.value.author,
  }
})

useHead({
  title: post.value ? `${decodeHtml(post.value.title)} - Typecho Blog` : '文章详情 - Typecho Blog',
  meta: [
    { name: 'description', content: post.value?.text?.replace(/<[^>]*>/g, '').slice(0, 160) || '' }
  ]
})

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

const renderedContent = computed(() => {
  if (!post.value?.text) return ''
  return render(post.value.text)
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <h1 class="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-4">
        文章不存在
      </h1>
      <NuxtLink to="/" class="text-blue-500 hover:underline">
        返回首页
      </NuxtLink>
    </div>

    <!-- Content -->
    <article v-else-if="post" class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-12 text-center">
        <!-- Category -->
        <span
          v-if="post.category"
          class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
        >
          {{ post.category.name }}
        </span>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {{ decodeHtml(post.title) }}
        </h1>

        <!-- Meta -->
        <div class="flex flex-wrap items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
          <span>{{ formatDate(post.created) }}</span>
          <span>·</span>
          <span>{{ post.views || 0 }} 次阅读</span>
          <span>·</span>
          <span>{{ post.commentsNum || 0 }} 条评论</span>
        </div>

        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-wrap justify-center gap-2 mt-6">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag.mid"
            :to="`/tag/${tag.mid}`"
            class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm hover:bg-blue-500 hover:text-white transition-colors"
          >
            #{{ tag.name }}
          </NuxtLink>
        </div>
      </header>

      <!-- Content -->
      <div class="prose max-w-none dark:prose-invert" v-html="renderedContent" />

      <!-- Author -->
      <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {{ post.author?.screenName?.charAt(0) || 'A' }}
          </div>
          <div>
            <div class="font-semibold">{{ post.author?.screenName || '作者' }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              本文作者
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
