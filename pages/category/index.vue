<script setup lang="ts">
// 加载分类列表
const { data: categories, pending } = await useCategories()

useHead({
  title: '分类 - Typecho Blog',
  meta: [
    { name: 'description', content: '浏览所有文章分类' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            文章分类
          </span>
        </h1>
        <p class="text-lg text-slate-600">按类别浏览文章，快速找到感兴趣的内容</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.mid"
          :to="`/category/${category.mid}`"
          class="group p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              {{ category.name.charAt(0) }}
            </div>
            <div>
              <h3 class="font-semibold text-lg group-hover:text-blue-500 transition-colors">
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
