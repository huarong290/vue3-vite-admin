// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import demoRoutes from './modules/demo' // ✅ 引入 demo 模块
import systemRoutes from './modules/system'
import { useUserStore } from '@/stores/modules/user/user.ts'
import { getUserInfoApi } from '@/api/auth/auth.ts'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue') // 登录页面
  },
  {
    path: '/',
    component: AppLayout,
    redirect: '/demo/home', // ✅ 默认跳转到首页演示
    children: [
      { ...demoRoutes }, // ✅ 演示模块
      { ...systemRoutes } // 系统管理模块
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由守卫：没有 token 时只能访问 /login
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  const hasToken = !!userStore.accessToken

  if (!hasToken && to.path !== '/login') {
    // 没有 token，跳转登录
    next('/login')
  } else if (hasToken && to.path === '/login') {
    // 已登录访问登录页时跳首页
    next('/')
  } else {
    // 有 token，但可能没有用户信息，尝试获取
    if (hasToken && !userStore.userInfo) {
      try {
        const userInfo = await getUserInfoApi()
        userStore.setUserInfo(userInfo)
      } catch (e: unknown) {
        // token 失效，清理并跳转登录
        userStore.logout()
        const err = e as Error
        ElMessage.error(err.message)
        return next('/login')
      }
    }
    next()
  }
})
export default router
