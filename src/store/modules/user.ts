import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const userInfo = ref<any>({})
    const userId = ref<number | null>(null)

    function setToken(val: string) {
      token.value = val
    }

    function setUserInfo(info: any) {
      userInfo.value = info
      if (info && info.id) {
        userId.value = info.id
      }
    }

    function logout() {
      token.value = ''
      userInfo.value = {}
      userId.value = null
    }

    return { token, userInfo, userId, setToken, setUserInfo, logout }
  },
  {
    persist: {
      key: 'blog-user-store',
      storage: localStorage,
      paths: ['token', 'userInfo', 'userId']
    }
  }
)
