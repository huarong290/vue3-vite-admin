<!--src/components/layout/AppSideMenu.vue-->

<template>
  <transition name="sidebar-collapse">
    <el-menu
        router
        :default-active="$route.path"
        :collapse="collapse"
        class="sidebar-menu"
    >
      <SideMenuItem
          v-for="route in menuRoutes"
          :key="route.name ?? route.path"
          :route="route"
      />
    </el-menu>
  </transition>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import SideMenuItem from './SideMenuItem.vue'

defineProps<{ collapse: boolean }>()

const router = useRouter()

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
  /* ✅ 折叠/展开动画 */
  .sidebar-collapse-enter-active,
  .sidebar-collapse-leave-active {
    transition: all 0.3s ease;
  }
  .sidebar-collapse-enter-from,
  .sidebar-collapse-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
</style>
