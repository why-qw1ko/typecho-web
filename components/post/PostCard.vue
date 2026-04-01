<script setup lang="ts">
import type { Post } from '~/types'
import { gsap } from 'gsap'

const props = defineProps<{
  post: Post
  featured?: boolean
}>()

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 截取摘要
const excerpt = computed(() => {
  const text = props.post.text?.replace(/<[^>]*>/g, '') || ''
  return text.length > 150 ? text.slice(0, 150) + '...' : text
})

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    })
  }
})
</script>

<template>
  <article
    ref="cardRef"
    class="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
    :class="featured ? 'md:flex md:items-center' : ''"
  >
    <!-- Cover Image Placeholder -->
    <div
      class="relative overflow-hidden"
      :class="featured ? 'md:w-2/5 aspect-[16/10] md:aspect-auto md:h-full' : 'aspect-[16/9]'"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 opacity-80" />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-6xl font-display font-bold text-white/30">
          {{ post.title?.charAt(0) || 'P' }}
        </span>
      </div>
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <!-- Content -->
    <div
      class="p-6 md:p-8"
      :class="featured ? 'md:w-3/5' : ''"
    >
      <!-- Category & Date -->
      <div class="flex items-center gap-3 text-sm mb-4">
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
      <h2
        class="font-display font-bold text-xl md:text-2xl mb-3 group-hover:text-primary-500 transition-colors"
        :class="featured ? 'md:text-3xl' : ''"
      >
        <NuxtLink :to="`/post/${post.cid}`">
          {{ post.title }}
        </NuxtLink>
      </h2>

      <!-- Excerpt -->
      <p class="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
        {{ excerpt }}
      </p>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in post.tags"
          :key="tag.mid"
          class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
        >
          #{{ tag.name }}
        </span>
      </div>

      <!-- Meta -->
      <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <div class="flex items-center gap-4">
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

        <!-- Read More -->
        <NuxtLink
          :to="`/post/${post.cid}`"
          class="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium group-hover:gap-2 transition-all"
        >
          阅读全文
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>