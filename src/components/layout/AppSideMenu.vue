<!--src/components/layout/AppSideMenu.vue-->

<template>
  <el-menu router :default-active="$route.path" class="sidebar-menu">
    <SideMenuItem
        v-for="route in menuRoutes"
        :key="route.name ?? route.path"
        :route="route"
    />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import SideMenuItem from './SideMenuItem.vue'

const router = useRouter()

// 获取顶层路由的 children
const menuRoutes = computed<RouteRecordRaw[]>(() => {
  const root = router.options.routes[0] as RouteRecordRaw
  const children = root?.children ?? []
  return children.filter((r) => r.meta && r.meta.title)
})
</script>

<style scoped lang="scss">
.sidebar-menu {
  border: none;
  height: 100%;
}
</style>




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
