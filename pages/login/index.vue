<script setup lang="ts">
const userStore = useUserStore()
const toast = useToast()
const isLoading = ref(false)

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    toast.error('请输入用户名和密码')
    return
  }

  isLoading.value = true

  try {
    await userStore.login(username.value, password.value)
    toast.success('登录成功！')
    navigateTo('/')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '登录失败，请检查用户名和密码'
    toast.error(message)
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: '登录 - Typecho Blog',
  meta: [
    { name: 'description', content: '登录到 Typecho Blog' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <span class="font-display font-semibold text-2xl">Typecho</span>
        </NuxtLink>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">欢迎回来</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-2">登录到您的账户</p>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              用户名
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              密码
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="请输入密码"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              />
              <span class="text-sm text-slate-600 dark:text-slate-400">记住我</span>
            </label>
          </div>

          

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
        还没有账号？
        <a href="#" class="text-primary-500 hover:text-primary-600 font-medium">立即注册</a>
      </p>
    </div>
  </div>
</template>
