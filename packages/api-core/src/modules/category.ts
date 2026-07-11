import type { AxiosInstance } from 'axios'

export function createCategoryApi(request: AxiosInstance) {
  return {
    /** 获取分类树 */
    getTree() {
      return request.get('/api/category/tree')
    },

    /** 查看分类详情 */
    getDetail(id: number) {
      return request.get(`/api/category/${id}`)
    },

    /** 新增分类 */
    create(data: { name: string; description?: string; parentId?: number }) {
      return request.post('/api/category', data)
    },

    /** 更新分类 */
    update(id: number, data: { name: string; description?: string }) {
      return request.put(`/api/category/${id}`, data)
    },

    /** 删除分类 */
    delete(id: number) {
      return request.delete(`/api/category/${id}`)
    }
  }
}