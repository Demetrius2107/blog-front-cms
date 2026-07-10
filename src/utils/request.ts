import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import logger from '@/utils/logger'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    // █████████████████████████████████████████████████████████████████
    // 🎯 埋点: API 请求发起
    //    追踪每一次后端接口调用，便于调试时定位请求链路
    // █████████████████████████████████████████████████████████████████
    logger.request(config.method?.toUpperCase() || 'UNKNOWN', config.url || '', config.params || config.data)

    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    if (userStore.userId) {
      config.headers['X-User-Id'] = userStore.userId
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    // █████████████████████████████████████████████████████████████████
    // 🎯 埋点: API 响应成功
    //    记录接口返回数据概览，快速判断后端返回是否符合预期
    // █████████████████████████████████████████████████████████████████
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
    // █████████████████████████████████████████████████████████████████
    // 🎯 埋点: API 请求失败
    //    网络错误或后端异常时记录详细信息
    // █████████████████████████████████████████████████████████████████
    logger.error('HTTP', `请求失败: ${error.config?.url}`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    })

    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service
