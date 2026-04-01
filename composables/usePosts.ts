import type { Post, PageResult, Category, Tag } from '~/types'

// 获取文章列表
export const usePosts = (params: {
  pageNum?: number
  pageSize?: number
  type?: string
  status?: string
  keyword?: string
}) => {
  return useApi<PageResult<Post>>('/contents/page', params)
}

// 获取文章详情
export const usePost = (cid: number | string) => {
  return useApi<Post>(`/contents/${cid}`)
}

// 根据别名获取文章
export const usePostBySlug = (slug: string) => {
  return useApi<Post>(`/contents/slug/${slug}`)
}

// 获取分类文章
export const usePostsByCategory = (mid: number) => {
  return useApi<Post[]>(`/contents/category/${mid}`)
}

// 获取标签文章
export const usePostsByTag = (mid: number) => {
  return useApi<Post[]>(`/contents/tag/${mid}`)
}

// 获取所有分类
export const useCategories = () => {
  return useApi<Category[]>('/metas/categories')
}

// 获取所有标签
export const useTags = () => {
  return useApi<Tag[]>('/metas/tags')
}

// 获取网站统计
export const useStats = () => {
  return useApi<{
    totalPosts: number
    totalPages: number
    totalCategories: number
    totalTags: number
    totalUsers: number
  }>('/public/stats')
}