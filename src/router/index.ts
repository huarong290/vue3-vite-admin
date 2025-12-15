// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import demoRoutes from './modules/demo'
import { useUserStore } from '@/stores/modules/user/user'
import { getUserInfoApi } from '@/api/auth/auth'
import { ElMessage } from 'element-plus'
import { useMenuStore } from '@/stores/modules/menu/menu'
import { transformMenusToRoutes } from '@/utils/menuTransform'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: {
      hidden: true //  标记为隐藏，不显示在标签导航栏
    }
  },
  {
    path: '/',
    name: 'RootLayout',
    component: AppLayout, //  唯一绑定 AppLayout
    redirect: '/demo/home',
    children: [
      demoRoutes //  静态菜单只挂在 RootLayout 下
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const hasToken = !!userStore.accessToken

  if (!hasToken && to.path !== '/login') {
    next('/login')
  } else if (hasToken && to.path === '/login') {
    next('/')
  } else {
    if (hasToken) {
      try {
        if (!userStore.userInfo) {
          const userInfo = await getUserInfoApi()
          userStore.setUserInfo(userInfo)
        }

        // 🔧 调整：menuStore 只存动态菜单，不再拼接 demoRoutes
        if (menuStore.menus.length === 0 && userStore.userInfo) {
          const dynamicRoutes = transformMenusToRoutes(userStore.userInfo.menus)
          menuStore.setMenus(dynamicRoutes)

          dynamicRoutes.forEach((route) => {
            router.addRoute('RootLayout', route)
          })
        }
      } catch (e: unknown) {
        userStore.logout()
        const err = e as Error
        ElMessage.error(err.message)
        return next('/login')
      }
    }
    next()
  }
})

/* 调试代码：打印所有已注册的路由 */
router.isReady().then(() => {
  console.group('📌 Router Debug: 已注册的路由')
  router.getRoutes().forEach((r) => {
    console.log(`path: ${r.path}, name: ${String(r.name)}`)
    if (r.children?.length) {
      r.children.forEach((c) => {
        console.log(`  └─ child path: ${c.path}, name: ${String(c.name)}`)
      })
    }
  })
  console.groupEnd()
})

export default router
