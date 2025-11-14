<!--src/views/AboutPage.role-->
<template>
  <div class="about-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>关于页面</h2>
        </div>
      </template>

      <div class="about-content">
        <p>这里是另一个测试页面。</p>

        <div class="features">
          <h3>功能特性</h3>
          <ul class="feature-list">
            <li>✅ 现代化的 Vue 3 技术栈</li>
            <li>✅ TypeScript 类型支持</li>
            <li>✅ Element Plus UI 组件库</li>
            <li>✅ 响应式布局设计</li>
            <li>✅ 完整的样式系统</li>
            <li>✅ 路由导航系统</li>
          </ul>
        </div>

        <div class="tech-stack">
          <h3>技术栈</h3>
          <el-tag v-for="tech in techStack" :key="tech" type="primary" class="tech-tag">
            {{ tech }}
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const techStack = ['Vue 3', 'TypeScript', 'Element Plus', 'Vue Router', 'SCSS', 'Vite']
</script>

<style lang="scss" scoped>
.about-page {
  .card-header {
    h2 {
      margin: 0;
      color: var(--color-text-primary);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-semibold);
    }
  }

  .about-content {
    p {
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
      margin-bottom: var(--spacing-6);
      font-size: var(--font-size-base);
    }

    .features {
      margin-bottom: var(--spacing-8);

      h3 {
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-4);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
      }

      .feature-list {
        li {
          padding: var(--spacing-2) 0;
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
        }
      }
    }

    .tech-stack {
      h3 {
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-4);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
      }

      .tech-tag {
        margin-right: var(--spacing-2);
        margin-bottom: var(--spacing-2);
      }
    }
  }
}
</style>
