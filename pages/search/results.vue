<script setup lang="ts">
const route = useRoute()
const query = computed(() => route.query.q as string || '')

// 搜索文章
const { data: postsData, pending } = await usePosts({
  pageNum: 1,
  pageSize: 20,
  keyword: query.value,
})

useSeoMeta({
  title: `搜索: ${query.value} - Typecho Blog`,
})
</script>

<template>
  <div>
    <CommonHeroSection
      title="搜索结果"
      :description="`关键词: ${query}`"
    />

    <div class="container mx-auto px-4 py-12">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Results -->
      <div v-else-if="postsData?.list?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard
          v-for="post in postsData.list"
          :key="post.cid"
          :post="post"
        />
      </div>

    <!-- Empty -->
      <div v-else class="text-center py-12">
        <p class="text-slate-500 dark:text-slate-400">未找到相关文章</p>
        <NuxtLink to="/search" class="text-primary-500 hover:underline mt-4 inline-block">
          重新搜索
        </NuxtLink>
      </div>
    </div>
  </div>
</template>