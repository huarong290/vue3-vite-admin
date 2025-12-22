import request from '@/utils/request.ts'
import type { PageQuery, PageResponse } from '@/types/common.ts'
import type { SysOrgDTO, SysOrgTreeVO, SysOrgVO } from '@/types/system/org.ts'

/**
 * 分页查询组织列表
 * @param params PageQuery 分页查询参数
 * @returns PageResponse<SysOrgVO> 分页结果
 */
export const getOrgPageListApi = (params: PageQuery) => {
  return request.get<PageResponse<SysOrgVO>>('/org/pageOrgList', { params })
}

/**
 * 新增组织
 * @param data SysOrgDTO 组织对象
 * @returns 新增组织的主键 ID
 */
export const addOrgApi = (data: SysOrgDTO) => {
  return request.post<number>('/org/addOrg', data)
}

/**
 * 更新组织
 * @param data SysOrgDTO 组织对象
 * @returns 更新成功返回影响的记录数
 */
export const updateOrgApi = (data: SysOrgDTO) => {
  return request.put<number>('/org/updateOrg', data)
}

/**
 * 删除组织
 * @param id 组织ID
 * @returns 删除成功返回影响的记录数
 */
export const deleteOrgApi = (id: number) => {
  return request.delete<number>(`/org/deleteOrg/${id}`)
}
/**
 * 查询组织树结构
 * @returns SysOrgTreeVO[] 组织树形结构
 */
export const getOrgTreeApi = () => {
  return request.get<SysOrgTreeVO[]>('/org/tree')
}
