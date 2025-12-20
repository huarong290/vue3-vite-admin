//src/types/system/org.ts

/**
 * 组织查询参数类
 * 用于分页查询时传递的条件。
 */
export class SysOrgQueryDTO {
    /** 组织名称（模糊查询） */
    orgName!: string

    /** 组织编码（模糊查询） */
    orgCode!: string

    /** 状态：1 表示启用，0 表示禁用 */
    status!: number
}

/**
 * 组织 VO（View Object）
 * 用于后端返回给前端展示的组织数据。
 */
export class SysOrgVO {
    /** 组织唯一标识 ID */
    id!: number

    /** 组织名称 */
    orgName!: string

    /** 组织编码 */
    orgCode!: string

    /** 上级组织 ID */
    parentId!: number

    /** 上级组织名称 */
    parentName?: string

    /** 排序号 */
    orderNum!: number

    /** 组织负责人 */
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
 * 组织 DTO（Data Transfer Object）
 * 用于新增或更新组织时传递的参数。
 */
export class SysOrgDTO {
    /** 组织唯一标识 ID（更新时必填，新增时可忽略） */
    id?: number

    /** 组织名称 */
    orgName?: string

    /** 组织编码 */
    orgCode?: string

    /** 上级组织 ID */
    parentId?: number

    /** 排序号 */
    orderNum?: number

    /** 组织负责人 */
    leader?: string

    /** 联系电话 */
    phone?: string

    /** 邮箱 */
    email?: string

    /** 状态：1 表示启用，0 表示禁用 */
    status?: number
}
