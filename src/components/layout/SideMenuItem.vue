<!--src/components/layout/SideMenuItem.vue-->
<template>
  <!-- 有子路由时递归渲染 -->
  <el-sub-menu v-if="hasChildren" :index="routeKey()">
    <template #title>
      <!--  图标加动画 -->
      <el-icon v-if="route.meta?.icon" class="menu-icon" :class="{ animate: collapse }">
        <component :is="route.meta.icon" />
      </el-icon>
      <span>{{ route.meta?.title }}</span>
    </template>
    <SideMenuItem
        v-for="child in visibleChildren"
        :key="childKey(child)"
        :route="child"
    />
  </el-sub-menu>

  <!-- 普通菜单项 + tooltip -->
  <el-tooltip
      v-else-if="!route.meta?.hiddenInMenu"
      :content="route.meta?.title"
      placement="right"
      :disabled="!collapse"
  >
    <el-menu-item :index="routeIndex()">
      <el-icon v-if="route.meta?.icon" class="menu-icon" :class="{ animate: collapse }">
        <component :is="route.meta.icon" />
      </el-icon>
      <span>{{ route.meta?.title }}</span>
    </el-menu-item>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useRouter, type RouteRecordRaw } from 'vue-router'

const props = defineProps<{ route: RouteRecordRaw; collapse?: boolean }>()
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

<style scoped lang="scss">
.menu-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.menu-icon.animate {
  transform: rotate(20deg) scale(1.2);
}
</style>

