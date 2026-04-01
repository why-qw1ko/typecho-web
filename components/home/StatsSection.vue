<script setup lang="ts">
import { gsap } from 'gsap'

// 加载统计数据
const { data: stats } = await useStats()

// 动画数字
const animateNumber = (target: number) => {
  return ref(0)
}

const postsCount = animateNumber(stats.value?.totalPosts || 0)
const categoriesCount = animateNumber(stats.value?.totalCategories || 0)
const tagsCount = animateNumber(stats.value?.totalTags || 0)

onMounted(() => {
  gsap.from('.stat-card', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)',
  })
})
</script>

<template>
  <section class="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Posts -->
        <div class="stat-card text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalPosts || 0 }}
          </div>
          <div class="text-white/80 font-medium">篇文章</div>
        </div>

        <!-- Categories -->
        <div class="stat-card text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalCategories || 0 }}
          </div>
          <div class="text-white/80 font-medium">个分类</div>
        </div>

        <!-- Tags -->
        <div class="stat-card text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            {{ stats?.totalTags || 0 }}
          </div>
          <div class="text-white/80 font-medium">个标签</div>
        </div>

        <!-- Views -->
        <div class="stat-card text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2">
            10K+
          </div>
          <div class="text-white/80 font-medium">次访问</div>
        </div>
      </div>
    </div>
  </section>
</template>