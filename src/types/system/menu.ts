/**
 * 菜单 DTO 类型定义
 * 对应后端的 SysMenuDTO，用于前端表单和接口交互
 */
export interface SysMenuDTO {
  /** 菜单ID，更新时必填，新增时可为空 */
  id?: number

  /** 父菜单ID，顶级菜单为 0 */
  menuParentId: number

  /** 菜单名称，例如："用户管理" */
  menuName: string

  /** 路由路径，例如："/system/user" */
  menuPath?: string

  /** 前端组件路径，例如："system/user/index" */
  menuComponent?: string

  /** 菜单图标，例如："user" */
  menuIcon?: string

  /** 菜单类型: 0-目录 1-菜单 2-按钮 */
  menuType: number

  /** 权限标识，例如："sys:user:add" */
  menuPermission?: string

  /** 排序值，数值越小越靠前 */
  menuSort?: number

  /** 是否显示: 1-显示 0-隐藏 */
  menuVisible?: number

  /** 是否启用: 1-启用 0-禁用 */
  menuEnabled?: number
}

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
  menuIcon: string
  children?: Menu[] // 递归子菜单
  meta?: Meta
  createTime?: string //  可选
  updateTime?: string //  可选
}

// src/types/system/menu.ts
export type MenuForm = Omit<Menu, 'children' | 'meta' | 'createTime' | 'updateTime'>

// 菜单节点类型
export interface MenuNode {
  id: number
  menuName: string
  menuPath?: string
  menuComponent?: string
  menuParentId?: number
  menuType?: number
  menuPermission?: string
  menuSort?: number
  menuVisible?: number
  menuStatus?: number
  menuIcon: string
  children?: MenuNode[]

  // UI 层专用字段
  label?: string // 用于 el-tree-select 显示的文本
  value?: number // 用于 el-tree-select 绑定的值
  disabled?: boolean // 控制节点是否可选
}
