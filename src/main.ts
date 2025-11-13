//src/main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { sayHello } from '@/utils/hello'

console.log(sayHello('World'))
createApp(App).mount('#app')
