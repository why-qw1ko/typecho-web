<script setup lang="ts">
import { gsap } from 'gsap'

// 加载精选文章
const { data: postsData } = await usePosts({
  pageNum: 1,
  pageSize: 3,
  type: 'post',
  status: 'publish',
})

const featuredPosts = computed(() => postsData.value?.list?.slice(0, 3) || [])

onMounted(() => {
  gsap.from('.featured-post', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out',
  })
})
</script>

<template>
  <section class="py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          <span class="gradient-text">精选推荐</span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          编辑精选的优质内容
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, index) in featuredPosts"
          :key="post.cid"
          :to="`/post/${post.cid}`"
          class="featured-post group relative overflow-hidden rounded-2xl aspect-[4/5]"
        >
          <!-- Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500" />

          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
            <span
              class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-3 w-fit"
            >
              精选 #{{ index + 1 }}
            </span>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-white/80 text-sm line-clamp-2">
              点击阅读全文 →
            </p>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>