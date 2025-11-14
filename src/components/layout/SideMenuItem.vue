<!--src/components/layout/SideMenuItem.vue-->
<template>
  <!-- 有子路由时递归渲染 -->
  <el-sub-menu v-if="hasChildren" :index="routeKey()">
    <template #title>{{ route.meta?.title }}</template>
    <SideMenuItem
        v-for="child in visibleChildren"
        :key="childKey(child)"
        :route="child"
    />
  </el-sub-menu>

  <!-- 普通菜单项 -->
  <el-menu-item v-else-if="!route.meta?.hiddenInMenu" :index="routeIndex()">
    {{ route.meta?.title }}
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter, type RouteRecordRaw } from 'vue-router'

const props = defineProps<{ route: RouteRecordRaw }>()
const router = useRouter()

// 是否有子路由
const hasChildren = !!props.route.children && props.route.children.length > 0

// 过滤掉 hiddenInMenu 的子路由
const visibleChildren: RouteRecordRaw[] = (props.route.children as RouteRecordRaw[] || []).filter(
    (c) => c.meta?.title && !c.meta?.hiddenInMenu
)

// 子路由 key
function childKey(r: RouteRecordRaw) {
  return r.name ?? r.path
}

// 子菜单 index
function routeKey() {
  return props.route.name ?? props.route.path
}

// 菜单项 index，保证是完整路径
function routeIndex() {
  if (props.route.name) {
    const loc = { name: props.route.name }
    return router.resolve(loc).href.replace(router.options.history.base || '', '')
  }
  return props.route.path
}
</script>

<style scoped lang="scss"></style>

