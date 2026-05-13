import type { Post, PostWrapper, PageResult, Category, Tag } from '~/types'
import type { UseFetchOptions } from '#app'
import type { ComputedRef } from 'vue'
import { useApi } from './useApi'

// 获取文章列表
export const usePosts = (
  params:
    | {
        pageNum?: number
        pageSize?: number
        type?: string
        status?: string
        keyword?: string
      }
    | ComputedRef<{
        pageNum?: number
        pageSize?: number
        type?: string
        status?: string
        keyword?: string
      }>,
  options: UseFetchOptions<PageResult<PostWrapper>> = {}
) => {
  return useApi<PageResult<PostWrapper>>('/contents/page', {
    ...options,
    params: params as any,
  })
}

// 获取文章详情
export const usePost = (cid: number | string) => {
  return useApi<PostWrapper>(`/contents/${cid}`)
}

// 根据别名获取文章
export const usePostBySlug = (slug: string) => {
  return useApi<PostWrapper>(`/contents/slug/${slug}`)
}

// 获取分类文章
export const usePostsByCategory = (mid: number) => {
  return useApi<PostWrapper[]>(`/contents/category/${mid}`)
}

// 获取标签文章
export const usePostsByTag = (mid: number) => {
  return useApi<PostWrapper[]>(`/contents/tag/${mid}`)
}

// 获取所有分类
export const useCategories = <T = Category[]>() => {
  return useApi<T>('/metas/categories')
}

// 获取所有标签
export const useTags = <T = Tag[]>() => {
  return useApi<T>('/metas/tags')
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