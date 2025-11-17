// src/stores/modules/theme/theme.ts
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'custom' | 'blue' | 'green'

/**
 * 预设主题色映射
 *
 */
const presetColors: Record<ThemeMode, string> = {
  light: '#409eff', // 默认蓝色
  dark: '#409eff', // 保持一致，避免覆盖选色器
  custom: '#409eff',
  blue: '#1e40af',
  green: '#16a34a'
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'light' as ThemeMode,
    primaryColor: '#409eff',
    headerGradient: '#409eff',
    asideGradient: '#409eff'
  }),
  getters: {
    isDark: (state) => state.mode === 'dark'
  },
  actions: {
    /**
     * 切换主题模式
     */
    setMode(mode: ThemeMode) {
      this.mode = mode
      document.documentElement.setAttribute('data-theme', mode)
      localStorage.setItem('theme-mode', mode)

      //// 只有非 dark 模式才更新预设颜色 如果是预设主题，自动更新主色
        const savedColor = localStorage.getItem('theme-color')
        if (savedColor) {
            this.setPrimaryColor(savedColor)
            this.setLayoutGradientColor(savedColor)
        } else if (presetColors[mode]) {
            this.setPrimaryColor(presetColors[mode])
            this.setLayoutGradientColor(presetColors[mode])
        }
    },
    /**
     * 设置主题色（支持自定义）
     * @param color 选中的主色
     * @param updateBackground 是否同步更新布局背景色（默认 false）
     */
    setPrimaryColor(color: string, updateBackground = false) {
      this.primaryColor = color

      // 主色
      document.documentElement.style.setProperty('--color-primary', color)

      // 交互色（跟随主色）
      document.documentElement.style.setProperty(
        '--color-hover',
        `color-mix(in srgb, ${color} 90%, white)`
      )
      document.documentElement.style.setProperty(
        '--color-active',
        `color-mix(in srgb, ${color} 80%, black)`
      )

      // Element Plus 内置变量同步
      document.documentElement.style.setProperty('--el-color-primary', color)
      document.documentElement.style.setProperty(
        '--el-color-primary-light-3',
        `color-mix(in srgb, ${color} 70%, white)`
      )
      document.documentElement.style.setProperty(
        '--el-color-primary-light-5',
        `color-mix(in srgb, ${color} 50%, white)`
      )
      document.documentElement.style.setProperty(
        '--el-color-primary-dark-2',
        `color-mix(in srgb, ${color} 80%, black)`
      )

      // 菜单 hover/active
      document.documentElement.style.setProperty(
        '--el-menu-hover-bg-color',
        `color-mix(in srgb, ${color} 90%, white)`
      )
      document.documentElement.style.setProperty('--el-menu-active-color', color)

      //  可选：同步更新布局背景色
      if (updateBackground) {
        // 主页面背景色（更浅）
        document.documentElement.style.setProperty(
          '--color-bg-body',
          `color-mix(in srgb, ${color} 95%, white)`
        )
        // 容器背景色（更深）
        document.documentElement.style.setProperty(
          '--color-bg-container',
          `color-mix(in srgb, ${color} 98%, white)`
        )
      }

      localStorage.setItem('theme-color', color)
    },
    /** ✅ 新增：单独设置头部和侧边栏渐变色 */
    setLayoutGradientColor(color: string) {
      this.headerGradient = color
      this.asideGradient = color
      document.documentElement.style.setProperty('--color-header-gradient', color)
      document.documentElement.style.setProperty('--color-aside-gradient', color)
    },
    /**
     * 设置语义色（success/warning/danger/info）
     */
    setSuccessColor(color: string) {
      document.documentElement.style.setProperty('--color-success', color)
      document.documentElement.style.setProperty('--el-color-success', color)
    },
    setWarningColor(color: string) {
      document.documentElement.style.setProperty('--color-warning', color)
      document.documentElement.style.setProperty('--el-color-warning', color)
    },
    setDangerColor(color: string) {
      document.documentElement.style.setProperty('--color-danger', color)
      document.documentElement.style.setProperty('--el-color-danger', color)
    },
    setInfoColor(color: string) {
      document.documentElement.style.setProperty('--color-info', color)
      document.documentElement.style.setProperty('--el-color-info', color)
    },
    /**
     * 初始化主题
     *
     */
    initTheme() {
      const savedMode = (localStorage.getItem('theme-mode') as ThemeMode) || this.mode
      const savedColor = localStorage.getItem('theme-color') || this.primaryColor

      this.setMode(savedMode)
      this.setPrimaryColor(savedColor) // 保证选色器生效
      // 初始化时保持渐变色与主色一致
      this.setLayoutGradientColor(savedColor)
    }
  }
})
