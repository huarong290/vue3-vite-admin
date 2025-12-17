// import type { RouteRecordRaw } from 'vue-router'
// import type { Menu } from '@/types/system/menu.ts'
//
// // 扫描 views 下所有 vue 文件
// const modules = import.meta.glob('@/views/**/*.vue')
//
// export function transformMenusToRoutes(menus: Menu[]): RouteRecordRaw[] {
//     return menus.map((menu) => {
//         const fullPath = menu.menuPath
//
//         const route: RouteRecordRaw = {
//             path: fullPath,
//             name: menu.menuComponent || menu.menuName,
//             children: [],
//             meta: {
//                 title: menu.meta?.title || menu.menuName,
//                 icon: menu.meta?.icon?.toLowerCase(),
//                 keepAlive: menu.meta?.keepAlive,
//                 hidden: menu.meta?.hidden,
//                 affix: menu.meta?.affix
//             }
//         }
//
//         if (menu.menuComponent && menu.menuComponent !== 'Layout') {
//             const componentPath = `@/views${fullPath}/${menu.menuComponent}.vue`
//             route.component = modules[componentPath] ?? (() => import('@/views/error/NotFoundPage.vue'))
//         } else {
//             // Layout 特殊处理src/components/layout/AppLayout.vue
//             route.component = () => import('@/components/layout/AppLayout.vue')
//         }
//
//         if (menu.children?.length) {
//             route.children = transformMenusToRoutes(menu.children)
//         }
//
//         return route
//     })
// }
