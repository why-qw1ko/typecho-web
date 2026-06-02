<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 获取统计数据
const { data: stats, error } = await useStats()

// 错误处理
if (error.value) {
  console.error('Failed to fetch stats:', error.value)
}

// 计数动画
const sectionRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)
const displayValues = reactive({
  posts: 0,
  categories: 0,
  tags: 0,
})

const animateCount = (target: number, key: keyof typeof displayValues, duration = 1500) => {
  const start = 0
  const startTime = Date.now()
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    displayValues[key] = Math.round(start + (target - start) * eased)
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          animateCount(stats.value?.totalPosts || 0, 'posts')
          animateCount(stats.value?.totalCategories || 0, 'categories')
          animateCount(stats.value?.totalTags || 0, 'tags')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="py-16 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 relative overflow-hidden">
    <!-- 装饰性元素 -->
    <div class="absolute inset-0 -z-0">
      <div class="absolute top-0 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-slow" />
      <div class="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float-slower" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Posts -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2 tabular-nums">
            {{ displayValues.posts }}
          </div>
          <div class="text-white/80 font-medium text-sm uppercase tracking-wider">{{ t('posts') }}</div>
        </div>

        <!-- Categories -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2 tabular-nums">
            {{ displayValues.categories }}
          </div>
          <div class="text-white/80 font-medium text-sm uppercase tracking-wider">{{ t('categories') }}</div>
        </div>

        <!-- Tags -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2 tabular-nums">
            {{ displayValues.tags }}
          </div>
          <div class="text-white/80 font-medium text-sm uppercase tracking-wider">{{ t('tags') }}</div>
        </div>

        <!-- Views -->
        <div class="text-center text-white">
          <div class="text-4xl md:text-5xl font-display font-bold mb-2 tabular-nums">
            {{ stats?.totalUsers || 0 }}
          </div>
          <div class="text-white/80 font-medium text-sm uppercase tracking-wider">{{ t('views') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
