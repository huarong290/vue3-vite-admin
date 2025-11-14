//src/router/modules/system.ts
import type { RouteRecordRaw } from 'vue-router'
import UserList from '@/views/system/user/UserList.vue'
import UserDetail from '@/views/system/user/UserDetail.vue'
import RoleList from '@/views/system/role/RoleList.vue'
import RoleDetail from '@/views/system/role/RoleDetail.vue'
import MenuPage from '@/views/system/menu/MenuPage.vue'

const systemRoutes: RouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: () => import('@/components/layout/AppLayout.vue'),
  meta: { title: '系统管理' },
  children: [
    {
      path: 'user',
      name: 'User',
      meta: { title: '用户管理' },
      children: [
        { path: 'list', name: 'UserList', component: UserList, meta: { title: '用户列表' } },
        {
          path: 'detail',
          name: 'UserDetail',
          component: UserDetail,
          meta: { title: '用户详情', hiddenInMenu: true }
        }
      ]
    },
    {
      path: 'role',
      name: 'Role',
      meta: { title: '角色管理' },
      children: [
        { path: 'list', name: 'RoleList', component: RoleList, meta: { title: '角色列表' } },
        { path: 'detail', name: 'RoleDetail', component: RoleDetail, meta: { title: '角色详情' } }
      ]
    },
    {
      path: 'menu',
      name: 'MenuPage',
      component: MenuPage,
      meta: { title: '菜单管理' }
    }
  ]
}

export default systemRoutes
