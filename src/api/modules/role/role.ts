//src/api/auth/auth.ts
import request from '@/utils/request.ts'
import type { SysRoleDTO, SysRoleVO } from '@/types/system/role.ts'
import type { PageQuery, PageResponse } from '@/types/common.ts'

// 分页查询角色列表
export const getRolePageListApi = (params: PageQuery) => {
  return request.get<PageResponse<SysRoleVO>>('/role/pageRoleList', { params })
}
// 新增角色
export const addRoleApi = (data: SysRoleDTO) => {
  return request.post(`/role/addRole`, data)
}
// 更新角色
export const updateRoleApi = (data: SysRoleDTO) => {
  return request.put(`/role/updateRole`, data)
}

// 删除角色
export const deleteRoleApi = (id: number) => {
  return request.delete(`/role/deleteRole/${id}`)
}

// 获取所有角色
export const getRoleListApi = () => {
  return request.get<SysRoleVO>(`/role/getRoleList`)
}

// 根据用户ID查询角色列表
export const getRolesByUserIdApi = (userId: number) => {
  return request.get<SysRoleVO>(`/role/getRolesByUserId/${userId}`)
}
