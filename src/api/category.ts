import request from '@/utils/request'

export interface Category {
  id: number
  name: string
  description?: string
  parentId?: number
  children?: Category[]
  articleCount?: number
}

/** 获取分类树 */
export function getCategoryTreeApi() {
  return request.get('/api/category/tree')
}

/** 查看分类详情 */
export function getCategoryDetailApi(id: number) {
  return request.get(`/api/category/${id}`)
}

/** 新增分类 */
export function createCategoryApi(data: { name: string; description?: string; parentId?: number }) {
  return request.post('/api/category', data)
}

/** 更新分类 */
export function updateCategoryApi(id: number, data: { name: string; description?: string }) {
  return request.put(`/api/category/${id}`, data)
}

/** 删除分类 */
export function deleteCategoryApi(id: number) {
  return request.delete(`/api/category/${id}`)
}
