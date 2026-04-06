<template>
  <div class="user-manage">
    <el-card shadow="hover">
      <template #header>
        <span>用户管理</span>
      </template>

      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.keyword" placeholder="请输入用户名/邮箱" clearable />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="queryParams.role" placeholder="全部角色" clearable>
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-formItem>
      </el-form>

      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column label="用户信息" min-width="200">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="36" :src="row.avatar">{{ row.username?.charAt(0) }}</el-avatar>
              <div class="user-info">
                <div class="username">{{ row.username }}</div>
                <div class="email">{{ row.email }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 1"
              @change="(val: boolean) => handleStatusChange(row.id, val)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-dropdown trigger="click" @command="(cmd: string) => handleCommand(cmd, row)">
              <el-button link type="primary">更多<el-icon><ArrowDown /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="editRole">修改角色</el-dropdown-item>
                  <el-dropdown-item command="resetPwd">重置密码</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const total = ref(0)

const queryParams = reactive({
  keyword: '',
  role: '' as string,
  page: 1,
  pageSize: 10
})

const tableData = ref([
  { id: 1, username: 'admin', email: 'admin@blog.com', avatar: '', role: 'admin', status: 1, lastLoginTime: '2026-04-03 08:00' },
  { id: 2, username: 'zhangsan', email: 'zhangsan@example.com', avatar: '', role: 'user', status: 1, lastLoginTime: '2026-04-02 14:30' },
  { id: 3, username: 'lisi', email: 'lisi@example.com', avatar: '', role: 'user', status: 0, lastLoginTime: '2026-03-28 09:00' }
])

function handleSearch() {
  queryParams.page = 1
}

function handleReset() {
  Object.assign(queryParams, { keyword: '', role: '', page: 1, pageSize: 10 })
}

async function handleStatusChange(id: number, val: boolean) {
  ElMessage.success(val ? '已启用' : '已禁用')
}

function handleCommand(command: string, row: any) {
  if (command === 'resetPwd') {
    ElMessageBox.confirm(`确定重置 ${row.username} 的密码吗？`, '提示', { type: 'warning' }).then(() => {
      ElMessage.success('密码已重置')
    })
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  margin-bottom: 16px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;

  .user-info {
    .username {
      font-weight: 500;
      color: $text-primary;
    }

    .email {
      font-size: 12px;
      color: $text-secondary;
    }
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
