import request from '@/utils/request'

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
}

export function getArticleListApi(params: any) {
  return request.get('/article/list', { params })
}

export function getArticleDetailApi(id: number) {
  return request.get(`/article/${id}`)
}

export function createArticleApi(data: Partial<Article>) {
  return request.post('/article', data)
}

export function updateArticleApi(id: number, data: Partial<Article>) {
  return request.put(`/article/${id}`, data)
}

export function deleteArticleApi(id: number) {
  return request.delete(`/article/${id}`)
}
