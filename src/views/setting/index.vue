<template>
  <div class="setting-manage">
    <el-card shadow="hover">
      <template #header>系统设置</template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="站点名称">
              <el-input v-model="basicForm.siteName" />
            </el-form-item>
            <el-form-item label="站点描述">
              <el-input v-model="basicForm.siteDescription" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="站点Logo">
              <el-upload action="#" :show-file-list="false" accept="image/*">
                <img v-if="basicForm.logo" :src="basicForm.logo" class="logo-preview" />
                <el-button v-else>上传Logo</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="备案号">
              <el-input v-model="basicForm.icp" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveBasic">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="评论设置" name="comment">
          <el-form :model="commentForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="是否开启评论">
              <el-switch v-model="commentForm.enableComment" />
            </el-form-item>
            <el-form-item label="是否审核">
              <el-switch v-model="commentForm.requireAudit" />
            </el-form-item>
            <el-form-item label="敏感词过滤">
              <el-input v-model="commentForm.sensitiveWords" type="textarea" :rows="3"
                placeholder="多个词用逗号分隔" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveComment">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="上传设置" name="upload">
          <el-form :model="uploadForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="存储方式">
              <el-radio-group v-model="uploadForm.storageType">
                <el-radio value="local">本地存储</el-radio>
                <el-radio value="oss">阿里云OSS</el-radio>
                <el-radio value="cos">腾讯云COS</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="最大文件大小(MB)">
              <el-input-number v-model="uploadForm.maxSize" :min="1" :max="50" />
            </el-form-item>
            <el-form-item label="允许格式">
              <el-checkbox-group v-model="uploadForm.allowedTypes">
                <el-checkbox value="jpg">JPG</el-checkbox>
                <el-checkbox value="png">PNG</el-checkbox>
                <el-checkbox value="gif">GIF</el-checkbox>
                <el-checkbox value="webp">WebP</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveUpload">保存设置</el-button>
            </el-formItem>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')

const basicForm = reactive({
  siteName: '我的博客',
  siteDescription: '一个技术分享博客',
  logo: '',
  icp: ''
})

const commentForm = reactive({
  enableComment: true,
  requireAudit: true,
  sensitiveWords: ''
})

const uploadForm = reactive({
  storageType: 'local',
  maxSize: 10,
  allowedTypes: ['jpg', 'png', 'gif', 'webp']
})

function handleSaveBasic() {
  ElMessage.success('保存成功')
}

function handleSaveComment() {
  ElMessage.success('保存成功')
}

function handleSaveUpload() {
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped>
.logo-preview {
  width: 120px;
  height: auto;
}
</style>
