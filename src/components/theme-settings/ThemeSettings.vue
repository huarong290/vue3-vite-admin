<template>
  <div class="theme-settings">
    <h3>🎨 主题设置面板</h3>

    <!-- 模式切换 -->
    <div class="setting-item">
      <span>主题模式：</span>
      <el-switch v-model="isDark" active-text="暗黑" inactive-text="明亮" @change="toggleMode" />
    </div>

    <!-- 主色选择器 -->
    <div class="setting-item">
      <span>主色：</span>
      <el-color-picker
        v-model="themeStore.primaryColor"
        @change="(c) => themeStore.setPrimaryColor(c)"
      />
    </div>

    <!-- Success 颜色选择器 -->
    <div class="setting-item">
      <span>成功色：</span>
      <el-color-picker v-model="successColor" @change="(c) => themeStore.setSuccessColor(c)" />
    </div>

    <!-- Warning 颜色选择器 -->
    <div class="setting-item">
      <span>警告色：</span>
      <el-color-picker v-model="warningColor" @change="(c) => themeStore.setWarningColor(c)" />
    </div>

    <!-- Danger 颜色选择器 -->
    <div class="setting-item">
      <span>错误色：</span>
      <el-color-picker v-model="dangerColor" @change="(c) => themeStore.setDangerColor(c)" />
    </div>

    <!-- Info 颜色选择器 -->
    <div class="setting-item">
      <span>信息色：</span>
      <el-color-picker v-model="infoColor" @change="(c) => themeStore.setInfoColor(c)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme/theme.ts'

const themeStore = useThemeStore()

// 语义色本地状态（可选：也可以直接从 CSS 变量读取）
const successColor = ref('#67c23a')
const warningColor = ref('#e6a23c')
const dangerColor = ref('#f56c6c')
const infoColor = ref('#909399')

// 暗黑模式开关
const isDark = computed({
  get: () => themeStore.isDark,
  set: (val: boolean) => {
    themeStore.setMode(val ? 'dark' : 'light')
  }
})

function toggleMode() {
  themeStore.setMode(isDark.value ? 'dark' : 'light')
}
</script>

<style scoped lang="scss">
.theme-settings {
  padding: var(--spacing-4);
  background: var(--color-bg-container);
  border-radius: var(--border-radius-base);
  box-shadow: var(--box-shadow-sm);

  h3 {
    margin-bottom: var(--spacing-4);
    color: var(--color-text-primary);
  }

  .setting-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-3);

    span {
      width: 80px;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
}
</style>
