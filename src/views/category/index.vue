<template>
  <div class="category-manage">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>分类管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新增分类
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" stripe v-loading="loading" row-key="id" default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="name" label="分类名称" min-width="200" />
        <el-table-column prop="description" label="描述" min-width="250" show-overflow-tooltip />
        <el-table-column prop="articleCount" label="文章数" width="100" align="center" />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="success" @click="handleAddChild(row)">添加子分类</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button link type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" :max="999" />
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
import { ref, reactive, computed } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新增分类')
const formRef = ref<FormInstance>()
const editId = ref<number | null>(null)

const tableData = ref([
  { id: 1, name: '前端技术', description: '前端开发相关技术文章', articleCount: 45, sort: 1, children: [
    { id: 11, name: 'Vue', description: 'Vue框架相关', articleCount: 20, sort: 1 },
    { id: 12, name: 'React', description: 'React框架相关', articleCount: 15, sort: 2 },
    { id: 13, name: 'TypeScript', description: 'TypeScript相关', articleCount: 10, sort: 3 }
  ]},
  { id: 2, name: '后端开发', description: '后端开发技术文章', articleCount: 32, sort: 2 },
  { id: 3, name: '工程化', description: '工程化与工具链', articleCount: 18, sort: 3 },
  { id: 4, name: '其他', description: '其他杂项', articleCount: 8, sort: 99 }
])

const form = reactive({ name: '', description: '', parentId: null as number | null, sort: 0 })

const rules: FormRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

function handleAdd() {
  resetForm()
  dialogTitle.value = '新增分类'
  dialogVisible.value = true
}

function handleEdit(row: any) {
  editId.value = row.id
  Object.assign(form, { name: row.name, description: row.description || '', sort: row.sort })
  dialogTitle.value = '编辑分类'
  dialogVisible.value = true
}

function handleAddChild(row: any) {
  resetForm()
  form.parentId = row.id
  dialogTitle.value = `在「${row.name}」下新增子分类`
  dialogVisible.value = true
}

function handleDelete(id: number) {
  ElMessage.success('删除成功')
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success(editId.value ? '编辑成功' : '新增成功')
      dialogVisible.value = false
    }
  })
}

function resetForm() {
  editId.value = null
  Object.assign(form, { name: '', description: '', parentId: null, sort: 0 })
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
