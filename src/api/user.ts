import request from '@/utils/request'

export function getUserListApi(params: any) {
  return request.get('/user/list', { params })
}

export function updateUserRoleApi(id: number, data: { role: string }) {
  return request.put(`/user/${id}/role`, data)
}

export function updateUserStatusApi(id: number, data: { status: number }) {
  return request.put(`/user/${id}/status`, data)
}
