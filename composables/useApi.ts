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
        navigateTo('/login')
      }
    },
  })
}

// GET 请求
export const useApiGet = <T>(url: string, params?: Record<string, unknown>) => {
  return useApi<T>(url, {
    method: 'GET',
    params,
  })
}

// POST 请求
export const useApiPost = <T>(url: string, body?: unknown) => {
  return useApi<T>(url, {
    method: 'POST',
    body,
  })
}

// PUT 请求
export const useApiPut = <T>(url: string, body?: unknown) => {
  return useApi<T>(url, {
    method: 'PUT',
    body,
  })
}

// DELETE 请求
export const useApiDelete = <T>(url: string) => {
  return useApi<T>(url, {
    method: 'DELETE',
  })
}