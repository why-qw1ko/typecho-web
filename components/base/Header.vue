<script setup lang="ts">
import { gsap } from 'gsap'

// 主题切换
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// 用户状态
const userStore = useUserStore()
const toast = useToast()

// i18n
const { t, locale, locales, setLocale } = useI18n()
const showLangMenu = ref(false)

// 获取当前语言名称
const currentLocaleName = computed(() => {
  const current = locales.value.find((l: any) => l.code === locale.value)
  return current?.name || locale.value
})

// 移动端菜单状态
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// 导航项 - 使用 i18n
const navItems = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('categories'), to: '/category' },
  { label: t('tags'), to: '/tag' },
  { label: t('search'), to: '/search' },
  { label: t('about'), to: '/about' },
])

// 监听滚动
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)

  // 入场动画
  gsap.from('.nav-item', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })
})

// 切换主题
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// 切换菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 切换语言
const toggleLang = () => {
  showLangMenu.value = !showLangMenu.value
}

const changeLocale = async (code: string) => {
  await setLocale(code as 'zh-CN' | 'en-US')
  showLangMenu.value = false
}

// 退出登录
const handleLogout = () => {
  if (confirm(t('logoutConfirm'))) {
    userStore.logout()
    toast.success(t('logoutSuccess'))
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'glass shadow-soft py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="nav-item flex items-center gap-2 group"
        >
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow">
            <span class="text-white font-bold text-lg">T</span>
          </div>
          <span class="font-display font-semibold text-xl hidden sm:block">
            Typecho
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 group">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-item relative text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-500 dark:text-primary-400"
          >
            {{ item.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="nav-item flex items-center gap-3">
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLang"
              class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="切换语言"
            >
              <svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="showLangMenu" class="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                <button
                  v-for="loc in locales"
                  :key="(loc as any).code"
                  @click="changeLocale((loc as any).code)"
                  class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  :class="{ 'text-primary-500 font-medium': locale === (loc as any).code }"
                >
                  {{ (loc as any).name }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="切换主题"
          >
            <svg
              v-if="isDark"
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-slate-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
          </button>

          <!-- Login/Logout -->
          <NuxtLink
            v-if="!userStore.isLoggedIn"
            to="/login"
            class="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            {{ t('login') }}
          </NuxtLink>
          <button
            v-else
            @click="handleLogout"
            class="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {{ t('logout') }}
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMenu"
            class="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="菜单"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav
          v-if="isMenuOpen"
          class="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="block py-3 text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-500 dark:text-primary-400"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </Transition>
    </div>
  </header>
</template>