<template>
  <div class="write-article-page">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑文章' : '写文章' }}</h2>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" size="large" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input
          v-model="form.summary"
          type="textarea"
          :rows="3"
          placeholder="请输入文章摘要"
        />
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="选择分类" style="width: 100%">
          <el-option
            v-for="cat in categories"
            :key="cat.id"
            :label="cat.name"
            :value="cat.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图">
        <el-input v-model="form.coverImage" placeholder="输入封面图 URL（可选）" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="16"
          placeholder="请输入文章内容（支持 HTML）"
        />
      </el-form-item>
      <el-form-item>
        <div class="form-actions">
          <el-button type="primary" @click="saveAsDraft" :loading="saving">
            保存草稿
          </el-button>
          <el-button type="success" @click="publishDirectly" :loading="publishing">
            发布文章
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createArticleApi, updateArticleApi, getArticleDetailApi, type Article } from '@/api/article'
import { getCategoryTreeApi } from '@/api/category'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()

const isEdit = computed(() => !!route.params.id)
const articleId = computed(() => (route.params.id ? Number(route.params.id) : null))

const categories = ref<any[]>([])
const saving = ref(false)
const publishing = ref(false)

const form = reactive({
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  categoryId: undefined as number | undefined
})

const rules: FormRules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

async function fetchCategories() {
  try {
    const res = await getCategoryTreeApi()
    categories.value = res.data || []
  } catch {
    // ignore
  }
}

async function loadArticle() {
  if (!articleId.value) return
  try {
    const res = await getArticleDetailApi(articleId.value)
    const data = res.data
    form.title = data.title || ''
    form.summary = data.summary || ''
    form.content = data.content || ''
    form.coverImage = data.coverImage || ''
    form.categoryId = data.categoryId
  } catch {
    ElMessage.error('文章加载失败')
    router.push('/user/articles')
  }
}

async function save(status: 'draft' | 'published') {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  const data = {
    title: form.title,
    summary: form.summary,
    content: form.content,
    coverImage: form.coverImage || undefined,
    categoryId: form.categoryId,
    status
  }

  if (isEdit.value && articleId.value) {
    await updateArticleApi(articleId.value, data)
    ElMessage.success('保存成功')
  } else {
    await createArticleApi(data)
    ElMessage.success(status === 'draft' ? '草稿已保存' : '文章已发布')
    router.push('/user/articles')
  }
}

async function saveAsDraft() {
  saving.value = true
  try {
    await save('draft')
  } finally {
    saving.value = false
  }
}

async function publishDirectly() {
  publishing.value = true
  try {
    await save('published')
  } finally {
    publishing.value = false
  }
}

function cancel() {
  router.push(isEdit.value ? '/user/articles' : '/')
}

onMounted(() => {
  fetchCategories()
  if (isEdit.value) {
    loadArticle()
  }
})
</script>

<style lang="scss" scoped>
.write-article-page {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.page-header {
  margin-bottom: 24px;

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
}
</style>
