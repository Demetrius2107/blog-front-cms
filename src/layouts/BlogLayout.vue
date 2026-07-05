<template>
  <div class="blog-layout">
    <header class="blog-header">
      <div class="header-container">
        <div class="logo-area">
          <router-link to="/" class="logo-link">
            <span class="logo-text">MyBlog</span>
          </router-link>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
            首页
          </router-link>
          <router-link
            v-for="cat in categories"
            :key="cat.id"
            :to="`/?categoryId=${cat.id}`"
            class="nav-item"
            :class="{ active: $route.query.categoryId === String(cat.id) }"
          >
            {{ cat.name }}
          </router-link>
        </nav>
        <div class="header-right">
          <template v-if="userStore.token">
            <router-link to="/user/write" class="write-btn">
              <el-button type="primary" size="small">写文章</el-button>
            </router-link>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="user-info">
                <el-avatar :size="32" :src="userStore.userInfo.avatar || ''">
                  {{ userStore.userInfo.username?.charAt(0)?.toUpperCase() }}
                </el-avatar>
                <span class="username">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</span>
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="myArticles">我的文章</el-dropdown-item>
                  <el-dropdown-item command="admin" v-if="userStore.userInfo.role === 'admin'">后台管理</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login">
              <el-button size="small">登录</el-button>
            </router-link>
            <router-link to="/register">
              <el-button type="primary" size="small">注册</el-button>
            </router-link>
          </template>
        </div>
      </div>
    </header>
    <main class="blog-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="blog-footer">
      <div class="footer-container">
        <p>&copy; {{ new Date().getFullYear() }} MyBlog. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { getCategoryTreeApi } from '@/api/category'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const categories = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await getCategoryTreeApi()
    categories.value = res.data || []
  } catch {
    // 分类加载失败不影响页面
  }
})

function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      router.push('/user/profile')
      break
    case 'myArticles':
      router.push('/user/articles')
      break
    case 'admin':
      router.push('/admin/dashboard')
      break
    case 'logout':
      ElMessageBox.confirm('确定退出登录吗？', '提示', { type: 'warning' }).then(() => {
        userStore.logout()
        router.push('/')
      })
      break
  }
}
</script>

<style lang="scss" scoped>
.blog-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.blog-header {
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.logo-area {
  flex-shrink: 0;

  .logo-link {
    text-decoration: none;
  }

  .logo-text {
    font-size: 22px;
    font-weight: bold;
    color: $primary-color;
  }
}

.nav-menu {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 40px;
  overflow: hidden;

  .nav-item {
    padding: 8px 16px;
    color: $text-regular;
    text-decoration: none;
    font-size: 15px;
    border-radius: 6px;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      color: $primary-color;
      background-color: rgba($primary-color, 0.05);
    }

    &.active {
      color: $primary-color;
      background-color: rgba($primary-color, 0.1);
      font-weight: 500;
    }
  }
}

.header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  .write-btn {
    text-decoration: none;
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;

    .username {
      font-size: 14px;
      color: $text-primary;
    }
  }
}

.blog-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px;
}

.blog-footer {
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 24px 0;
  text-align: center;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    color: $text-secondary;
    font-size: 14px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
