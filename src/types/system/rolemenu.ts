/**
 * 角色菜单关联 VO
 * 用于前端展示角色与菜单的绑定关系
 */
export interface SysRoleMenuVO {
  /** 主键ID */
  id: number
  /** 角色ID */
  roleId: number
  /** 角色名称 */
  roleName?: string
  /** 菜单ID */
  menuId: number
  /** 菜单名称 */
  menuName?: string
  /** 删除标记：0=未删除，1=已删除 */
  deleteFlag: number
  /** 创建时间 */
  createTime: string
  /** 修改时间 */
  updateTime: string
}

/**
 * 角色菜单关联 DTO
 * 用于前端提交新增单条绑定关系
 */
export interface SysRoleMenuDTO {
  roleId: number
  menuId: number
}
