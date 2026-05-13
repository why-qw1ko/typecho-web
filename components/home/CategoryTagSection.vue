<script setup lang="ts">
import type { Category, Tag } from '~/types'
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

</script>

<template>
  <section class="py-16">
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
              class="category-card group p-4 bg-white dark:bg-slate-900 rounded-xl shadow-soft hover:shadow-medium transition-all"
            >
              <h3 class="font-semibold mb-1 group-hover:text-primary-500 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
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
              class="tag-card px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-primary-500 hover:text-white transition-all"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>