// src/types/system/userrole.ts

/**
 * 用户角色关联 VO
 * 对应后端 SysUserRoleVO
 */
export interface SysUserRoleVO {
  /** 主键ID */
  id: number

  /** 用户ID */
  userId: number

  /** 用户名（冗余字段，便于前端展示） */
  username: string

  /** 角色ID */
  roleId: number

  /** 角色名称（冗余字段，便于前端展示） */
  roleName: string

  /** 删除标记：0=未删除，1=已删除 */
  deleteFlag: number

  /** 创建时间 */
  createTime: string

  /** 修改时间 */
  updateTime: string
}

/**
 * 用户角色关联 DTO
 * 用于前端提交分配角色时的数据结构
 */
export interface SysUserRoleDTO {
  /** 用户ID */
  userId: number

  /** 角色ID集合 */
  roleIds: number[]
}
