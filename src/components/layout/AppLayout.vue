<template>
  <el-container class="layout" @click="handleOutsideClick">
    <!-- 左侧导航栏 -->
    <el-aside
      :class="{ open: isMobileMenuOpen }"
      :width="isCollapse ? '64px' : '200px'"
      class="layout-aside"
      ref="asideRef"
    >
      <AppSideMenu :collapse="isCollapse" />
    </el-aside>

    <!-- 右侧区域：头部 + 内容 -->
    <el-container direction="vertical">
      <el-header class="layout-header">
        <AppHeader :isCollapse="isCollapse" @toggle-menu="toggleMenu" />
      </el-header>

      <el-main class="layout-main">
        <app-bread-crumb class="layout-breadcrumb" />

        <!-- ✅ 标签页区域 -->
        <el-tabs
          v-model="activeTab"
          type="card"
          class="layout-tabs"
          closable
          @tab-remove="removeTab"
          @tab-click="handleTabClick"
        >
          <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.title" :name="tab.name" />
        </el-tabs>

        <!-- 路由内容区 -->
        <div class="layout-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideMenu from '@/components/layout/AppSideMenu.vue'
import AppBreadCrumb from '@/components/layout/AppBreadCrumb.vue'
import type { TabsPaneContext } from 'element-plus'

const isCollapse = ref(false)
const isMobileMenuOpen = ref(false)
const asideRef = ref<HTMLElement | null>(null)
interface TabItem {
  title: string
  name: string
  path: string
}
/* 标签页状态 */
const activeTab = ref('')
const tabs = ref<TabItem[]>([])

const route = useRoute()
const router = useRouter()

function toggleMenu() {
  if (window.innerWidth <= 768) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  } else {
    isCollapse.value = !isCollapse.value
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    isMobileMenuOpen.value = false
  }
}

function handleOutsideClick(e: MouseEvent) {
  if (
    window.innerWidth <= 768 &&
    isMobileMenuOpen.value &&
    asideRef.value &&
    !asideRef.value.contains(e.target as Node)
  ) {
    isMobileMenuOpen.value = false
  }
}

/* 标签页操作 */
function addTab(tab: { title: string; name: string; path: string }) {
  if (!tabs.value.find((t) => t.name === tab.name)) {
    tabs.value.push(tab)
  }
  activeTab.value = tab.name
}

function removeTab(name: string) {
  const index = tabs.value.findIndex((t: TabItem) => t.name === name)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (activeTab.value === name && tabs.value.length > 0) {
      const nextIndex = Math.max(0, index - 1)
      const nextTab = tabs.value[nextIndex]

      if (nextTab) {
        activeTab.value = nextTab.name
        router.push(nextTab.path)
      } else {
        // ✅ 如果没有下一个 tab，跳转到首页或默认路由
        activeTab.value = 'Dashboard'
        router.push('/')
      }
    }
  }
}

function handleTabClick(tab: TabsPaneContext) {
  const target = tabs.value.find((t: TabItem) => t.name === tab.paneName)
  if (target) {
    router.push(target.path)
  }
}

/* 监听路由变化，自动添加标签页 */
watch(
  () => route.fullPath,
  () => {
    addTab({
      title: (route.meta.title as string) || route.name?.toString() || '未命名',
      name: route.name?.toString() || route.fullPath,
      path: route.fullPath
    })
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss"></style>
