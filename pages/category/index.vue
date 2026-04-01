<script setup lang="ts">
// 加载分类列表
const { data: categories, pending } = await useCategories()

useSeoMeta({
  title: '分类 - Typecho Blog',
  description: '浏览所有文章分类',
})
</script>

<template>
  <div>
    <CommonHeroSection
      title="文章分类"
      description="按类别浏览文章，快速找到感兴趣的内容"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.mid"
          :to="`/category/${category.mid}`"
          class="group p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-soft hover:shadow-medium transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              {{ category.name.charAt(0) }}
            </div>
            <div>
              <h3 class="font-semibold text-lg group-hover:text-primary-500 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ category.count }} 篇文章
              </p>
            </div>
          </div>
          <p v-if="category.description" class="mt-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {{ category.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>