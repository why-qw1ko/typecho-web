<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems?: number
  pageSize?: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 生成页码列表
const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(props.totalPages, start + maxVisible - 1)

  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push('...')
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < props.totalPages) {
    if (end < props.totalPages - 1) {
      pages.push('...')
    }
    pages.push(props.totalPages)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const prevPage = () => {
  goToPage(props.currentPage - 1)
}

const nextPage = () => {
  goToPage(props.currentPage + 1)
}
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <!-- Previous Button -->
    <button
      class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      {{ t('prev') }}
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in pageNumbers"
      :key="page"
      class="px-4 py-2 rounded-lg transition-colors"
      :class="[
        page === currentPage
          ? 'bg-primary-500 text-white'
          : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      ]"
      :disabled="typeof page === 'string'"
      @click="typeof page === 'number' && goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      {{ t('next') }}
    </button>
  </div>
</template>
