// src/router/modules/demo.ts
import ThemeDemo from '@/views/demo/ThemeDemo.vue'
import HomeDemo from '@/views/demo/HomeDemo.vue'
import AboutDemo from '@/views/demo/AboutDemo.vue'
import { House, InfoFilled, Brush } from '@element-plus/icons-vue'

export default {
  path: '/demo',
  name: 'DemoModule',
  meta: { title: '演示模块', icon: Brush }, // 父级菜单
  children: [
    {
      path: 'home',
      name: 'HomeDemo',
      component: HomeDemo,
      meta: { title: '首页演示', icon: House }
    },
    {
      path: 'about',
      name: 'AboutDemo',
      component: AboutDemo,
      meta: { title: '关于演示', icon: InfoFilled }
    },
    {
      path: 'theme-demo',
      name: 'ThemeDemo',
      component: ThemeDemo,
      meta: { title: '主题演示', icon: Brush }
    }
  ]
}
