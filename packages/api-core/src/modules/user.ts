import type { AxiosInstance } from 'axios'
import type { UserInfo } from '@vellastra/shared/types'

export function createUserApi(request: AxiosInstance) {
  return {
    /** 获取当前登录用户信息 */
    getInfo() {
      return request.get('/api/user/info')
    },

    /** 根据 ID 获取用户信息 */
    getById(id: number) {
      return request.get(`/api/user/${id}`)
    },

    /** 更新用户信息 */
    update(id: number, data: Partial<UserInfo>) {
      return request.put(`/api/user/${id}`, data)
    }
  }
}