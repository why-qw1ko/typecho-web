<script setup lang="ts">
import { gsap } from 'gsap'

defineProps<{
  title: string
  description?: string
  image?: string
}>()

const heroRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!heroRef.value) return
  const els = heroRef.value.querySelectorAll('.hero-animate')
  gsap.from(els, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
  })
})
</script>

<template>
  <section ref="heroRef" class="hero-content relative overflow-hidden py-20 lg:py-32">
    <!-- Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float-slow" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float-slower" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-400/5 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 text-center">
      <!-- Title -->
      <h1 class="hero-animate text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
        <span class="gradient-text">{{ title }}</span>
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        class="hero-animate text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
      >
        {{ description }}
      </p>

      <!-- Image -->
      <div v-if="image" class="hero-animate mt-8">
        <img
          :src="image"
          :alt="title"
          class="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
        >
      </div>

      <!-- Slot -->
      <div class="hero-animate mt-8">
        <slot />
      </div>
    </div>
  </section>
</template>
