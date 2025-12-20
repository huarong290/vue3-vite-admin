<!-- src/components/icon/MenuIcon.vue -->
<template>
  <span v-if="iconComponent" class="icon-wrapper">
    <component
      :is="iconComponent"
      class="icon-svg"
      :style="{ width: iconSize + 'px', height: iconSize + 'px', color }"
    />
  </span>
  <span v-else class="icon-wrapper">
    <!-- 如果找不到图标，显示默认占位 -->
    <component
      :is="ElementPlusIconsVue.QuestionFilled"
      class="icon-svg"
      :style="{ width: iconSize + 'px', height: iconSize + 'px', color }"
    />
  </span>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { defineProps, computed } from 'vue'
import type { Component } from 'vue'
const props = defineProps<{
  icon: string
  size?: number
  color?: string
}>()

// 默认尺寸逻辑：如果没有传 size，就用 14px
const iconSize = computed(() => props.size ?? 14)

// 映射表：兼容后端返回的小写或特殊值
const iconMap: Record<string, string> = {
  team: 'UserFilled',
  menu: 'Menu',
  setting: 'Setting',
  user: 'User'
}

// 转换函数：首字母大写
function formatIconName(name: string) {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// 动态解析图标，类型安全
const iconComponent = computed<Component | undefined>(() => {
  const raw = props.icon
  const mapped = iconMap[raw?.toLowerCase()]
  const finalName = mapped || formatIconName(raw)
  return (ElementPlusIconsVue as Record<string, Component>)[finalName]
})
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.icon-svg) {
  width: 1em;
  height: 1em;
}
</style>
