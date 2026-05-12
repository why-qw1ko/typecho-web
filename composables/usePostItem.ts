import type { Post, PostWrapper } from '~/types'

export const usePostItem = (wrapper: Ref<PostWrapper | null | undefined>) => {
  const post = computed<Post>(() => {
    if (!wrapper.value) {
      return {} as Post
    }
    return {
      ...wrapper.value.content,
      author: wrapper.value.author,
      category: wrapper.value.category,
      tags: wrapper.value.tags,
    }
  })

  const cid = computed(() => post.value?.cid)
  const title = computed(() => post.value?.title || '')
  const text = computed(() => post.value?.text || '')
  const created = computed(() => post.value?.created || 0)
  const views = computed(() => post.value?.views || 0)
  const commentsNum = computed(() => post.value?.commentsNum || 0)
  const category = computed(() => post.value?.category)
  const tags = computed(() => post.value?.tags || [])
  const author = computed(() => post.value?.author)

  const formatDate = (timestamp?: number) => {
    const ts = timestamp || created.value
    if (!ts) return ''
    return new Date(ts * 1000).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const excerpt = computed(() => {
    const content = text.value
    if (!content) return ''
    const plainText = content.replace(/<[^>]*>/g, '').replace(/<!--markdown-->/g, '')
    return plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText
  })

  return {
    post,
    cid,
    title,
    text,
    created,
    views,
    commentsNum,
    category,
    tags,
    author,
    formatDate,
    excerpt,
  }
}
