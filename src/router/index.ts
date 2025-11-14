// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import systemRoutes from './modules/system'

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            { path: '', name: 'HomePage', component: HomePage, meta: { title: '首页' } },
            { path: 'about', name: 'AboutPage', component: AboutPage, meta: { title: '关于' } },
            systemRoutes // 系统管理模块
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

