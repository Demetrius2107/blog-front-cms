<template>
  <el-container class="main-layout">
    <el-aside :width="appStore.sidebarCollapsed ? '64px' : '220px'">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header height="60px">
        <Navbar />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
}

.el-aside {
  background-color: $sidebar-bg;
  transition: width 0.3s;
  overflow: hidden;
}

.el-header {
  padding: 0;
  background-color: $bg-white;
  border-bottom: 1px solid $border-color;
}

.el-main {
  background-color: $bg-color;
  padding: 20px;
}
</style>

<style lang="scss">
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
