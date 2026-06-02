<script setup lang="ts">
import type { PostWrapper } from '~/types'
import { decodeHtml } from '~/composables/useHtml'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

interface FeaturedPost {
  cid: number
  title: string
  text: string
  created: number
  category?: PostWrapper['category']
  tags?: PostWrapper['tags']
  views: number
  commentsNum: number
  cover?: string
}

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

// 获取精选文章
const { data: postsData, pending, error } = await usePosts({
  pageNum: 1,
  pageSize: 3,
  type: 'post',
  status: 'publish',
}, {
  key: 'home-featured-posts',
})

const featuredPosts = computed<FeaturedPost[]>(() => {
  if (!postsData.value) return []
  const list = postsData.value?.list || []
  return list.slice(0, 3).map((item: PostWrapper) => {
    const content = item.content || item
    return {
      cid: content?.cid,
      title: content?.title || '',
      text: content?.text || '',
      created: content?.created || 0,
      category: item.category,
      tags: item.tags,
      views: content?.views || 0,
      commentsNum: content?.commentsNum || 0,
      cover: content?.cover,
    }
  })
})

// 错误处理
if (error.value) {
  console.error('Failed to fetch featured posts:', error.value)
}

// 滚动入场动画
onMounted(() => {
  if (!sectionRef.value) return
  const cards = sectionRef.value.querySelectorAll('.featured-card')

  gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          <span class="gradient-text">{{ t('featured') }}</span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          {{ t('featuredDesc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, index) in featuredPosts"
          :key="post.cid"
          :to="`/post/${post.cid}`"
          class="featured-card group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
        >
          <!-- Background -->
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="decodeHtml(post.title)"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
          <div
            v-else
            class="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500"
          />

          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <span
              class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-3 w-fit"
            >
              {{ t('featured') }} #{{ index + 1 }}
            </span>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors line-clamp-2">
              {{ decodeHtml(post.title) }}
            </h3>
            <p class="text-white/70 text-sm flex items-center gap-1">
              {{ t('readMore') }}
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </p>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
