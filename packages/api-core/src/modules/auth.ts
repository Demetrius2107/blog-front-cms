import type { AxiosInstance } from 'axios'

/** 创建 API 模块工厂函数，注入 request 实例 */
export function createAuthApi(request: AxiosInstance) {
  return {
    /** 登录 */
    login(data: { username: string; password: string }) {
      return request.post('/login', data)
    },

    /** 注册 */
    register(data: { username: string; password: string; email: string; nickname?: string }) {
      return request.post('/register', data)
    },

    /** 登出 */
    logout() {
      return request.post('/logout')
    },

    /** 刷新 Token */
    refreshToken() {
      return request.post('/refresh')
    }
  }
}