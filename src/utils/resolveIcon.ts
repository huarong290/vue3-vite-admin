// src/utils/resolveIcon.ts
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { Component } from 'vue'

// 转换函数：首字母大写
function formatIconName(name: string) {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// 统一的解析函数
export function resolveIcon(name: string): Component | undefined {
  if (!name) return undefined

  // 先尝试直接匹配（PascalCase）
  let finalName = name

  // 如果是小写，转成 PascalCase
  if (/^[a-z]/.test(name)) {
    finalName = formatIconName(name)
  }

  // 从 ElementPlusIconsVue 中取对应组件
  return (ElementPlusIconsVue as Record<string, Component>)[finalName]
}
