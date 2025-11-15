// src/stores/modules/theme/theme.ts
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'custom' | 'blue' | 'green'

/**
 * 预设主题色映射
 */
const presetColors: Record<ThemeMode, string> = {
    light: '#409eff', // 默认蓝色
    dark: '#409eff',
    custom: '#409eff',
    blue: '#1e40af',
    green: '#16a34a'
}

export const useThemeStore = defineStore('theme', {
    state: () => ({
        mode: 'light' as ThemeMode, // 当前主题模式
        primaryColor: '#409eff' // 当前主题色（默认蓝色）
    }),
    getters: {
        isDark: (state) => state.mode === 'dark'
    },
    actions: {
        /**
         *  切换主题模式
         */
        setMode(mode: ThemeMode) {
            this.mode = mode
            document.documentElement.setAttribute('data-theme', mode)
            localStorage.setItem('theme-mode', mode)

            // 如果是预设主题，自动更新主色
            if (presetColors[mode]) {
                this.setPrimaryColor(presetColors[mode])
            }
        },

        /**
         * 设置主题色（支持自定义）
         */
        setPrimaryColor(color: string) {
            this.primaryColor = color

            // 自定义变量
            document.documentElement.style.setProperty('--color-primary', color)
            document.documentElement.style.setProperty('--color-hover', `color-mix(in srgb, ${color} 90%, white)`)
            document.documentElement.style.setProperty('--color-active', `color-mix(in srgb, ${color} 80%, black)`)

            // Element Plus 内置变量同步
            document.documentElement.style.setProperty('--el-color-primary', color)
            document.documentElement.style.setProperty('--el-color-primary-light-3', `color-mix(in srgb, ${color} 70%, white)`)
            document.documentElement.style.setProperty('--el-color-primary-light-5', `color-mix(in srgb, ${color} 50%, white)`)
            document.documentElement.style.setProperty('--el-color-primary-dark-2', `color-mix(in srgb, ${color} 80%, black)`)

            localStorage.setItem('theme-color', color)
        },

        /**
         *  初始化主题（从 localStorage 恢复）
         */
        initTheme() {
            const savedMode = (localStorage.getItem('theme-mode') as ThemeMode) || this.mode
            const savedColor = localStorage.getItem('theme-color') || this.primaryColor

            this.setMode(savedMode)
            this.setPrimaryColor(savedColor)
        }
    }
})
