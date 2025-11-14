// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import systemRoutes from './modules/system'
import { House, InfoFilled } from '@element-plus/icons-vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'HomePage', component: HomePage, meta: { title: '首页', icon: House } },
      {
        path: 'about',
        name: 'AboutPage',
        component: AboutPage,
        meta: { title: '关于', icon: InfoFilled }
      },
      systemRoutes // 系统管理模块
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
