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

/** 分页查询文章列表 */
export function getArticleListApi(params: ArticleQuery) {
  return request.get('/api/article', { params })
}

/** 查看文章详情 */
export function getArticleDetailApi(id: number) {
  return request.get(`/api/article/${id}`)
}

/** 创建文章 */
export function createArticleApi(data: Partial<Article>) {
  return request.post('/api/article', data)
}

/** 更新文章 */
export function updateArticleApi(id: number, data: Partial<Article>) {
  return request.put(`/api/article/${id}`, data)
}

/** 删除文章 */
export function deleteArticleApi(id: number) {
  return request.delete(`/api/article/${id}`)
}

/** 发布文章（草稿 → 已发布） */
export function publishArticleApi(id: number) {
  return request.patch(`/api/article/${id}/publish`)
}

/** 撤回发布（已发布 → 下架） */
export function withdrawArticleApi(id: number) {
  return request.patch(`/api/article/${id}/withdraw`)
}

/** 设置/取消置顶 */
export function topArticleApi(id: number, top: boolean) {
  return request.patch(`/api/article/${id}/top`, null, { params: { top } })
}

/** 浏览计数 */
export function viewArticleApi(id: number) {
  return request.post(`/api/article/${id}/view`)
}

/** 点赞/取消点赞 */
export function likeArticleApi(id: number) {
  return request.post(`/api/article/${id}/like`)
}

/** 获取最新文章 */
export function getLatestArticlesApi(size: number = 5) {
  return request.get('/api/article/latest', { params: { size } })
}

/** 批量操作文章 */
export function batchArticleApi(ids: number[], action: 'delete' | 'publish') {
  return request.post('/api/article/batch', { ids, action })
}
