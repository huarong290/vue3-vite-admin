//src/api/modules/user/user.ts
import request from '@/utils/request.ts'
import type { PageQuery, PageResponse } from '@/types/common.ts'
import { SysUserDTO, type SysUserVO } from '@/types/system/user.ts'

// 分页查询用户列表
export const getUserPageListApi = (params: PageQuery) => {
  return request.get<PageResponse<SysUserVO>>('/user/pageUserList', { params })
}

/**
 * 新增用户
 * @param data SysUserDTO 用户对象
 * @returns 新增用户的主键 ID
 */
export const addUserApi = (data: SysUserDTO) => {
  return request.post<number>('/user/addUser', data)
}
// // 新增用户
// export const createUser = (data: any) => {
//   return request.post('/user/create', data)
// }
//
// // 更新用户
// export const updateUser = (id: number, data: any) => {
//   return request.put(`/user/update/${id}`, data)
// }
//
// // 删除用户
// export const deleteUser = (id: number) => {
//   return request.delete(`/user/delete/${id}`)
// }
