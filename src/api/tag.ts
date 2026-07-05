import request from '@/utils/request'

export function getTagListApi() {
  return request.get('/api/tag/list')
}

export function createTagApi(data: { name: string }) {
  return request.post('/api/tag', data)
}

export function updateTagApi(id: number, data: { name: string }) {
  return request.put(`/api/tag/${id}`, data)
}

export function deleteTagApi(id: number) {
  return request.delete(`/api/tag/${id}`)
}
