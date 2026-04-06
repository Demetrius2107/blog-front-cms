import request from '@/utils/request'

export function getCommentListApi(params: any) {
  return request.get('/comment/list', { params })
}

export function approveCommentApi(id: number) {
  return request.put(`/comment/${id}/approve`)
}

export function deleteCommentApi(id: number) {
  return request.delete(`/comment/${id}`)
}

export function replyCommentApi(id: number, data: { content: string }) {
  return request.post(`/comment/${id}/reply`, data)
}
