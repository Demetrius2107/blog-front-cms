import type { AxiosInstance } from 'axios'

export function createTagApi(request: AxiosInstance) {
  return {
    /** 获取标签列表 */
    getList() {
      return request.get('/api/tag/list')
    },

    /** 创建标签 */
    create(data: { name: string }) {
      return request.post('/api/tag', data)
    },

    /** 更新标签 */
    update(id: number, data: { name: string }) {
      return request.put(`/api/tag/${id}`, data)
    },

    /** 删除标签 */
    delete(id: number) {
      return request.delete(`/api/tag/${id}`)
    }
  }
}