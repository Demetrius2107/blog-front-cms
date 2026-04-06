<template>
  <div class="comment-manage">
    <el-card shadow="hover">
      <template #header>
        <span>评论管理</span>
      </template>

      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="内容">
          <el-input v-model="queryParams.keyword" placeholder="搜索评论内容" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部状态" clearable>
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="content" label="评论内容" min-width="250" show-overflow-tooltip />
        <el-table-column prop="articleTitle" label="所属文章" width="180" show-overflow-tooltip />
        <el-table-column prop="nickname" label="评论者" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'approved' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'"
              size="small"
            >
              {{ statusMap[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button v-if="row.status !== 'approved'" link type="success" size="small"
              @click="handleApprove(row.id)">通过</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
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
import { ElMessage } from 'element-plus'

const loading = ref(false)
const total = ref(0)

const queryParams = reactive({
  keyword: '',
  status: '' as string,
  page: 1,
  pageSize: 10
})

const statusMap: Record<string, string> = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已拒绝'
}

const tableData = ref([
  { id: 1, content: '这篇文章写得太好了，学到了很多！', articleTitle: 'Vue3 Composition API 深入理解', nickname: '张三', status: 'approved', createdAt: '2026-04-01 12:00' },
  { id: 2, content: '请问有示例代码吗？', articleTitle: 'TypeScript 最佳实践指南', nickname: '李四', status: 'pending', createdAt: '2026-03-30 15:30' },
  { id: 3, content: 'Vite 确实比 Webpack 快很多', articleTitle: 'Vite 构建工具详解', nickname: '王五', status: 'approved', createdAt: '2026-03-28 09:00' }
])

function handleSearch() {
  queryParams.page = 1
}

function handleReset() {
  Object.assign(queryParams, { keyword: '', status: '', page: 1, pageSize: 10 })
}

function handleApprove(id: number) {
  ElMessage.success('审核通过')
}

function handleDelete(id: number) {
  ElMessage.success('删除成功')
}
</script>

<style lang="scss" scoped>
.search-form {
  margin-bottom: 16px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
