<script setup lang="ts">
import type { PostWrapper } from '~/types'
import { decodeHtml } from '~/composables/useHtml'
import { gsap } from 'gsap'

const route = useRoute()
const { t } = useI18n()
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
  title: post.value ? `${decodeHtml(post.value.title)} - Typecho Blog` : `${t('articleNotFound')} - Typecho Blog`,
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

// 入场动画
const articleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!articleRef.value) return
  const headerEls = articleRef.value.querySelectorAll('.article-header-animate')
  gsap.from(headerEls, {
    opacity: 0,
    y: 25,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-32">
      <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-32">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-4">
        {{ t('articleNotFound') }}
      </h1>
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ t('backHome') }}
      </NuxtLink>
    </div>

    <!-- Content -->
    <article v-else-if="post" ref="articleRef">
      <!-- Header Banner -->
      <header class="relative overflow-hidden py-16 lg:py-24">
        <!-- Background -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float-slow" />
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float-slower" />
        </div>

        <div class="container mx-auto px-4 max-w-4xl text-center">
          <!-- Category -->
          <div class="article-header-animate mb-6">
            <NuxtLink
              v-if="post.category"
              :to="`/category/${post.category.mid}`"
              class="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              {{ post.category.name }}
            </NuxtLink>
          </div>

          <!-- Title -->
          <h1 class="article-header-animate text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 leading-tight">
            {{ decodeHtml(post.title) }}
          </h1>

          <!-- Meta -->
          <div class="article-header-animate flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(post.created) }}
            </span>
            <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ post.views || 0 }} {{ t('viewsCount') }}
            </span>
            <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {{ post.commentsNum || 0 }} {{ t('commentsCount') }}
            </span>
          </div>

          <!-- Tags -->
          <div v-if="post.tags?.length" class="article-header-animate flex flex-wrap justify-center gap-2 mt-6">
            <NuxtLink
              v-for="tag in post.tags"
              :key="tag.mid"
              :to="`/tag/${tag.mid}`"
              class="px-3 py-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-slate-600 dark:text-slate-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-3xl mx-auto">
          <div class="prose-content" v-html="renderedContent" />
        </div>
      </div>

      <!-- Author -->
      <div class="container mx-auto px-4 pb-16">
        <div class="max-w-3xl mx-auto">
          <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-glow">
                {{ post.author?.screenName?.charAt(0) || 'A' }}
              </div>
              <div>
                <div class="font-semibold text-lg">{{ post.author?.screenName || t('author') }}</div>
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  {{ t('authorLabel') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
