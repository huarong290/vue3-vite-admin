// src/utils/menuTransform.ts
import type { RouteRecordRaw } from 'vue-router'
import type { Menu } from '@/types/system/menu.ts'

// 1. 自动导入 views 下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

// 2. [修改] 删除未使用的 Layout 定义
// const Layout = () => import('@/components/layout/AppLayout.vue') // <--- 这一行删掉，因为下面只用 ParentView

// 3. 引入 ParentView 组件 (确保你已经创建了这个文件)
const AppParentView = () => import('@/components/layout/AppParentView.vue')

export function transformMenusToRoutes(menus: Menu[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    const fullPath = menu.menuPath

    const route: RouteRecordRaw = {
      path: fullPath,
      name: menu.menuComponent || menu.menuName,
      children: [],
      meta: {
        title: menu.meta?.title || menu.menuName,
        icon: menu.meta?.icon?.toLowerCase(),
        keepAlive: menu.meta?.keepAlive,
        hidden: menu.meta?.hidden,
        affix: menu.meta?.affix
      }
    }

    // 动态组件加载逻辑
    if (menu.menuComponent === 'Layout') {
      // 这里使用 AppParentView 替代 Layout，防止双重侧边栏
      route.component = AppParentView

      // 自动重定向到第一个子菜单
      if (menu.children && menu.children.length > 0) {
        route.redirect = menu.children[0]?.menuPath
      }
    } else {
      // 普通页面组件
      const viewPath = `/src/views${fullPath}/${menu.menuComponent}.vue`
      const componentFn = modules[viewPath]

      if (componentFn) {
        // componentFn 的类型是 () => Promise<{ default: DefineComponent }>
        // RouteRecordRaw.component 接受 Component 类型，所以做一次安全断言
        route.component = componentFn as unknown as Component
      } else {
        console.warn(`[路由加载失败] 无法找到组件文件: ${viewPath}`)
        route.component = () => import('@/views/error/NotFoundPage.vue')
      }
    }

    if (menu.children?.length) {
      route.children = transformMenusToRoutes(menu.children)
    }

    return route
  })
}
