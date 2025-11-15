<template>
  <div class="theme-demo">
    <!-- 头部：主题切换器 -->
    <header class="demo-header">
      <h2>🎨 Theme Demo</h2>
      <ThemeSwitcher />
    </header>

    <!-- 按钮演示 -->
    <section class="demo-section">
      <h3>按钮演示</h3>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button>默认按钮</el-button>
    </section>

    <!-- 卡片演示 -->
    <section class="demo-section">
      <h3>卡片演示</h3>
      <el-card class="demo-card">
        <h4>卡片标题</h4>
        <p>这是卡片内容，背景和文字会随主题切换。</p>
      </el-card>
    </section>

    <!-- 表格演示 -->
    <section class="demo-section">
      <h3>表格演示</h3>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="role" label="角色" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/theme-switcher/ThemeSwitcher.vue'

const tableData = [
  { name: '张三', age: 28, role: '开发工程师' },
  { name: '李四', age: 32, role: '产品经理' },
  { name: '王五', age: 25, role: '设计师' }
]
</script>

<style scoped lang="scss">
.theme-demo {
  padding: var(--spacing-6);

  .demo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-6);
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: var(--spacing-4);
  }

  .demo-section {
    margin-bottom: var(--spacing-6);

    h3 {
      margin-bottom: var(--spacing-3);
      color: var(--color-text-primary);
    }
  }

  .demo-card {
    max-width: 400px;
  }
}
</style>
