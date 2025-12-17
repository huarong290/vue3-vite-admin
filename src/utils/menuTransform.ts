// src/utils/menuTransform.ts
import type { RouteRecordRaw } from 'vue-router'
import type { Menu } from '@/types/system/menu.ts'

// fallback 映射表：特殊情况时使用
const viewMap: Record<string, () => Promise<unknown>> = {
  UserPage: () => import('@/views/system/user/UserPage.vue'),
  RolePage: () => import('@/views/system/role/RolePage.vue'),
  MenuPage: () => import('@/views/system/menu/MenuPage.vue'),
  PermissionPage: () => import('@/views/system/permission/PermissionPage.vue')
}

export function transformMenusToRoutes(menus: Menu[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    // ✅ 调整：后端返回的 menuPath 必须是完整路径，前端不再拼接 parentPath
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

    if (menu.menuComponent !== 'Layout') {
      route.component =
        viewMap[menu.menuComponent] ??
        (() => import(`@/views${fullPath}/${menu.menuComponent}.vue`))
    }

    if (menu.children?.length) {
      route.children = transformMenusToRoutes(menu.children)
    }

    return route
  })
}
