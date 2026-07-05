import request from '@/utils/request'

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

/** 分页查询评论列表 */
export function getCommentListApi(params: CommentQuery) {
  return request.get('/api/comment', { params })
}

/** 创建评论 */
export function createCommentApi(data: { articleId: number; content: string; parentId?: number }) {
  return request.post('/api/comment', data)
}

/** 回复评论 */
export function replyCommentApi(data: { articleId: number; content: string; parentId: number; replyToId: number }) {
  return request.post('/api/comment/reply', data)
}

/** 删除评论 */
export function deleteCommentApi(id: number) {
  return request.delete(`/api/comment/${id}`)
}

/** 审核评论 */
export function auditCommentApi(id: number, status: number) {
  return request.patch(`/api/comment/${id}/audit`, null, { params: { status } })
}
