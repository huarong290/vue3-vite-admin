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
        <app-breadcrumb class="layout-breadcrumb" />
        <div class="layout-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideMenu from '@/components/layout/AppSideMenu.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
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
.layout {
  height: 100vh;
  position: relative;

  &-aside {
    background: var(--color-bg-container);
    border-right: 1px solid var(--color-border-light);
    transition: all 0.3s ease;
  }

  &-header {
    height: 60px;
    background: var(--color-primary);
    padding: 0;
  }

  &-main {
    background: var(--color-bg-body);
    padding: 0;
  }

  &-breadcrumb {
    padding: var(--spacing-4);
    background: var(--color-bg-container);
    border-bottom: 1px solid var(--color-border-light);
  }

  &-content {
    padding: var(--spacing-4);
    min-height: calc(100vh - 120px);
  }

  @media screen and (max-width: 768px) {
    &-aside {
      position: absolute;
      z-index: 1000;
      height: 100vh;
      transform: translateX(-100%);
    }

    &-aside.open {
      transform: translateX(0);
      //  移动端遮罩效果
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>

