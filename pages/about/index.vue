<script setup lang="ts">
import { gsap } from 'gsap'
const { t } = useI18n()

const skills = [
  { name: 'Vue.js', level: 90, color: 'from-emerald-400 to-emerald-600' },
  { name: 'Nuxt', level: 85, color: 'from-primary-400 to-primary-600' },
  { name: 'TypeScript', level: 88, color: 'from-blue-400 to-blue-600' },
  { name: 'Spring Boot', level: 80, color: 'from-emerald-500 to-emerald-700' },
  { name: 'MySQL', level: 75, color: 'from-warm-400 to-warm-600' },
]

const timeline = [
  { year: '2024', title: '博客上线', desc: '使用 Nuxt 4 + Spring Boot 构建' },
  { year: '2023', title: '开始学习', desc: '深入学习前端和后端技术' },
  { year: '2022', title: '初次接触', desc: '第一次接触 Web 开发' },
]

const skillsRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)

// 技能条入场动画
onMounted(() => {
  if (skillsRef.value) {
    const bars = skillsRef.value.querySelectorAll('.skill-bar-fill')
    gsap.set(bars, { width: 0 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bars.forEach((bar, i) => {
              const targetWidth = bar.getAttribute('data-width') || '0%'
              gsap.to(bar, {
                width: targetWidth,
                duration: 1,
                delay: i * 0.15,
                ease: 'power2.out',
              })
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(skillsRef.value)
  }

  // 时间线入场动画
  if (timelineRef.value) {
    const items = timelineRef.value.querySelectorAll('.timeline-item')
    gsap.set(items, { opacity: 0, x: -30 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(items, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.2,
              ease: 'power2.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(timelineRef.value)
  }
})

useHead({
  title: computed(() => `${t('about')} - Typecho Blog`),
  meta: [
    { name: 'description', content: computed(() => t('heroDesc')) }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <CommonPageHero
      :title="t('about')"
      :description="t('heroDesc')"
    />

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Introduction -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6 gradient-text inline-block">
            {{ t('learnMore') }}
          </h2>
          <div class="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <p>{{ t('aboutIntro') }}</p>
          </div>
        </section>

        <!-- Skills -->
        <section ref="skillsRef" class="mb-16">
          <h2 class="text-2xl font-bold mb-8 gradient-text inline-block">
            {{ t('skills') }}
          </h2>
          <div class="space-y-6">
            <div v-for="skill in skills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="font-medium text-slate-700 dark:text-slate-300">{{ skill.name }}</span>
                <span class="text-sm text-slate-500 dark:text-slate-400 font-mono">{{ skill.level }}%</span>
              </div>
              <div class="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  class="skill-bar-fill h-full rounded-full bg-gradient-to-r transition-all"
                  :class="skill.color"
                  :data-width="`${skill.level}%`"
                  :style="{ width: 0 }"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline -->
        <section ref="timelineRef">
          <h2 class="text-2xl font-bold mb-8 gradient-text inline-block">
            {{ t('growthTimeline') }}
          </h2>
          <div class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />
            <div class="space-y-8">
              <div
                v-for="(item, index) in timeline"
                :key="index"
                class="timeline-item relative pl-16"
              >
                <!-- 圆点 -->
                <div class="absolute left-4 w-5 h-5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-glow ring-4 ring-white dark:ring-slate-950" />
                <!-- 卡片 -->
                <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-card hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5">
                  <span class="text-sm font-mono font-medium text-primary-500 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded">
                    {{ item.year }}
                  </span>
                  <h3 class="font-semibold text-lg mt-2">{{ item.title }}</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
