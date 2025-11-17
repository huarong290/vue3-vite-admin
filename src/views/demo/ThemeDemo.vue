<template>
  <div class="theme-demo">
    <!-- 头部：主题切换器 + 设置面板 -->
    <header class="demo-header">
      <h2>🎨 Theme Demo</h2>
      <ThemeSettings />
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
      <el-card class="card">
        <div class="card-header">
          <h4 class="card-title">卡片标题</h4>
          <p class="card-subtitle">副标题</p>
        </div>
        <div class="card-body">
          <p>这是卡片内容。</p>
        </div>
        <div class="card-footer">底部信息</div>
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

    <!-- 标签页演示 -->
    <section class="demo-section">
      <h3>标签页演示</h3>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="用户管理" name="user">
          <p>这里是用户管理内容。</p>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="config">
          <p>这里是配置管理内容。</p>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="role">
          <p>这里是角色管理内容。</p>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import ThemeSettings from "@/components/theme-settings/ThemeSettings.vue";
import { ref } from "vue";

const tableData = [
  { name: "张三", age: 28, role: "开发工程师" },
  { name: "李四", age: 32, role: "产品经理" },
  { name: "王五", age: 25, role: "设计师" },
];

const activeTab = ref("user");
</script>

<style scoped lang="scss">
//.theme-demo {
//  padding: var(--spacing-6);
//
//  .demo-header {
//    display: flex;
//    justify-content: space-between;
//    align-items: center;
//    margin-bottom: var(--spacing-6);
//    border-bottom: 1px solid var(--color-border-light);
//    padding-bottom: var(--spacing-4);
//
//    h2 {
//      color: var(--color-text-primary);
//    }
//  }
//
//  .demo-section {
//    margin-bottom: var(--spacing-6);
//
//    h3 {
//      margin-bottom: var(--spacing-3);
//      color: var(--color-text-primary);
//    }
//  }
//
//  /* ✅ 卡片覆盖 */
//  :deep(.el-card) {
//    background-color: var(--color-bg-container);
//    color: var(--color-text-primary);
//    border: 1px solid var(--color-border-light);
//  }
//
//  :deep(.el-card h4) {
//    color: var(--color-text-primary);
//  }
//
//  :deep(.el-card p) {
//    color: var(--color-text-secondary);
//  }
//
//  /* ✅ 表格覆盖 */
//  :deep(.el-table) {
//    background-color: var(--color-bg-container);
//    color: var(--color-text-primary);
//  }
//
//  :deep(.el-table th) {
//    background-color: var(--color-bg-container);
//    color: var(--color-text-primary);
//  }
//
//  :deep(.el-table td) {
//    color: var(--color-text-secondary);
//  }
//
//  /* ✅ 标签页覆盖 */
//  :deep(.el-tabs__item) {
//    color: var(--color-text-secondary);
//  }
//
//  :deep(.el-tabs__item.is-active) {
//    color: var(--color-primary);
//    font-weight: var(--font-weight-semibold);
//  }
//
//  :deep(.el-tabs__active-bar) {
//    background-color: var(--color-primary);
//  }
//}
</style>

