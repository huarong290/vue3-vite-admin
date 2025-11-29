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
