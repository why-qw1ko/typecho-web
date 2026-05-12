import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: '/',
  })

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.group === 'admin')

  // 登录
  const login = async (username: string, password: string) => {
    const apiBase = useRuntimeConfig().public.apiBase
    const { data, error } = await useFetch<{ code: number; message: string; data: { token: string; tokenType: string } }>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { username, password },
    })

    if (error.value) {
      throw new Error((error.value as any)?.message || '登录失败')
    }

    if (data.value && data.value.code === 200) {
      token.value = data.value.data.token
      await fetchUserInfo()
    } else if (data.value && data.value.message) {
      throw new Error(data.value.message)
    } else {
      throw new Error('登录失败')
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    if (!token.value) return

    const apiBase = useRuntimeConfig().public.apiBase
    const { data, error } = await useFetch<{ code: number; message: string; data: User }>(`${apiBase}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!error.value && data.value && data.value.code === 200) {
      user.value = data.value.data
    }
  }

  // 登出
  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  // 初始化（如果已有 token，获取用户信息）
  const init = async () => {
    if (token.value && !user.value) {
      await fetchUserInfo()
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    init,
    fetchUserInfo,
  }
})