<script setup lang="ts">

// 链接数据
const links = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'RSS', url: '/rss.xml', icon: 'rss' },
]

const currentYear = new Date().getFullYear()

onMounted(() => {

})
</script>

<template>
  <footer class="footer-content mt-20 border-t border-slate-200 dark:border-slate-800">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo & Description -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="font-display font-semibold text-xl">Typecho</span>
          </div>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
            一个现代化的博客系统，采用 Nuxt 4 + Spring Boot 构建，
            支持暗色模式、响应式设计、优雅的动画效果。
          </p>
          <!-- Social Links -->
          <div class="flex gap-4 mt-6">
            <a
              v-for="link in links"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"
              :aria-label="link.name"
            >
              <!-- GitHub -->
              <svg v-if="link.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <!-- Twitter -->
              <svg v-else-if="link.icon === 'twitter'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <!-- RSS -->
              <svg v-else-if="link.icon === 'rss'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.18a2.18 2.18 0 01-.015 4.365 2.18 2.18 0 01-.015-4.365zm-4.02-4.035a6.18 6.18 0 016.045 6.045h-2.01a4.17 4.17 0 00-4.035-4.035v-2.01zM2.16 6.975c6.615.375 11.89 5.64 12.255 12.255h-2.01c-.36-5.505-4.74-9.87-10.245-10.245v-2.01zm0-4.98c9.39.42 16.53 7.56 16.95 16.95h-2.01C16.71 10.41 10.59 4.29 2.16 3.99V1.995z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white mb-4">快速链接</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
                首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category" class="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
                分类
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tag" class="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
                标签
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
                关于
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white mb-4">联系方式</h3>
          <ul class="space-y-3">
            <li class="text-slate-600 dark:text-slate-400">
              <span class="font-medium">邮箱：</span>
              <a href="mailto:hello@example.com" class="hover:text-primary-500 transition-colors">
                hello@example.com
              </a>
            </li>
            <li class="text-slate-600 dark:text-slate-400">
              <span class="font-medium">地址：</span>
              中国 · 北京
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p class="text-slate-500 dark:text-slate-400 text-sm">
          © {{ currentYear }} Typecho Blog. All rights reserved.
          <span class="mx-2">·</span>
          Powered by
          <a href="https://nuxt.com" target="_blank" class="hover:text-primary-500 transition-colors">Nuxt</a>
          &
          <a href="https://spring.io" target="_blank" class="hover:text-primary-500 transition-colors">Spring Boot</a>
        </p>
      </div>
    </div>
  </footer>
</template>