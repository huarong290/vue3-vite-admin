<!--src/components/layout/AppSideMenu.vue-->

<template>
  <transition name="sidebar-collapse">
    <el-menu router :default-active="$route.path" :collapse="collapse" class="sidebar-menu">
      <SideMenuItem v-for="route in menuRoutes" :key="route.name ?? route.path" :route="route" />
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
<style scoped lang="scss"></style>
