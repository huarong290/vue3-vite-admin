//src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入 Element Plus 主体
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//  导入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入全局样式
import '@/styles/index.scss'
const app = createApp(App)
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

// 遍历并注册所有图标
// 这样 Vue 才能把字符串 "User" 或 "user" 解析为对应的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
