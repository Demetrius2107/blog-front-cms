import request from '@/utils/request'

export function getSettingListApi() {
  return request.get('/api/setting/list')
}

export function updateSettingApi(key: string, value: string) {
  return request.put('/api/setting', { key, value })
}
