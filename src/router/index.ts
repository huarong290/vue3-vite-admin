// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import demoRoutes from './modules/demo' // ✅ 引入 demo 模块
import systemRoutes from './modules/system'

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
        { ...systemRoutes }// 系统管理模块
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由守卫：没有 token 时只能访问 /login
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token')

    if (!token && to.path !== '/login') {
        next('/login')
    } else if (token && to.path === '/login') {
        next('/') // 已登录访问登录页时跳首页
    } else {
        next()
    }
})
export default router
