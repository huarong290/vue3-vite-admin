<template>
  <div class="theme-switcher">
    <!-- 模式切换按钮 -->
    <el-button @click="toggleMode" circle>
      {{ themeStore.mode === 'light' ? '🌞' : '🌙' }}
    </el-button>

    <!-- 颜色选择器：切换到自定义模式 -->
    <el-color-picker v-model="themeStore.primaryColor" @change="handleColorChange" show-alpha />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme/theme'

const themeStore = useThemeStore()

// 切换 Light/Dark 模式
function toggleMode() {
  themeStore.setMode(themeStore.mode === 'light' ? 'dark' : 'light')
}

// 用户选择颜色时，切换到 custom 模式
function handleColorChange(color: string) {
  themeStore.setPrimaryColor(color)
}
</script>

<style scoped lang="scss">
.theme-switcher {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);

  .el-button {
    font-size: var(--font-size-lg);
  }
}
</style>
