// src/types/user.ts
import type { Menu } from '@/types/system/menu.ts'

/**
 * 用户信息类
 * 用于存储当前登录用户的基本信息、角色、权限和菜单。
 */
export class UserInfo {
  /** 用户唯一标识 ID */
  userId!: number

  /** 用户登录名（系统唯一） */
  username!: string

  /** 用户昵称（展示用） */
  nickname!: string

  /** 用户头像 URL */
  avatar!: string

  /** 用户角色集合，例如 ["ADMIN", "USER"] */
  roles!: string[]

  /** 用户权限集合，例如 ["sys:user:add", "sys:user:delete"] */
  permissions!: string[]

  /** 用户菜单集合，用于动态路由生成 */
  menus!: Menu[]
}

/**
 * 用户查询参数类
 * 用于分页查询时传递的条件。
 */
export class SysUserQueryDTO {
  /** 用户名（模糊查询） */
  username!: string

  /** 邮箱（模糊查询） */
  email!: string

  /** 手机号（模糊查询） */
  phone!: string

  /** 部门 ID，用于按部门过滤 */
  deptId!: number

  /** 组织 ID，用于按组织过滤 */
  orgId!: number
}

/**
 * 用户 VO（View Object）
 * 用于后端返回给前端展示的用户数据。
 */
export class SysUserVO {
  /** 用户唯一标识 ID */
  id!: number

  /** 用户登录名 */
  username!: string

  /** 用户昵称 */
  nickname!: string

  /** 用户邮箱 */
  email!: string

  /** 用户手机号 */
  phone!: string

  /** 用户头像 URL，可为空 */
  avatar?: string | null

  /** 部门 ID */
  deptId!: number

  /** 组织 ID */
  orgId!: number

  /** 用户状态：1 表示启用，0 表示禁用 */
  status!: number

  /** 最近一次登录时间，可为空 */
  lastLoginTime?: string | null

  /** 创建时间（ISO 格式字符串） */
  createTime?: string

  /** 更新时间（ISO 格式字符串） */
  updateTime?: string
}

/**
 * 用户 DTO（Data Transfer Object）
 * 用于新增或更新用户时传递的参数。
 */
export class SysUserDTO {
  /** 用户唯一标识 ID（更新时必填，新增时可忽略） */
  id?: number

  /** 用户登录名 */
  username?: string

  /** 用户昵称 */
  nickname?: string

  /** 用户密码（新增或修改时必填，更新时可选） */
  password?: string

  /** 用户邮箱 */
  email?: string

  /** 用户手机号 */
  phone?: string

  /** 用户头像 URL，可为空 */
  avatar?: string | null

  /** 部门 ID */
  deptId?: number

  /** 组织 ID */
  orgId?: number

  /** 用户状态：1 表示启用，0 表示禁用 */
  status?: number
}
