<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-cards">
      <el-col :xs="12" :sm="6" v-for="item in statCards" :key="item.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-title">{{ item.title }}</div>
            </div>
            <el-icon :class="['stat-icon', item.color]">
              <component :is="item.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>文章访问趋势</template>
          <div ref="lineChartRef" style="height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>文章分类占比</template>
          <div ref="pieChartRef" style="height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="hover" class="recent-card">
      <template #header>最近文章</template>
      <el-table :data="recentArticles" stripe>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="views" label="阅读量" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'info'" size="small">
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发布时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const lineChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()
let lineChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

const statCards = [
  { title: '文章总数', value: 128, icon: 'Document', color: 'blue' },
  { title: '评论总数', value: 1024, icon: 'ChatDotRound', color: 'green' },
  { title: '访问量', value: 56789, icon: 'View', color: 'orange' },
  { title: '用户数', value: 356, icon: 'User', color: 'red' }
]

const recentArticles = [
  { title: 'Vue3 Composition API 深入理解', category: '前端技术', views: 1234, status: 'published', date: '2026-04-01' },
  { title: 'TypeScript 最佳实践指南', category: '前端技术', views: 986, status: 'published', date: '2026-03-28' },
  { title: 'Vite 构建工具详解', category: '工程化', views: 756, status: 'draft', date: '2026-03-25' },
  { title: 'Pinia 状态管理实战', category: '前端技术', views: 543, status: 'published', date: '2026-03-20' },
  { title: 'Element Plus 组件库使用技巧', category: '前端技术', views: 432, status: 'published', date: '2026-03-15' }
]

function initCharts() {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    lineChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: { type: 'value' },
      series: [{
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 1234, 1290, 1330],
        areaStyle: { opacity: 0.3 }
      }]
    })
  }

  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
    pieChart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 48, name: '前端技术' },
          { value: 26, name: '后端开发' },
          { value: 18, name: '工程化' },
          { value: 14, name: '其他' }
        ]
      }]
    })
  }
}

function handleResize() {
  lineChart?.resize()
  pieChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  lineChart?.dispose()
  pieChart?.dispose()
})
</script>

<style lang="scss" scoped>
.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  .stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: $text-primary;
  }

  .stat-title {
    margin-top: 8px;
    font-size: 14px;
    color: $text-secondary;
  }

  .stat-icon {
    font-size: 48px;

    &.blue { color: #409eff; }
    &.green { color: #67c23a; }
    &.orange { color: #e6a23c; }
    &.red { color: #f56c6c; }
  }
}

.chart-row {
  margin-bottom: 20px;
}
</style>
