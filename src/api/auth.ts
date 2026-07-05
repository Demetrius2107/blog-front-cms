import request from '@/utils/request'
import authRequest from '@/utils/authRequest'

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
  email: string
  nickname?: string
}

export function loginApi(data: LoginForm) {
  return authRequest.post('/login', data)
}

export function registerApi(data: RegisterForm) {
  return authRequest.post('/register', data)
}

export function logoutApi() {
  return authRequest.post('/logout')
}

export function refreshTokenApi() {
  return authRequest.post('/refresh')
}
