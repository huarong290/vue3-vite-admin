// src/stores/modules/theme/theme.ts
import { defineStore } from 'pinia'
export type ThemeMode = 'light' | 'dark' | 'custom' | 'blue' | 'green'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        mode: 'light' as ThemeMode,          // 当前主题模式
        primaryColor: '#409eff'              // 当前主题色（默认蓝色）
    }),
    getters: {
        isDark: (state) => state.mode === 'dark'
    },
    actions: {
        /**
         * ✅ 切换主题模式
         * @param mode light/dark/custom/blue/green
         */
        setMode(mode: ThemeMode) {
            this.mode = mode
            document.documentElement.setAttribute('data-theme', mode)
            localStorage.setItem('theme-mode', mode)
            // 如果是预设主题，自动更新主色
            if (mode === 'blue') {
                this.setPrimaryColor('#1e40af')
            } else if (mode === 'green') {
                this.setPrimaryColor('#16a34a')
            }
        },
        /**
         * ✅ 设置主题色（支持自定义）
         * @param color 用户选择的颜色
         */
        setPrimaryColor(color: string) {
            this.primaryColor = color
            // 自定义变量
            document.documentElement.style.setProperty('--color-primary', color)
            // Element Plus 内置变量
            document.documentElement.style.setProperty('--el-color-primary', color)
            // 可选：同步 hover/active
            document.documentElement.style.setProperty('--color-hover', `${color}1A`)
            document.documentElement.style.setProperty('--color-active', `${color}33`)
            localStorage.setItem('theme-color', color)
        },
        initTheme() {
            const savedMode = localStorage.getItem('theme-mode') as ThemeMode
            const savedColor = localStorage.getItem('theme-color')
            if (savedMode) {
                this.setMode(savedMode)
            } else {
                this.setMode(this.mode) // 默认 light
            }
            if (savedColor) {
                this.setPrimaryColor(savedColor)
            } else {
                this.setPrimaryColor(this.primaryColor) // 默认蓝色
            }
        }
    }
})
