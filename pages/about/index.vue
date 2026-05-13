<script setup lang="ts">
const { t } = useI18n()

const skills = [
  { name: 'Vue.js', level: 90 },
  { name: 'Nuxt', level: 85 },
  { name: 'TypeScript', level: 88 },
  { name: 'Spring Boot', level: 80 },
  { name: 'MySQL', level: 75 },
]

const timeline = [
  { year: '2024', title: '博客上线', desc: '使用 Nuxt 4 + Spring Boot 构建' },
  { year: '2023', title: '开始学习', desc: '深入学习前端和后端技术' },
  { year: '2022', title: '初次接触', desc: '第一次接触 Web 开发' },
]

useHead({
  title: computed(() => `${t('about')} - Typecho Blog`),
  meta: [
    { name: 'description', content: computed(() => t('heroDesc')) }
  ]
})
</script>

<template>
  <div>
    <!-- Introduction -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {{ t('about') }}
          </span>
        </h1>
        <p class="text-lg text-slate-600">{{ t('heroDesc') }}</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Introduction -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6 text-blue-600">
            {{ t('learnMore') }}
          </h2>
          <div class="text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              {{ t('heroDesc') }}
              这个博客是我记录学习过程和技术分享的地方。
            </p>
            <p class="mt-4">
              主要关注前端开发和后端架构，对 Vue.js、Nuxt、Spring Boot 等技术有深入研究。
              同时也喜欢阅读、写作和摄影。
            </p>
          </div>
        </section>

        <!-- Skills -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6 text-blue-600">
            技能掌握
          </h2>
          <div class="space-y-4">
            <div v-for="skill in skills" :key="skill.name">
              <div class="flex justify-between mb-1">
                <span class="font-medium">{{ skill.name }}</span>
                <span class="text-slate-500 dark:text-slate-400">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  :style="{ width: `${skill.level}%` }"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline -->
        <section>
          <h2 class="text-2xl font-bold mb-6 text-blue-600">
            成长历程
          </h2>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div class="space-y-8">
              <div
                v-for="(item, index) in timeline"
                :key="index"
                class="relative pl-12"
              >
                <div class="absolute left-2 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                <div class="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md">
                  <span class="text-sm text-blue-500 font-medium">{{ item.year }}</span>
                  <h3 class="font-semibold mt-1">{{ item.title }}</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>