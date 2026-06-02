<script setup lang="ts">
import type { Category, Tag } from '~/types'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 获取分类和标签
const { data: categories, error: categoriesError } = await useCategories()
const { data: tags, error: tagsError } = await useTags()

// 错误处理
if (categoriesError.value) {
  console.error('Failed to fetch categories:', categoriesError.value)
}
if (tagsError.value) {
  console.error('Failed to fetch tags:', tagsError.value)
}

const sectionRef = ref<HTMLElement | null>(null)

// 根据文章数量计算标签大小
const getTagSize = (count: number) => {
  if (count >= 10) return 'text-base px-5 py-2.5'
  if (count >= 5) return 'text-sm px-4 py-2'
  return 'text-xs px-3 py-1.5'
}

// 滚动入场动画
onMounted(() => {
  if (!sectionRef.value) return
  const categoryCards = sectionRef.value.querySelectorAll('.category-item')
  const tagCards = sectionRef.value.querySelectorAll('.tag-item')

  gsap.set(categoryCards, { opacity: 0, x: -30 })
  gsap.set(tagCards, { opacity: 0, scale: 0.8 })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(categoryCards, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          })
          gsap.to(tagCards, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.3,
            ease: 'back.out(1.7)',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Categories -->
        <div>
          <h2 class="text-2xl font-display font-bold mb-6">
            <span class="gradient-text">{{ t('categories') }}</span>
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink
              v-for="category in categories"
              :key="category.mid"
              :to="`/category/${category.mid}`"
              class="category-item group p-4 bg-white dark:bg-slate-900 rounded-xl shadow-card hover:shadow-medium transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5"
            >
              <!-- 左侧装饰条 -->
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 class="font-semibold mb-1 group-hover:text-primary-500 transition-colors pl-2">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 pl-2">
                {{ category.count }} {{ t('posts') }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <h2 class="text-2xl font-display font-bold mb-6">
            <span class="gradient-text">{{ t('hotTags') }}</span>
          </h2>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="tag in tags"
              :key="tag.mid"
              :to="`/tag/${tag.mid}`"
              class="tag-item bg-slate-100 dark:bg-slate-800 rounded-full font-medium hover:bg-primary-500 hover:text-white hover:shadow-glow transition-all duration-300"
              :class="getTagSize(tag.count)"
            >
              #{{ tag.name }}
              <span class="ml-1 text-slate-400 dark:text-slate-500 text-xs">({{ tag.count }})</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
