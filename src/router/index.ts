// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import demoRoutes from './modules/demo' // ✅ 引入 demo 模块
import systemRoutes from './modules/system'


const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
        demoRoutes,   // ✅ 演示模块
      systemRoutes // 系统管理模块
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
