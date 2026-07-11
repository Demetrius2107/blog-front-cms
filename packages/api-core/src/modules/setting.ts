import type { AxiosInstance } from 'axios'

export function createSettingApi(request: AxiosInstance) {
  return {
    /** 获取设置列表 */
    getList() {
      return request.get('/api/setting/list')
    },

    /** 更新设置 */
    update(key: string, value: string) {
      return request.put('/api/setting', { key, value })
    }
  }
}