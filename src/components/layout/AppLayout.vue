<!--src/components/layout/AppLayout.vue-->
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
        <div class="layout-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideMenu from '@/components/layout/AppSideMenu.vue'
import AppBreadCrumb from '@/components/layout/AppBreadCrumb.vue'
//  桌面端折叠状态
const isCollapse = ref(false)
//  移动端菜单开关
const isMobileMenuOpen = ref(false)
const asideRef = ref<HTMLElement | null>(null)

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

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
/*  只保留局部样式：移动端遮罩效果 */
@media screen and (max-width: 768px) {
  .layout-aside {
    position: absolute;
    z-index: 1000;
    height: 100vh;
    transform: translateX(-100%);
  }

  .layout-aside.open {
    transform: translateX(0);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15); // 移动端遮罩效果
  }
}
</style>
