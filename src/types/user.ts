// src/types/user.ts
import type { Menu } from '@/types/menu.ts'

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
