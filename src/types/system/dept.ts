// src/types/system/dept.ts

/**
 * 部门查询参数类
 * 用于分页查询时传递的条件。
 */
export class SysDeptQueryDTO {
    /** 部门名称（模糊查询） */
    deptName!: string

    /** 部门编码（模糊查询） */
    deptCode!: string

    /** 状态：1 表示启用，0 表示禁用 */
    status!: number
}

/**
 * 部门 VO（View Object）
 * 用于后端返回给前端展示的部门数据。
 */
export class SysDeptVO {
    /** 部门唯一标识 ID */
    id!: number

    /** 部门名称 */
    deptName!: string

    /** 部门编码 */
    deptCode!: string

    /** 上级部门 ID */
    parentId!: number

    /** 上级部门名称 */
    parentName?: string

    /** 排序号 */
    orderNum!: number

    /** 部门负责人 */
    leader?: string

    /** 联系电话 */
    phone?: string

    /** 邮箱 */
    email?: string

    /** 状态：1 表示启用，0 表示禁用 */
    status!: number

    /** 创建时间（ISO 格式字符串） */
    createTime?: string

    /** 更新时间（ISO 格式字符串） */
    updateTime?: string
}

/**
 * 部门 DTO（Data Transfer Object）
 * 用于新增或更新部门时传递的参数。
 */
export class SysDeptDTO {
    /** 部门唯一标识 ID（更新时必填，新增时可忽略） */
    id?: number

    /** 部门名称 */
    deptName?: string

    /** 部门编码 */
    deptCode?: string

    /** 上级部门 ID */
    parentId?: number

    /** 排序号 */
    orderNum?: number

    /** 部门负责人 */
    leader?: string

    /** 联系电话 */
    phone?: string

    /** 邮箱 */
    email?: string

    /** 状态：1 表示启用，0 表示禁用 */
    status?: number
}
