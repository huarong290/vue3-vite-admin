/**
 * src/utils/loginBuilderUtil.ts
 * 构造登录请求参数
 * - 页面层只需传 LoginForm
 * - 客户端信息由工具函数自动补齐
 */
import type { LoginForm, LoginRequest } from '@/types/auth'
import { buildClientInfo } from '@/utils/clientInfoUtil.ts'

export function buildLoginRequest(form: LoginForm): LoginRequest {
  return {
    ...form,
    clientInfo: buildClientInfo(),
  }
}
