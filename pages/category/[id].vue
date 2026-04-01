<script setup lang="ts">
const route = useRoute()
const mid = computed(() => route.params.id as string)

// 加载分类下的文章
const { data: posts, pending } = await usePostsByCategory(Number(mid.value))

useSeoMeta({
  title: `分类文章 - Typecho Blog`,
})
</script>

<template>
  <div>
    <CommonHeroSection
      title="分类文章"
      description="查看该分类下的所有文章"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Posts -->
      <div v-else-if="posts?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard
          v-for="post in posts"
          :key="post.cid"
          :post="post"
        />
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">该分类下暂无文章</p>
        <NuxtLink to="/category" class="text-primary-500 hover:underline mt-4 inline-block">
          返回分类列表
        </NuxtLink>
      </div>
    </div>
  </div>
</template>