// ============================================
// Vellastra 共享常量
// ============================================

/** 用户角色 */
export const ROLE = {
  ADMIN: 'admin' as const,
  AUTHOR: 'author' as const,
  USER: 'user' as const
} as const

/** 文章状态 */
export const ARTICLE_STATUS = {
  DRAFT: 'draft' as const,
  PUBLISHED: 'published' as const
} as const

/** 评论状态 */
export const COMMENT_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2
} as const

/** API 响应码 */
export const API_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ERROR: 500
} as const

/** 分页默认值 */
export const PAGE_DEFAULTS = {
  CURRENT: 1,
  SIZE: 10
} as const

/** 调试开关 */
export const DEBUG_KEY = 'vellastra-debug'