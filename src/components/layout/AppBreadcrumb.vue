<!--src/components/layout/AppBreadcrumb.vue-->
<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.name">{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  padding: var(--spacing-4);
  background: var(--color-bg-container);
  border-bottom: 1px solid var(--color-border-light);

  :deep(.el-breadcrumb) {
    font-size: var(--font-size-sm);

    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: var(--color-text-secondary);

        &.is-link {
          color: var(--color-primary);

          &:hover {
            color: var(--color-primary);
            text-decoration: underline;
          }
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }
      }
    }
  }
}
</style>