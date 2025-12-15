/** 菜单元信息 */
export interface Meta {
  affix: boolean
  title: string
  icon?: string
  keepAlive?: boolean
  hidden?: boolean
  roles: string[]
  permissions: string[]
}

/** 菜单结构 */
export interface Menu {
  id: number
  menuName: string
  menuPath: string
  menuComponent: string
  menuParentId: number
  menuType: number
  menuPermission: string
  menuSort: number
  menuVisible: number
  menuStatus: number
  children: Menu[] // 递归子菜单
  meta: Meta
}
