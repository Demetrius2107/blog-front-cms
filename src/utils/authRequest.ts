import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import logger from '@/utils/logger'

const authRequest = axios.create({
  baseURL: '/auth',
  timeout: 15000
})

authRequest.interceptors.request.use(
  (config) => {
    logger.request(config.method?.toUpperCase() || 'UNKNOWN', config.url || '', config.data)
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

authRequest.interceptors.response.use(
  (response) => {
    logger.response(
      response.config.method?.toUpperCase() || 'UNKNOWN',
      response.config.url || '',
      { code: response.data?.code, message: response.data?.message }
    )

    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      if (res.code === 401) {
        const userStore = useUserStore()
        userStore.logout()
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  (error) => {
    logger.error('AUTH', `鉴权请求失败: ${error.config?.url}`, {
      message: error.message,
      status: error.response?.status
    })
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default authRequest
