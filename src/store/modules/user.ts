import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const userInfo = ref<any>({})

    function setToken(val: string) {
      token.value = val
    }

    function setUserInfo(info: any) {
      userInfo.value = info
    }

    function logout() {
      token.value = ''
      userInfo.value = {}
    }

    return { token, userInfo, setToken, setUserInfo, logout },
  {
    persist: {
      key: 'blog-user-store',
      storage: localStorage,
      paths: ['token', 'userInfo']
    }
  }
)
