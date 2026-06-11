<script setup lang="ts">
import type { Category, Tag } from '~/types'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 导航菜单项 - 与 Header 保持一致
const navItems = [
  { label: t('home'), to: '/' },
  { label: t('categories'), to: '/category' },
  { label: t('tags'), to: '/tag' },
  { label: t('search'), to: '/search' },
  { label: t('about'), to: '/about' },
]

// 预留位置：自定义菜单项（可在此添加）
const customMenuItems: Array<{ label: string, to: string }> = [
  // { label: '示例菜单', to: '/example' },
]

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

const sidebarRef = ref<HTMLElement | null>(null)

// 根据文章数量计算标签大小
const getTagSize = (count: number) => {
  if (count >= 10) return 'text-xs px-3 py-1.5'
  if (count >= 5) return 'text-xs px-3 py-1.5'
  return 'text-xs px-2 py-1'
}

// 滚动入场动画
onMounted(() => {
  if (!sidebarRef.value) return
  const cards = sidebarRef.value.querySelectorAll('.sidebar-card')

  gsap.set(cards, { opacity: 0, x: -30 })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(cards, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(sidebarRef.value)
})
</script>

<template>
  <aside
    ref="sidebarRef"
    class="space-y-6"
  >
    <!-- Navigation Menu -->
    <div class="sidebar-card bg-white dark:bg-slate-900 rounded-2xl shadow-card p-6">
      <h3 class="text-lg font-display font-bold mb-4 text-slate-800 dark:text-slate-200">
        {{ t('menu') }}
      </h3>
      <nav class="space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-medium"
          active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Custom Menu (Reserved) -->
    <div class="sidebar-card bg-white dark:bg-slate-900 rounded-2xl shadow-card p-6" v-if="customMenuItems.length">
      <h3 class="text-lg font-display font-bold mb-4 text-slate-800 dark:text-slate-200">
        更多
      </h3>
      <nav class="space-y-1">
        <NuxtLink
          v-for="item in customMenuItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-medium"
          active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Categories -->
    <div class="sidebar-card bg-white dark:bg-slate-900 rounded-2xl shadow-card p-6">
      <h3 class="text-lg font-display font-bold mb-4 text-slate-800 dark:text-slate-200">
        <span class="gradient-text">{{ t('categories') }}</span>
      </h3>
      <div class="space-y-2">
        <NuxtLink
          v-for="category in categories"
          :key="category.mid"
          :to="`/category/${category.mid}`"
          class="flex items-center justify-between group p-2.5 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
        >
          <span class="font-medium text-slate-600 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
            {{ category.name }}
          </span>
          <span class="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full flex-shrink-0 ml-2">
            {{ category.count }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Tags -->
    <div class="sidebar-card bg-white dark:bg-slate-900 rounded-2xl shadow-card p-6">
      <h3 class="text-lg font-display font-bold mb-4 text-slate-800 dark:text-slate-200">
        <span class="gradient-text">{{ t('hotTags') }}</span>
      </h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.mid"
          :to="`/tag/${tag.mid}`"
          class="rounded-full font-medium transition-all duration-300"
          :class="getTagSize(tag.count)"
        >
          #{{ tag.name }}
          <span class="ml-1 opacity-60">({{ tag.count }})</span>
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>
