// src/types/user.ts
import type { Menu } from '@/types/system/menu.ts'

/** 用户信息结构 */
export interface UserInfo {
  userId: number
  username: string
  nickname: string
  avatar: string
  roles: string[]
  permissions: string[]
  menus: Menu[]
}

export interface SysUserQueryDTO {
  username: string
  email: string
  phone: string
  deptId: number
  orgId: number
}

// 用户 VO
export interface SysUserVO {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  avatar?: string | null
  deptId: number
  orgId: number
  status: number
  lastLoginTime?: string | null
  createTime?: string
  updateTime?: string
}
