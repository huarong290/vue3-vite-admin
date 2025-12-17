//src/api/modules/permission/permission.ts

import request from '@/utils/request.ts'
import type { PageQuery, PageResponse } from '@/types/common.ts'
import type { SysPermissionDTO, SysPermissionVO } from '@/types/system/permission.ts'
/**
 * 分页查询权限列表
 * @param params PageQuery 分页查询参数
 * @returns PageResponse<SysPermissionVO> 分页结果
 */
export const getPermissionPageListApi = (params: PageQuery) => {
  return request.get<PageResponse<SysPermissionVO>>('/permission/pagePermissionList', { params })
}

/**
 * 新增权限
 * @param data SysPermissionDTO 权限对象
 * @returns 新增权限的主键 ID
 */
export const addPermissionApi = (data: SysPermissionDTO) => {
  return request.post<number>('/permission/addPermission', data)
}

/**
 * 更新权限
 * @param data SysPermissionDTO 权限对象
 * @returns 更新成功返回影响的记录数
 */
export const updatePermissionApi = (data: SysPermissionDTO) => {
  return request.put<number>('/permission/updatePermission', data)
}

/**
 * 删除权限
 * @param id 权限ID
 * @returns 删除成功返回影响的记录数
 */
export const deletePermissionApi = (id: number) => {
  return request.delete<number>(`/permission/deletePermission/${id}`)
}
