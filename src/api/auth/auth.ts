//src/api/auth/auth.ts

import request from '@/utils/request.ts'
import type { CaptchaResponse, LoginForm, LoginResponse } from '@/types/auth.ts'

/**
 * 获取验证码接口
 * @returns 验证码图片及标识信息
 */
export const getCaptchaApi = (): Promise<CaptchaResponse> => {
  return request.get<CaptchaResponse>('/auth/getCaptcha')
}

/**
 * 用户登录接口
 * @param data 登录表单数据
 * @returns 登录响应数据（包含 token）
 */
export const loginApi = (data: LoginForm): Promise<LoginResponse> => {
  return request.post<LoginResponse>('/auth/login', data)
}
