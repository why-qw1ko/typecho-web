<script setup lang="ts">
import { gsap } from 'gsap'

defineProps<{
  title: string
  description?: string
}>()

const heroRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!heroRef.value) return
  const els = heroRef.value.querySelectorAll('.hero-animate')
  gsap.from(els, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <section ref="heroRef" class="relative overflow-hidden py-12 lg:py-16">
    <!-- Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div class="absolute top-0 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 text-center">
      <h1 class="hero-animate text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
        <span class="gradient-text">{{ title }}</span>
      </h1>
      <p
        v-if="description"
        class="hero-animate text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
      >
        {{ description }}
      </p>
      <div class="hero-animate mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>
