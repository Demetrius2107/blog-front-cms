<template>
  <div class="tag-manage">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新增标签
          </el-button>
        </div>
      </template>

      <div class="tag-list">
        <el-tag
          v-for="item in tableData"
          :key="item.id"
          closable
          size="large"
          class="tag-item"
          @close="handleDelete(item.id)"
        >
          {{ item.name }}
          <span class="tag-count">{{ item.articleCount }}</span>
        </el-tag>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="新增标签" width="400px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入标签名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const tableData = ref([
  { id: 1, name: 'Vue3', articleCount: 20 },
  { id: 2, name: 'TypeScript', articleCount: 15 },
  { id: 3, name: 'Vite', articleCount: 10 },
  { id: 4, name: 'Pinia', articleCount: 8 },
  { id: 5, name: 'Element Plus', articleCount: 6 },
  { id: 6, name: 'ECharts', articleCount: 5 },
  { id: 7, name: 'JavaScript', articleCount: 25 },
  { id: 8, name: 'CSS', articleCount: 12 }
])

const form = reactive({ name: '' })

const rules: FormRules = {
  name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
}

function handleAdd() {
  form.name = ''
  dialogVisible.value = true
}

function handleDelete(id: number) {
  ElMessage.success('删除成功')
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('新增成功')
      dialogVisible.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  padding: 4px 10px;
  cursor: default;

  .tag-count {
    margin-left: 8px;
    font-size: 12px;
    color: $text-secondary;
  }

  &:hover {
    .tag-count {
      color: $text-regular;
    }
  }
}
</style>
