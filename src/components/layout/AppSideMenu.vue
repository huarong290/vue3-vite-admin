<template>
  <el-menu
    router
    :default-active="$route.path"
    :collapse="collapse"
    unique-opened
    class="side-menu"
  >
    <!-- 静态路由：直接从 router.getRoutes() 过滤 -->
    <SideMenuItem
      v-for="route in staticRoutes"
      :key="route.name ?? route.path"
      :route="route"
      :collapse="collapse"
    />

    <!-- 动态路由：从 menuStore.menus 渲染 -->
    <SideMenuItem
      v-for="route in dynamicRoutes"
      :key="route.name ?? route.path"
      :route="route"
      :collapse="collapse"
    />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu/menu'
import SideMenuItem from './SideMenuItem.vue'

defineProps<{ collapse: boolean }>()

const router = useRouter()
const menuStore = useMenuStore()

//  静态路由：通过 router.getRoutes() 过滤出 demoRoutes
const staticRoutes = computed(() => router.getRoutes().filter((r) => r.name === 'DemoModule'))

//  动态路由：直接取 menuStore.menus
const dynamicRoutes = computed(() => menuStore.menus)
</script>
