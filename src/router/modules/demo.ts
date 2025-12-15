// src/router/modules/demo.ts
import ThemeDemo from '@/views/demo/ThemeDemo.vue'
import HomeDemo from '@/views/demo/HomeDemo.vue'
import AboutDemo from '@/views/demo/AboutDemo.vue'
import { House, InfoFilled, Brush } from '@element-plus/icons-vue'

export default {
  path: '/demo',
  name: 'DemoModule',
  meta: { title: '演示模块', icon: Brush },
  children: [
    {
      path: '/demo/home',
      name: 'HomeDemo',
      component: HomeDemo,
      meta: { title: '首页演示', icon: House, affix: true }
    },
    {
      path: '/demo/about',
      name: 'AboutDemo',
      component: AboutDemo,
      meta: { title: '关于演示', icon: InfoFilled }
    },
    {
      path: '/demo/theme-demo',
      name: 'ThemeDemo',
      component: ThemeDemo,
      meta: { title: '主题演示', icon: Brush }
    }
  ]
}
