import request from '@/utils/request'

export function getCategoryListApi() {
  return request.get('/category/list')
}

export function createCategoryApi(data: { name: string; description?: string }) {
  return request.post('/category', data)
}

export function updateCategoryApi(id: number, data: { name: string; description?: string }) {
  return request.put(`/category/${id}`, data)
}

export function deleteCategoryApi(id: number) {
  return request.delete(`/category/${id}`)
}
