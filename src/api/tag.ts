import request from '@/utils/request'

export function getTagListApi() {
  return request.get('/tag/list')
}

export function createTagApi(data: { name: string }) {
  return request.post('/tag', data)
}

export function updateTagApi(id: number, data: { name: string }) {
  return request.put(`/tag/${id}`, data)
}

export function deleteTagApi(id: number) {
  return request.delete(`/tag/${id}`)
}
