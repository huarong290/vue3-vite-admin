// src/stores/modules/menu/menu.ts
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [] as RouteRecordRaw[]
  }),
  actions: {
    setMenus(dynamicMenus: RouteRecordRaw[]) {
      //  只存动态菜单，不再拼接 demoRoutes
      this.menus = [...dynamicMenus]
    },
    clearMenus() {
      this.menus = []
    }
  }
})
