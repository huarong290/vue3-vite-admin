<!--src/components/layout/AppSidebar.role-->
<template>
  <el-menu router :default-active="$route.path">
    <template v-for="route in menuRoutes" :key="route.path">
      <el-sub-menu v-if="route.children" :index="route.path">
        <template #title>{{ route.meta.title }}</template>
        <el-menu-item
          v-for="child in route.children"
          :key="child.path"
          :index="`${route.path}/${child.path}`"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="route.path">
        {{ route.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuRoutes = computed(() => {
  return router.options.routes.filter((r) => r.meta && r.meta.title)
})
</script>

<style scoped lang="scss">
.sidebar-menu {
  border: none;
  height: 100%;

  :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    margin: 0;

    &.is-active {
      background-color: var(--color-hover);
    }

    &:hover {
      background-color: var(--color-hover);
    }
  }
}
</style>
