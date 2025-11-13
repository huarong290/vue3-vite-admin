import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            { path: '', name: 'HomePage', component: HomePage },
            { path: 'about', name: 'AboutPage', component: AboutPage }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
