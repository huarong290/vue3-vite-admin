// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// [新增] 引入自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //  自动导入 API (如 ref, computed, watch, useRouter, useRoute 等)
    AutoImport({
      // 自动导入 Vue, Vue Router, Pinia 的相关函数
      imports: ['vue', 'vue-router', 'pinia'],

      // 解析 Element Plus 的 API (虽然 Element Plus 主要用组件，但有时也会用到 ElMessage 等 API)
      resolvers: [ElementPlusResolver()],

      // 生成类型声明文件的路径，建议放在 src/types 下
      dts: 'src/types/auto-imports.d.ts',

      // 解决 eslint 报错 (可选)
      eslintrc: {
        enabled: true
      }
    }),

    // [新增] 自动导入组件 (如 ElButton, ElMenu, ElIcon 等)
    Components({
      // 解析器配置
      resolvers: [
        // 自动按需引入 Element Plus 组件，并自动引入对应的样式
        ElementPlusResolver()
      ],

      // 生成组件类型声明文件的路径
      dts: 'src/types/components.d.ts'
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:18080/',
        changeOrigin: true,
        // [保持] 你原本的重写逻辑
        rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
  }
})
