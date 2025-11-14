//src/router/modules/system.ts
import { RouterView, type RouteRecordRaw } from 'vue-router'
import UserList from '@/views/system/user/UserList.vue'
import UserDetail from '@/views/system/user/UserDetail.vue'
import RoleList from '@/views/system/role/RoleList.vue'
import RoleDetail from '@/views/system/role/RoleDetail.vue'
import MenuPage from '@/views/system/menu/MenuPage.vue'

import { User, Setting, Menu as MenuIcon, UserFilled, Avatar } from '@element-plus/icons-vue'
const systemRoutes: RouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: RouterView, // 中间层用 RouterView
  meta: { title: '系统管理', icon: Setting },
  children: [
    {
      path: 'user',
      name: 'User',
      component: RouterView,
      meta: { title: '用户管理', icon: User },
      children: [
        {
          path: 'list',
          name: 'UserList',
          component: UserList,
          meta: { title: '用户列表' }
        },
        {
          path: 'detail',
          name: 'UserDetail',
          component: UserDetail,
          meta: { title: '用户详情', hiddenInMenu: false }
        }
      ]
    },
    {
      path: 'role',
      name: 'Role',
      component: RouterView,
      meta: { title: '角色管理', icon: Avatar },
      children: [
        {
          path: 'list',
          name: 'RoleList',
          component: RoleList,
          meta: { title: '角色列表', icon: UserFilled }
        },
        {
          path: 'detail',
          name: 'RoleDetail',
          component: RoleDetail,
          meta: { title: '角色详情', hiddenInMenu: true }
        }
      ]
    },
    {
      path: 'menu',
      name: 'MenuPage',
      component: MenuPage,
      meta: { title: '菜单管理', icon: MenuIcon }
    }
  ]
}

export default systemRoutes
