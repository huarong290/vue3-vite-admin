//src/types/system/permission.ts
/**
 * 权限 VO（View Object）
 * 用于前端展示权限信息
 */
export interface SysPermissionVO {
  /** 主键ID */
  id: number

  /** 权限编码 */
  permissionCode: string

  /** 权限名称 */
  permissionName: string

  /** 权限类型：1=接口权限，2=数据权限 */
  permissionType: number

  /** 权限状态：1=启用，0=禁用 */
  permissionStatus: number

  /** 创建时间 */
  createTime?: string

  /** 修改时间 */
  updateTime?: string
}

/**
 * 权限 DTO（Data Transfer Object）
 * 用于新增和更新权限时传递数据
 */
export interface SysPermissionDTO {
  /** 主键ID，新增时可为空，更新时必填 */
  id?: number

  /** 权限编码（唯一约束） */
  permissionCode: string

  /** 权限名称 */
  permissionName: string

  /** 权限类型：1=接口权限，2=数据权限 */
  permissionType: number

  /** 权限状态：1=启用，0=禁用 */
  permissionStatus: number

  /** 是否删除标记：0=未删除，1=已删除 */
  deleteFlag?: number
}
