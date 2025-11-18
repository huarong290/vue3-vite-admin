<!--src/components/layout/AppHeader.vue-->
<template>
  <div class="header">
    <!-- 左侧：折叠按钮 + 系统标题 -->
    <!-- 按钮图标根据折叠状态切换 菜单折叠按钮：加上 Tooltip -->
    <div class="header-left">
      <el-tooltip :content="isCollapse ? '展开菜单' : '收起菜单'" placement="bottom">
        <el-button
          class="menu-toggle"
          :icon="isCollapse ? Expand : Fold"
          circle
          @click="$emit('toggle-menu')"
        />
      </el-tooltip>
      <span class="system-title">欢迎使用系统</span>
    </div>
    <!-- 右侧操作区 -->
    <div class="header-right">
      <!-- 主题切换按钮：使用 Element Plus 官方图标 + Tooltip -->
      <el-tooltip
        :content="themeStore.mode === 'light' ? '切换到暗黑模式' : '切换到明亮模式'"
        placement="bottom"
      >
        <el-button @click="toggleTheme" circle>
          <el-icon>
            <component :is="themeStore.mode === 'light' ? Sunny : Moon" />
          </el-icon>
        </el-button>
      </el-tooltip>

      <!--颜色选择器 -->
      <el-color-picker v-model="themeStore.primaryColor" @change="themeStore.setPrimaryColor" />
      <!-- 全屏按钮：使用 Element Plus 官方图标 加上 Tooltip -->
      <el-tooltip :content="isFullscreen ? '退出全屏' : '进入全屏'" placement="bottom">
        <el-button @click="toggleFullscreen" circle>
          <el-icon>
            <component :is="isFullscreen ? Close : FullScreen" />
          </el-icon>
        </el-button>
      </el-tooltip>

      <!-- 用户头像 + 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="avatar-wrapper">
          <el-avatar size="small" src="https://avatars.githubusercontent.com/u/9919?v=4" />
          <span class="username">Admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme/theme.ts'
import { ref } from 'vue'
import { Expand, Fold, Close, FullScreen, Sunny, Moon } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

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
function logout() {
  // 清理 token
  localStorage.removeItem('token')
  localStorage.removeItem('saved-username')
  localStorage.removeItem('saved-password')

  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped lang="scss"></style>
