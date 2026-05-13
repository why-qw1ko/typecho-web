import type { UseFetchOptions } from '#app'

// API 响应类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// API 基础地址
const getApiBase = () => {
  const config = useRuntimeConfig()
  return config.public.apiBase
}

// 通用请求方法
export const useApi = <T>(
  url: string,
  options: UseFetchOptions<T> = {}
) => {
  const apiBase = getApiBase()
  const token = useCookie('token')

  return useFetch<ApiResponse<T>>(`${apiBase}${url}`, {
    ...options,
    key: options.key || url,
    lazy: options.lazy ?? true,
    dedupe: 'defer',
    headers: {
      'Content-Type': 'application/json',
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...options.headers,
    },
    transform: (response: ApiResponse<T>) => {
      if (response.code !== 200) {
        const error = new Error(response.message || 'API Error')
        ;(error as any).code = response.code
        throw error
      }
      return response.data
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null
        // 只在客户端执行导航
        if (import.meta.client) {
          navigateTo('/login')
        }
      }
    },
  })
}

// GET 请求
export const useApiGet = <T>(url: string, params?: Record<string, unknown>, options: UseFetchOptions<T> = {}) => {
  return useApi<T>(url, {
    ...options,
    method: 'GET',
    params,
  })
}

// POST 请求
export const useApiPost = <T>(url: string, body?: unknown) => {
  return useApi<T>(url, {
    method: 'POST',
    body: body as any,
  })
}

// PUT 请求
export const useApiPut = <T>(url: string, body?: unknown) => {
  return useApi<T>(url, {
    method: 'PUT',
    body: body as any,
  })
}

// DELETE 请求
export const useApiDelete = <T>(url: string) => {
  return useApi<T>(url, {
    method: 'DELETE',
  })
}