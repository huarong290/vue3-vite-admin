<!--src/components/layout/AppBreadcrumb.vue-->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(r, i) in breadcrumbRoutes" :key="i">
      <!-- 最后一级只显示文本，不可点击 -->
      <router-link v-if="r.path && i < breadcrumbRoutes.length - 1" :to="r.path">
        {{ r.meta.title }}
      </router-link>
      <span v-else>{{ r.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 过滤掉没有 meta.title 的路由
const breadcrumbRoutes = computed(() => {
  return route.matched.filter((r) => r.meta && r.meta.title)
})
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
          cursor: default; /* 最后一级不可点击 */
        }
      }
    }
  }
}
</style>
