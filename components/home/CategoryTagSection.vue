<script setup lang="ts">
import { gsap } from 'gsap'

// 加载分类和标签
const { data: categories } = await useCategories()
const { data: tags } = await useTags()

onMounted(() => {
  gsap.from('.category-item', {
    opacity: 0,
    x: -30,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.2,
  })

  gsap.from('.tag-item', {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    delay: 0.4,
  })
})
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Categories -->
        <div>
          <h2 class="text-2xl font-display font-bold mb-6">
            <span class="gradient-text">分类</span>
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink
              v-for="category in categories"
              :key="category.mid"
              :to="`/category/${category.mid}`"
              class="category-item group p-4 bg-white dark:bg-slate-900 rounded-xl shadow-soft hover:shadow-medium transition-all"
            >
              <h3 class="font-semibold mb-1 group-hover:text-primary-500 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ category.count }} 篇文章
              </p>
            </NuxtLink>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <h2 class="text-2xl font-display font-bold mb-6">
            <span class="gradient-text">热门标签</span>
          </h2>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="tag in tags"
              :key="tag.mid"
              :to="`/tag/${tag.mid}`"
              class="tag-item px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-primary-500 hover:text-white transition-all"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>