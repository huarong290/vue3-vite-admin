<!--src/components/layout/AppHeader.vue-->
<template>
  <div class="header">
    <!--  按钮图标根据折叠状态切换 -->
    <el-button
      class="menu-toggle"
      :icon="isCollapse ? 'Expand' : 'Fold'"
      circle
      @click="$emit('toggle-menu')"
    />
    <!-- 右侧操作区 -->
    <div class="header-right">
      <span>欢迎使用系统</span>
      <!-- 主题切换按钮 -->
      <el-button @click="toggleTheme" circle>
        {{ themeStore.mode === 'light' ? '🌞' : '🌙' }}
      </el-button>

      <!--颜色选择器 -->
      <el-color-picker v-model="themeStore.primaryColor" @change="themeStore.setPrimaryColor" />
      <!--  全屏按钮：使用 Element Plus 官方图标 -->
      <el-button @click="toggleFullscreen" circle>
        <el-icon>
          <component :is="isFullscreen ? Close : FullScreen" />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme/theme.ts'
import { ref } from 'vue'
import { Close, FullScreen } from '@element-plus/icons-vue'

defineProps<{ isCollapse: boolean }>()

const themeStore = useThemeStore()

function toggleTheme() {
  themeStore.setMode(themeStore.mode === 'light' ? 'dark' : 'light')
}
/* 全屏状态 */
const isFullscreen = ref(false)

function toggleFullscreen() {
  if (!isFullscreen.value) {
    // 进入全屏
    document.documentElement.requestFullscreen?.()
    isFullscreen.value = true
  } else {
    // 退出全屏
    document.exitFullscreen?.()
    isFullscreen.value = false
  }
}
</script>

<style scoped lang="scss">
/* AppHeader.vue scoped 样式 */
/* 局部样式：只负责移动端菜单按钮显示逻辑 */
.header {
  .menu-toggle {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .menu-toggle {
      display: inline-flex; // 移动端显示菜单按钮
    }
  }
}
</style>
