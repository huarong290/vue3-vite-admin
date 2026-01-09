//src/api/menu/menu.ts
import request from '@/utils/request.ts'
import type { Menu, SysMenuDTO } from '@/types/system/menu.ts'

/**
 * 获取菜单树
 * @returns 菜单树数据
 */
export const getMenuTreeApi = (): Promise<Menu[]> => {
  return request.get<Menu[]>('/menu/getMenuTree')
}
/**
 * 新增菜单
 * @param data 菜单数据
 * @returns 操作结果
 */
export const addMenuApi = (data: SysMenuDTO) => {
  return request.post<number>('/menu/addMenu', data)
}

/**
 * 更新菜单
 * @param data 菜单数据
 * @returns 操作结果
 */
export const updateMenuApi = (data: SysMenuDTO) => {
  return request.put<number>(`/menu/updateMenu`, data)
}

/**
 * 删除菜单
 * @param id 菜单ID
 * @returns 操作结果
 */
export const deleteMenuApi = (id: number) => {
  return request.delete<number>(`/menu/deleteMenu/${id}`)
}
/**
 * 获取菜单列表（平铺表格）
 * @returns 菜单列表数据
 */
// export const getMenuListApi = (): Promise<Menu[]> => {
//   return request.get<Menu[]>('/system/menu/list')
// }

/**
 * 获取单个菜单详情
 * @param id 菜单ID
 * @returns 菜单详情
 */
// export const getMenuDetailApi = (id: number): Promise<Menu> => {
//   return request.get<Menu>(`/system/menu/${id}`)
// }

// 懒加载获取某个父节点的子菜单
export const getMenusByParentIdApi = (parentId: number) => {
  return request.get<Menu[]>(`/menu/getMenusByParentId/${parentId}`)
}
