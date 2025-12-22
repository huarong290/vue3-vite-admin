import request from '@/utils/request.ts'
import type { PageQuery, PageResponse } from '@/types/common.ts'
import type { SysDeptDTO, SysDeptTreeVO, SysDeptVO } from '@/types/system/dept.ts'

/**
 * 分页查询部门列表
 * @param params PageQuery 分页查询参数
 * @returns PageResponse<SysDeptVO> 分页结果
 */
export const getDeptPageListApi = (params: PageQuery) => {
  return request.get<PageResponse<SysDeptVO>>('/dept/pageDeptList', { params })
}

/**
 * 新增部门
 * @param data SysDeptDTO 部门对象
 * @returns 新增部门的主键 ID
 */
export const addDeptApi = (data: SysDeptDTO) => {
  return request.post<number>('/dept/addDept', data)
}

/**
 * 更新部门
 * @param data SysDeptDTO 部门对象
 * @returns 更新成功返回影响的记录数
 */
export const updateDeptApi = (data: SysDeptDTO) => {
  return request.put<number>('/dept/updateDept', data)
}

/**
 * 删除部门
 * @param id 部门ID
 * @returns 删除成功返回影响的记录数
 */
export const deleteDeptApi = (id: number) => {
  return request.delete<number>(`/dept/deleteDept/${id}`)
}

/**
 * 查询部门树结构
 * @returns SysDeptTreeVO[] 部门树形结构
 */
export const getDeptTreeApi = () => {
  return request.get<SysDeptTreeVO[]>('/dept/tree')
}
