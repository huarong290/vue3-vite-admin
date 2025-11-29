/** 菜单元信息 */
export interface Meta {
  title: string
  icon: string
  visible: boolean
  roles: string[]
  permissions: string[]
}

/** 菜单结构 */
export interface Menu {
  id: number
  path: string
  component: string
  parentId: number
  type: number
  permission: string
  children: Menu[] // 递归子菜单
  meta: Meta
}
