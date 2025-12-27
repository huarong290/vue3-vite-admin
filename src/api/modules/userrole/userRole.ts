//src/api/modules/user/user.ts
import request from '@/utils/request.ts'
// 提交绑定角色

export const assignRolesApi = (userId: number, roleIds: number[]) => {
  return request.post(`userRole/bindUserRoles/${userId}`, roleIds)
}
