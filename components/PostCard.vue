<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
  featured?: boolean
}>()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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

// 截取摘要
const excerpt = computed(() => {
  const text = props.post.text?.replace(/<[^>]*>/g, '').replace(/<!--markdown-->/g, '') || ''
  return text.length > 150 ? text.slice(0, 150) + '...' : text
})
</script>

<template>
  <article
    class="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
  >
    <!-- Cover Image Placeholder -->
    <div class="relative overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500 aspect-[16/9]">
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-6xl font-display font-bold text-white/30">
          {{ post.title?.charAt(0) || 'P' }}
        </span>
      </div>
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category & Date -->
      <div class="flex items-center gap-3 text-sm mb-3">
        <span
          v-if="post.category"
          class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-medium"
        >
          {{ post.category.name }}
        </span>
        <span class="text-slate-500 dark:text-slate-400">
          {{ formatDate(post.created) }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="font-display font-bold text-xl mb-2 group-hover:text-primary-500 transition-colors line-clamp-1">
        <NuxtLink :to="`/post/${post.cid}`" class="block">
          {{ post.title }}
        </NuxtLink>
      </h2>

      <!-- Excerpt -->
      <p class="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 text-sm">
        {{ excerpt }}
      </p>

      <!-- Tags & Meta Row -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in post.tags"
            :key="tag.mid"
            class="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
          >
            #{{ tag.name }}
          </span>
        </div>

        <!-- Meta -->
        <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 ml-auto">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ post.views || 0 }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {{ post.commentsNum || 0 }}
          </span>
        </div>
      </div>

      <!-- Read More -->
      <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <NuxtLink
          :to="`/post/${post.cid}`"
          class="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium text-sm group-hover:gap-2 transition-all"
        >
          {{ t('readMore') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>