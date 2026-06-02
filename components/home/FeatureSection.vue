<script setup lang="ts">
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)

const features = computed(() => [
  {
    icon: 'rocket',
    title: t('fastExperience'),
    description: t('fastExperienceDesc'),
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: 'moon',
    title: t('darkModeFeature'),
    description: t('darkModeDesc'),
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: 'mobile',
    title: t('responsiveDesign'),
    description: t('responsiveDesc'),
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: 'code',
    title: t('codeHighlight'),
    description: t('codeHighlightDesc'),
    color: 'from-warm-500 to-warm-600',
  },
])

// 滚动入场动画
onMounted(() => {
  if (!sectionRef.value) return
  const cards = sectionRef.value.querySelectorAll('.feature-card')

  gsap.set(cards, { opacity: 0, y: 40 })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
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
  <section ref="sectionRef" class="feature-section py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          <span class="gradient-text">{{ t('whyChooseUs') }}</span>
        </h2>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {{ t('whyChooseUsDesc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 group hover:-translate-y-1"
        >
          <div
            class="w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
            :class="feature.color"
          >
            <!-- Rocket -->
            <svg v-if="feature.icon === 'rocket'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.98 14.98 0 00-6.16 12.12M3.34 9.47a6 6 0 005.84 7.38V12m-.002-2.58A14.98 14.98 0 019.631 8.41" />
            </svg>
            <!-- Moon -->
            <svg v-else-if="feature.icon === 'moon'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <!-- Mobile -->
            <svg v-else-if="feature.icon === 'mobile'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <!-- Code -->
            <svg v-else-if="feature.icon === 'code'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
