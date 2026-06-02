<script setup lang="ts">
const userStore = useUserStore()
const toast = useToast()
const { t } = useI18n()
const isLoading = ref(false)

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    toast.error(t('loginButton'))
    return
  }

  isLoading.value = true

  try {
    await userStore.login(username.value, password.value)
    toast.success(t('logoutSuccess'))
    navigateTo('/')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : t('loginButton')
    toast.error(message)
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: computed(() => `${t('login')} - Typecho Blog`),
  meta: [
    { name: 'description', content: computed(() => t('loginSubtitle')) }
  ]
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 px-4 relative overflow-hidden">
    <!-- 装饰性浮动圆 -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float-slow" />
    <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl animate-float-slower" />

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <span class="font-display font-semibold text-2xl">Typecho</span>
        </NuxtLink>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t('loginWelcome') }}</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-2">{{ t('loginSubtitle') }}</p>
      </div>

      <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-elevated p-8 border border-white/20 dark:border-slate-700/30">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {{ t('username') }}
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              :placeholder="t('username')"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {{ t('password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              :placeholder="t('password')"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              />
              <span class="text-sm text-slate-600 dark:text-slate-400">{{ t('rememberMe') }}</span>
            </label>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <span v-if="isLoading">{{ t('loggingIn') }}</span>
            <span v-else>{{ t('loginButton') }}</span>
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
        {{ t('noAccount') }}
        <a href="#" class="text-primary-500 hover:text-primary-600 font-medium transition-colors">{{ t('register') }}</a>
      </p>
    </div>
  </div>
</template>
