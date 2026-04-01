<script setup lang="ts">
const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

useSeoMeta({
  title: '搜索 - Typecho Blog',
  description: '搜索文章内容',
})
</script>

<template>
  <div>
    <CommonHeroSection
      title="搜索文章"
      description="输入关键词搜索你感兴趣的内容"
    >
      <div class="max-w-xl mx-auto mt-8">
        <form @submit.prevent="handleSearch" class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="输入搜索关键词..."
            class="w-full px-6 py-4 pr-14 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg"
          >
          <button
            type="submit"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </CommonHeroSection>

    <div class="container mx-auto px-4 py-12">
      <div class="text-center text-slate-500 dark:text-slate-400">
        <p>输入关键词开始搜索</p>
      </div>
    </div>
  </div>
</template>