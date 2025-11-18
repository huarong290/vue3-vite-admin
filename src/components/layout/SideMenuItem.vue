<!--src/components/layout/SideMenuItem.vue-->
<template>
  <!-- 有子路由时递归渲染 -->
  <el-sub-menu v-if="hasChildren" :index="routeIndex">
    <template #title>
      <el-icon v-if="route.meta?.icon" class="menu-icon" :class="{ animate: collapse }">
        <component :is="route.meta.icon" />
      </el-icon>
      <span>{{ route.meta?.title }}</span>
    </template>

    <!-- 子菜单递归 -->
    <SideMenuItem
      v-for="child in visibleChildren"
      :key="childKey(child)"
      :route="normalizeChildRoute(child)"
      :collapse="collapse"
    />
  </el-sub-menu>

  <!-- 普通菜单项 + tooltip -->
  <el-tooltip
    v-else-if="!route.meta?.hiddenInMenu"
    :content="route.meta?.title"
    placement="right"
    :disabled="!collapse"
  >
    <el-menu-item :index="routeIndex">
      <el-icon v-if="route.meta?.icon" class="menu-icon" :class="{ animate: collapse }">
        <component :is="route.meta.icon" />
      </el-icon>
      <span>{{ route.meta?.title }}</span>
    </el-menu-item>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{ route: RouteRecordRaw; collapse?: boolean }>()

/* 是否有子路由 */
const hasChildren = computed(() => props.route.children && props.route.children.length > 0)

/* 过滤掉 hiddenInMenu 的子路由 */
const visibleChildren = computed(() =>
  ((props.route.children as RouteRecordRaw[]) || []).filter(
    (c) => c.meta?.title && !c.meta?.hiddenInMenu
  )
)

/* 子路由 key */
function childKey(r: RouteRecordRaw) {
  return r.name ?? r.path
}

/* 菜单项 index，保证是完整路径 */
const routeIndex = computed(() => {
  return props.route.path.startsWith('/') ? props.route.path : `/${props.route.path}`
})

/* 拼接父路径，保证子菜单能正确跳转 */
function normalizeChildRoute(child: RouteRecordRaw): RouteRecordRaw {
  return {
    ...child,
    path: child.path.startsWith('/') ? child.path : `${props.route.path}/${child.path}`
  }
}
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
