<!--src/components/layout/AppLayout.role-->
<template>
  <el-container class="layout">
    <!-- Header -->
    <el-header class="layout-header">
      <AppHeader />
    </el-header>

    <el-container class="layout-body">
      <!-- Sidebar -->
      <el-aside width="200px" class="layout-sidebar">
        <AppSidebar />
      </el-aside>

      <!-- Main Content -->
      <el-main class="layout-main">
        <app-breadcrumb class="layout-breadcrumb"></app-breadcrumb>
        <div class="layout-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  background: var(--color-bg-body);

  &-header {
    padding: 0;
    height: 60px;
    background: var(--color-primary);
  }

  &-body {
    height: calc(100vh - 60px);
  }

  &-sidebar {
    background: var(--color-bg-container);
    border-right: 1px solid var(--color-border-light);
  }

  &-main {
    padding: 0;
    background: var(--color-bg-body);
  }

  &-breadcrumb {
    padding: var(--spacing-4);
    background: var(--color-bg-container);
    border-bottom: 1px solid var(--color-border-light);
  }

  &-content {
    padding: var(--spacing-4);
    min-height: calc(100vh - 120px);
  }
}
</style>
