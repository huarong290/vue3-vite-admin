//src/api/menu/menu.ts
import request from '@/utils/request.ts'
import type { Menu } from '@/types/system/menu.ts'

/**
 * 获取菜单树
 * @returns 菜单树数据
 */
export const getMenuTreeApi = (): Promise<Menu[]> => {
  return request.get<Menu[]>('/menu/getMenuTree')
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

/**
 * 新增菜单
 * @param data 菜单数据
 * @returns 操作结果
 */
export const addMenuApi = (data: Menu): Promise<void> => {
  return request.post<void>('/system/menu', data)
}

/**
 * 更新菜单
 * @param data 菜单数据
 * @returns 操作结果
 */
export const updateMenuApi = (data: Menu): Promise<void> => {
  return request.put<void>(`/system/menu/${data.id}`, data)
}

/**
 * 删除菜单
 * @param id 菜单ID
 * @returns 操作结果
 */
export const deleteMenuApi = (id: number): Promise<void> => {
  return request.delete<void>(`/system/menu/${id}`)
}
