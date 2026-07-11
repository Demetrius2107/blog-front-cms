// ============================================
// Vellastra 共享类型定义
// ============================================

// ---- 文章 ----
export interface Article {
  id?: number
  title: string
  content: string
  summary: string
  coverImage?: string
  categoryId?: number
  tags?: number[]
  status: 'draft' | 'published'
  isTop: boolean
  views: number
  authorId?: number
  authorName?: string
  categoryName?: string
  likeCount?: number
  commentCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface ArticleQuery {
  current?: number
  size?: number
  categoryId?: number
  keyword?: string
  tag?: string
  authorId?: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  current: number
  size: number
}

// ---- 用户 ----
export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  role: string
  status: number
  createdAt: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
  email: string
  nickname?: string
}

// ---- 分类 ----
export interface Category {
  id: number
  name: string
  description?: string
  parentId?: number
  children?: Category[]
  articleCount?: number
}

// ---- 标签 ----
export interface Tag {
  id: number
  name: string
  articleCount?: number
}

// ---- 评论 ----
export interface Comment {
  id: number
  articleId: number
  content: string
  authorId: number
  authorName: string
  authorAvatar?: string
  parentId?: number
  replyToId?: number
  replyToName?: string
  status: number
  createdAt: string
  children?: Comment[]
}

export interface CommentQuery {
  current?: number
  size?: number
  articleId?: number
  status?: number
}

// ---- 设置 ----
export interface Setting {
  key: string
  value: string
}

// ---- 通用 API 响应 ----
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}