import request from '@/utils/request'

export interface LoginForm {
  username: string
  password: string
}

export function loginApi(data: LoginForm) {
  return request.post('/auth/login', data)
}

export function logoutApi() {
  return request.post('/auth/logout')
}

export function getUserInfoApi() {
  return request.get('/auth/userinfo')
}
