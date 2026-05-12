// API 响应类型
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页响应
export interface PageResult<T> {
  total: number
  pageNum: number
  pageSize: number
  pages: number
  list: T[]
}

// 用户
export interface User {
  uid: number
  name: string
  mail: string
  url?: string
  screenName: string
  created: number
  group: string
}

// 文章
export interface Post {
  cid: number
  title: string
  slug: string
  text: string
  created: number
  modified: number
  type: 'post' | 'page'
  status: 'publish' | 'draft' | 'hidden'
  commentsNum: number
  views: number
  authorId: number
  author?: Author
  category?: Category
  tags?: Tag[]
}

// API 返回的文章包装结构
export interface PostWrapper {
  content: Post
  author: Author
  category?: Category
  tags?: Tag[]
}

export interface Author {
  uid: number
  name: string
  screenName: string
  url?: string
}

// 分类
export interface Category {
  mid: number
  name: string
  slug: string
  description?: string
  count: number
}

// 标签
export interface Tag {
  mid: number
  name: string
  slug: string
  count: number
}

// 评论
export interface Comment {
  coid: number
  cid: number
  author: string
  mail: string
  url?: string
  text: string
  created: number
  status: 'approved' | 'waiting' | 'spam'
  parent: number
  stars: number
}

// 链接
export interface Link {
  lid: number
  name: string
  url: string
  sort?: string
  image?: string
  description?: string
}

// 系统配置
export interface Option {
  name: string
  value: string
}

// 登录请求
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应
export interface LoginResponse {
  token: string
  tokenType: string
}

// 导航项
export interface NavItem {
  label: string
  to: string
  icon?: string
}
