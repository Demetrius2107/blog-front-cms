import request from '@/utils/request'

export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  role: string
  status: number
  createdAt: string
}

/** 获取当前登录用户信息 */
export function getUserInfoApi() {
  return request.get('/api/user/info')
}

/** 根据 ID 获取用户信息 */
export function getUserByIdApi(id: number) {
  return request.get(`/api/user/${id}`)
}

/** 更新用户信息 */
export function updateUserApi(id: number, data: Partial<UserInfo>) {
  return request.put(`/api/user/${id}`, data)
}
