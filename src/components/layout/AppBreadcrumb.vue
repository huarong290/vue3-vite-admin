<!--src/components/layout/AppBreadcrumb.role-->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(r, i) in breadcrumbRoutes" :key="i">
      <router-link v-if="r.path" :to="r.path">{{ r.meta.title }}</router-link>
      <span v-else>{{ r.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
        }
      }
    }
  }
}
</style>
