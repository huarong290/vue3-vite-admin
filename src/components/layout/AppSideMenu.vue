<!--src/components/layout/AppSideMenu.vue-->

<template>
  <transition name="sidebar-collapse">
    <el-menu
      router
      :default-active="$route.path"
      :collapse="collapse"
      class="sidebar-menu"
      unique-opened
    >
      <!-- 遍历顶层路由，递归渲染 -->
      <SideMenuItem
        v-for="route in menuRoutes"
        :key="route.name ?? route.path"
        :route="route"
        :collapse="collapse"
      />
    </el-menu>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, type RouteRecordRaw, type RouteRecord } from 'vue-router'
import SideMenuItem from './SideMenuItem.vue'

defineProps<{ collapse: boolean }>()

const router = useRouter()
/**
 * 获取 AppLayout 下的子路由作为菜单数据
 * 过滤掉没有 meta.title 的路由
 */
const menuRoutes = computed<RouteRecordRaw[]>(() => {
  const layoutRoute = router.options.routes.find((r) => r.path === '/') as RouteRecord
  const children = layoutRoute?.children ?? []
  return children.filter((r) => r.meta && r.meta.title)
})

// const menuRoutes = computed<RouteRecordRaw[]>(() => {
//   const root = router.options.routes[0] as RouteRecordRaw
//   const children = root?.children ?? []
//   return children.filter((r) => r.meta && r.meta.title)
// })
</script>
<style scoped lang="scss"></style>
