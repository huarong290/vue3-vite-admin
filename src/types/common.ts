// src/types/common.ts

/** 通用分页响应结构 */
export interface PageResponse<T> {
  /** 当前页的数据列表 */
  records: T[]
  /** 数据总条数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页条数 */
  size: number
}

/** 通用接口响应结构 */
export interface ApiResponse<T = unknown> {
  /** 状态码（如 "0" 表示成功） */
  code: string
  /** 提示信息（如 "操作成功"） */
  message: string
  /** 实际返回的数据内容 */
  data: T
  /** 时间戳（可选） */
  timestamp?: number
}

export interface PageQuery {
  page: number
  size: number
  permissionCode?: string
  permissionName?: string
  roleName?: string
  roleCode?: string
  username?: string
  email?: string
  phone?: string
  deptCode?: string
  deptName?: string
  orgCode?: string
  orgName?: string

  // 允许额外字段（可选），但不要用 unknown
  [key: string]: string | number | boolean | undefined
}

/** * 通用绑定结果 DTO * 对应后端 BindResultDTO */
export interface BindResultDTO {
  /** 新增的数量 */
  addedCount: number
  /** 删除的数量 */
  removedCount: number
}
