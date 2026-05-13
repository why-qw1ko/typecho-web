<script setup lang="ts">

defineProps<{
  title: string
  description?: string
  image?: string
}>()

onMounted(() => {
  
})
</script>

<template>
  <section class="hero-content relative overflow-hidden py-20 lg:py-32">
    <!-- Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 text-center">
      <!-- Title -->
      <h1 class="hero-title text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
        <span class="gradient-text">{{ title }}</span>
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        class="hero-description text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
      >
        {{ description }}
      </p>

      <!-- Image -->
      <div v-if="image" class="mt-8">
        <img
          :src="image"
          :alt="title"
          class="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
        >
      </div>

      <!-- Slot -->
      <div class="hero-buttons mt-8">
        <slot />
      </div>
    </div>
  </section>
</template>