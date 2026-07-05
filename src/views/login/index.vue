<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">MyBlog 登录</h2>
      <el-form ref="formRef" :model="loginForm" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { loginApi } from '@/api/auth'
import { getUserInfoApi } from '@/api/user'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import logger from '@/utils/logger'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({ username: '', password: '' })

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  // █████████████████████████████████████████████████████████████████
  // 🎯 埋点: 用户登录
  //    记录登录请求的用户名（不记录密码）
  //    配合后端追踪登录失败原因（账号不存在/密码错误/账号禁用）
  // █████████████████████████████████████████████████████████████████
  logger.info('AUTH', `登录尝试: ${loginForm.username}`)

  loading.value = true
  try {
    const res = await loginApi(loginForm)
    userStore.setToken(res.data.token || res.data)

    // 获取用户信息
    const userRes = await getUserInfoApi()
    userStore.setUserInfo(userRes.data)

    logger.success('AUTH', `登录成功: ${loginForm.username}`, {
      role: userRes.data?.role,
      redirect: route.query.redirect
    })

    ElMessage.success('登录成功')
    router.push((route.query.redirect as string) || '/')
  } catch (err) {
    // █████████████████████████████████████████████████████████████████
    // 🎯 埋点: 登录失败
    //    记录失败原因（密码错误/账号不存在/服务异常）
    // █████████████████████████████████████████████████████████████████
    logger.warn('AUTH', `登录失败: ${loginForm.username}`, { error: (err as any)?.message })
    // 错误已在拦截器中处理
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 420px;
  padding: 40px;
  background: $bg-white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .title {
    text-align: center;
    margin-bottom: 30px;
    color: $text-primary;
    font-size: 24px;
  }
}
</style>
