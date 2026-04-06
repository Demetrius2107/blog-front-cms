import request from '@/utils/request'

export function getSettingApi() {
  return request.get('/setting')
}

export function updateSettingApi(data: any) {
  return request.put('/setting', data)
}

export function uploadImageApi(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
