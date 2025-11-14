<!--src/views/HomePage.role-->
<template>
  <div class="home-page">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>欢迎使用后台管理系统</h2>
        </div>
      </template>

      <div class="welcome-content">
        <p>这是一个基于 Vue 3 + TypeScript + Element Plus 的后台管理系统。</p>

        <div class="quick-actions">
          <h3>快速导航</h3>
          <div class="action-buttons">
            <el-button type="primary" @click="$router.push('/about')"> 关于页面 </el-button>
          </div>
        </div>

        <div class="system-info">
          <h3>系统信息</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="Vue版本">3.3.0</el-descriptions-item>
            <el-descriptions-item label="TypeScript版本">5.0.0+</el-descriptions-item>
            <el-descriptions-item label="Element Plus版本">2.3.0+</el-descriptions-item>
            <el-descriptions-item label="路由系统">Vue Router 4</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home-page {
  .welcome-card {
    margin-bottom: var(--spacing-6);

    .card-header {
      h2 {
        margin: 0;
        color: var(--color-text-primary);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
      }
    }

    .welcome-content {
      p {
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--spacing-6);
      }

      .quick-actions {
        margin-bottom: var(--spacing-8);

        h3 {
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-4);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
        }
      }

      .system-info {
        h3 {
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-4);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
        }
      }
    }
  }
}
</style>
