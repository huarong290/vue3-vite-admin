//src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { sayHello } from '@/utils/hello'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from '@/stores'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入全局样式
import '@/styles/index.scss'

console.log(sayHello('World'))
const app = createApp(App)
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
