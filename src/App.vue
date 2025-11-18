<!--src/App.vue-->
<template>
  <!-- 在根容器上绑定 data-theme -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme/theme.ts'

// ✅ 初始化主题（刷新后保持用户选择）
const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<style lang="scss">
// ✅ 引入全局样式入口
@use '@/styles/index.scss' as *;
</style>
