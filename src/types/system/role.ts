// src/types/role.ts

/** 角色 DTO —— 前端提交时使用 */
export interface SysRoleDTO {
  /** 角色ID，更新时必填，新增时可为空 */
  id?: number

  /** 角色名称 */
  roleName: string

  /** 角色编码（唯一标识） */
  roleCode: string

  /** 角色描述 */
  roleDescription?: string

  /** 是否启用: 1-启用 0-禁用 */
  roleStatus: number

  // /** 创建时间 */
  // createTime: string
  //
  // /** 更新时间 */
  // updateTime: string
}

/** 角色 VO —— 后端返回前端展示用 */
export interface SysRoleVO {
  /** 角色ID */
  id: number

  /** 角色名称 */
  roleName: string

  /** 角色编码 */
  roleCode: string

  /** 角色描述 */
  roleDescription?: string

  /** 是否启用: 1-启用 0-禁用 */
  roleStatus: number

  /** 创建时间 */
  createTime: string // 建议后端返回 ISO 字符串，前端用 dayjs 格式化

  /** 更新时间 */
  updateTime: string

  /** 关联的菜单列表 */
  menuIds: number[]

  /** 关联的权限标识列表 */
  permissions: string[]
}
