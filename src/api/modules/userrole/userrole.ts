//src/api/modules/userrole/userrole.ts

import request from '@/utils/request.ts'
import type { SysUserRoleVO, SysUserRoleDTO } from '@/types/system/userrole.ts'
import type { BindResultDTO } from '@/types/common.ts'

/**
 * 根据用户ID查询角色关联关系
 */
export const getRolesByUserIdApi = (userId: number) => {
  return request.get<SysUserRoleVO[]>(`/userRole/getRolesByUserId/${userId}`)
}

/**
 * 绑定用户角色（增量绑定）
 * @param userId 用户ID
 * @param roleIds 角色ID集合
 */
export const bindUserRolesApi = (userId: number, roleIds: number[]) => {
  return request.post<BindResultDTO>(`/userRole/bindUserRoles/${userId}`, roleIds)
}

/**
 * 新增单条用户角色关联
 */
export const addUserRoleApi = (data: SysUserRoleDTO) => {
  return request.post<number>(`/userRole/addUserRole`, data)
}

/**
 * 删除用户角色关联
 */
export const deleteUserRoleApi = (id: number) => {
  return request.delete<number>(`/userRole/deleteUserRole/${id}`)
}
