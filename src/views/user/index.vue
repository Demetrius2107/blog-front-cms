<template>
  <div class="user-manage">
    <!-- 页面头部 -->
    <div class="page-header">
      <div>
        <h2 class="gradient-text">用户管理</h2>
        <p class="subtitle">管理系统中的所有用户，分配角色和管理状态</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="showCreateDialog = true">+ 新增用户</el-button>
      </div>
    </div>

    <!-- 搜索区域 -->
    <div class="glass-card search-section">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.keyword" placeholder="搜索用户名/邮箱" clearable @clear="handleSearch" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="queryParams.role" placeholder="全部角色" clearable @change="handleSearch">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部状态" clearable @change="handleSearch">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 用户表格 -->
    <div class="glass-card table-section">
      <el-table :data="tableData" stripe v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column label="用户信息" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="40" :src="row.avatar" class="user-avatar">
                {{ row.username?.charAt(0)?.toUpperCase() }}
              </el-avatar>
              <div class="user-info">
                <div class="username">{{ row.username }}</div>
                <div class="email">{{ row.email }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small" effect="dark">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 1"
              :loading="switchingId === row.id"
              @change="(val: any) => handleStatusChange(row.id, val)"
              active-color="#10b981"
              inactive-color="#ef4444"
            />
          </template>
        </el-table-column>
        <el-table-column prop="articleCount" label="文章数" width="80" align="center" />
        <el-table-column label="注册时间" width="170">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="最后登录" width="170">
          <template #default="{ row }">
            {{ formatDate(row.lastLoginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEditRole(row)">角色</el-button>
            <el-button link type="warning" size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button
              link
              :type="row.status === 1 ? 'danger' : 'success'"
              size="small"
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @current-change="fetchUsers"
          @size-change="fetchUsers"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

const loading = ref(false)
const total = ref(0)
const switchingId = ref<number | null>(null)
const showCreateDialog = ref(false)

const queryParams = reactive({
  keyword: '',
  role: '' as string,
  status: '' as number | string,
  page: 1,
  pageSize: 10
})

const tableData = ref<any[]>([])

function formatDate(date?: string) {
  return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-'
}

async function fetchUsers() {
  loading.value = true
  try {
    // TODO: 对接后端真实接口
    // Mock data for now
    tableData.value = [
      { id: 1, username: 'admin', nickname: '管理员', email: 'admin@vellastra.com', avatar: '', role: 'admin', status: 1, articleCount: 42, createTime: '2026-01-01 00:00:00', lastLoginTime: '2026-07-10 08:00:00' },
      { id: 2, username: 'zhangsan', nickname: '张三', email: 'zhangsan@example.com', avatar: '', role: 'user', status: 1, articleCount: 12, createTime: '2026-02-15 10:30:00', lastLoginTime: '2026-07-09 14:30:00' },
      { id: 3, username: 'lisi', nickname: '李四', email: 'lisi@example.com', avatar: '', role: 'user', status: 0, articleCount: 5, createTime: '2026-03-20 16:00:00', lastLoginTime: '2026-06-28 09:00:00' },
      { id: 4, username: 'wangwu', nickname: '王五', email: 'wangwu@example.com', avatar: '', role: 'user', status: 1, articleCount: 8, createTime: '2026-04-10 08:20:00', lastLoginTime: '2026-07-08 11:15:00' }
    ]
    total.value = 4
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  queryParams.page = 1
  fetchUsers()
}

function handleReset() {
  Object.assign(queryParams, { keyword: '', role: '', status: '', page: 1, pageSize: 10 })
  fetchUsers()
}

async function handleStatusChange(id: number, val: boolean) {
  switchingId.value = id
  try {
    // TODO: 对接后端
    ElMessage.success(val ? '用户已启用' : '用户已禁用')
    const user = tableData.value.find(u => u.id === id)
    if (user) user.status = val ? 1 : 0
  } finally {
    switchingId.value = null
  }
}

function handleEditRole(row: any) {
  ElMessageBox.prompt('请输入新角色', '修改角色', {
    inputValue: row.role,
    inputPattern: /^(admin|user)$/,
    inputErrorMessage: '角色只能是 admin 或 user'
  }).then(({ value }) => {
    row.role = value
    ElMessage.success('角色已更新')
  })
}

function handleResetPwd(row: any) {
  ElMessageBox.confirm(`确定重置用户「${row.username}」的密码为 123456 吗？`, '确认重置', {
    type: 'warning',
    confirmButtonText: '确定重置',
    cancelButtonText: '取消'
  }).then(() => {
    ElMessage.success('密码已重置为 123456')
  })
}

function handleToggleStatus(row: any) {
  const action = row.status === 1 ? '禁用' : '启用'
  ElMessageBox.confirm(`确定${action}用户「${row.username}」吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    row.status = row.status === 1 ? 0 : 1
    ElMessage.success(`${action}成功`)
  })
}

onMounted(() => fetchUsers())
</script>

<style lang="scss" scoped>
.user-manage {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 4px;
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    margin: 0;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(167, 139, 250, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.search-section {
  :deep(.el-form-item__label) {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
  }
  :deep(.el-input__wrapper),
  :deep(.el-select__wrapper) {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(167, 139, 250, 0.15);
    box-shadow: none;
    border-radius: 8px;
  }
  :deep(.el-input__inner),
  :deep(.el-select__placeholder) {
    color: rgba(255, 255, 255, 0.8);
  }
}

.table-section {
  :deep(.el-table) {
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    --el-table-border-color: rgba(167, 139, 250, 0.08);
    --el-table-header-bg-color: rgba(255, 255, 255, 0.03);
    --el-table-tr-bg-color: transparent;
    --el-table-row-hover-bg-color: rgba(167, 139, 250, 0.06);
  }
  :deep(.el-table th) {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  :deep(.el-table td) {
    border-bottom: 1px solid rgba(167, 139, 250, 0.06);
  }
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  border: 2px solid rgba(167, 139, 250, 0.3);
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
}

.user-info {
  .username {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }
  .email {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>