// src/api/modules/userrole/userrole.ts

import request from '@/utils/request.ts'
import type { SysUserRoleVO, SysUserRoleDTO } from '@/types/system/userrole.ts'
import type { BindResultDTO } from '@/types/common.ts'

/**
 * 根据用户ID查询角色关联关系
 * GET /api/userRole/{userId}/roles
 */
export const getRolesByUserIdApi = (userId: number) => {
  return request.get<SysUserRoleVO[]>(`/userRole/getRolesByUserId/${userId}`)
}

/**
 * 绑定用户角色（增量绑定）
 * POST /api/userRole/{userId}/roles
 * @param userId 用户ID
 * @param roleIds 角色ID集合
 */
export const bindUserRolesApi = (userId: number, roleIds: number[]) => {
  return request.post<BindResultDTO>(`//bindUserRoles/${userId}`, roleIds)
}

/**
 * 新增单条用户角色关联
 * POST /api/userRole
 */
export const addUserRoleApi = (data: SysUserRoleDTO) => {
  return request.post<number>(`/userRole/addUserRole`, data)
}

/**
 * 删除用户角色关联
 * DELETE /api/userRole/{id}
 */
export const deleteUserRoleApi = (id: number) => {
  return request.delete<number>(`/userRole/deleteUserRole/${id}`)
}
