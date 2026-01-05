import request from '@/utils/request.ts'
import type { SysRoleMenuVO, SysRoleMenuDTO } from '@/types/system/rolemenu.ts'
import type { BindResultDTO } from '@/types/common.ts'

/**
 * 根据角色ID查询菜单关联关系
 * GET /api/roleMenu/getMenusByRoleId/{roleId}
 */
export const getMenusByRoleIdApi = (roleId: number) => {
  return request.get<SysRoleMenuVO[]>(`/roleMenu/getMenusByRoleId/${roleId}`)
}

/**
 * 增量绑定角色菜单
 * POST /api/roleMenu/bindRoleMenus/{roleId}
 */
export const bindRoleMenusApi = (roleId: number, menuIds: number[]) => {
  return request.post<BindResultDTO>(`/roleMenu/bindRoleMenus/${roleId}`, menuIds)
}

/**
 * 新增单条角色菜单关联
 * POST /api/roleMenu/addRoleMenu
 */
export const addRoleMenuApi = (data: SysRoleMenuDTO) => {
  return request.post<number>(`/roleMenu/addRoleMenu`, data)
}

/**
 * 删除角色菜单关联
 * DELETE /api/roleMenu/deleteRoleMenu/{id}
 */
export const deleteRoleMenuApi = (id: number) => {
  return request.delete<number>(`/roleMenu/deleteRoleMenu/${id}`)
}

/**
 * 查询所有角色菜单关联
 * GET /api/roleMenu/list
 */
export const getRoleMenuListApi = () => {
  return request.get<SysRoleMenuVO[]>(`/roleMenu/list`)
}
