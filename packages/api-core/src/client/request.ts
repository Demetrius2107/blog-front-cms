import axios, { type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import logger from '@vellastra/shared/utils/logger'

/**
 * 创建通用请求客户端
 * @param getToken 获取当前 token 的函数
 * @param baseURL 基础路径
 */
export function createRequest(getToken: () => string, baseURL: string = ''): AxiosInstance {
  const service = axios.create({
    baseURL,
    timeout: 15000
  })

  service.interceptors.request.use(
    (config) => {
      logger.request(config.method?.toUpperCase() || 'UNKNOWN', config.url || '', config.params || config.data)

      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
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
          // 401 由调用方处理（清除登录态、跳转登录页）
          return Promise.reject(new Error('UNAUTHORIZED'))
        }
        return Promise.reject(new Error(res.message || '请求失败'))
      }
      return res
    },
    (error) => {
      logger.error('HTTP', `请求失败: ${error.config?.url}`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      })
      ElMessage.error(error.message || '网络错误')
      return Promise.reject(error)
    }
  )

  return service
}