<!-- src/components/layout/SideMenuItem.vue -->

<template>
  <!-- 如果有子路由，渲染为 SubMenu -->
  <el-sub-menu v-if="hasChildren" :index="route.path">
    <template #title>
      <el-icon v-if="route.meta?.icon">
        <component :is="iconComponent" />
      </el-icon>
      <span>{{ route.meta?.title || route.name }}</span>
    </template>

    <!-- 递归渲染子菜单 -->
    <SideMenuItem
      v-for="child in route.children"
      :key="child.path"
      :route="child"
      :collapse="collapse"
    />
  </el-sub-menu>

  <!-- 如果没有子路由，渲染为普通菜单项 -->
  <el-menu-item v-else :index="route.path">
    <el-icon v-if="route.meta?.icon">
      <component :is="iconComponent" />
    </el-icon>
    <span>{{ route.meta?.title || route.name }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { resolveIcon } from '@/utils/resolveIcon.ts'

// 正确写法：直接解构 props
const { route, collapse } = defineProps<{
  route: RouteRecordRaw
  collapse: boolean
}>()

//  判断是否有子路由
const hasChildren = computed(() => {
  return Array.isArray(route.children) && route.children.length > 0
})
// 解析图标
const iconComponent = computed(() => resolveIcon(route.meta?.icon as string))
</script>

<style scoped lang="scss">
.menu-icon {
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.menu-icon.animate {
  transform: rotate(20deg) scale(1.2);
}
</style>
