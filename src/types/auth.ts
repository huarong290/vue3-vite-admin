// src/types/auth.ts

/** 登录表单参数 */
export interface LoginForm {
  username: string
  password: string
  captchaCode: string
  captchaId: string
  rememberMe: boolean
}
/** 用户状态接口，复用 TokenResponse 并扩展用户信息 */
import type { UserInfo } from '@/types/user'

export interface UserState extends LoginResponse {
  userInfo: UserInfo | null
}

/** 登录接口返回的 Token 数据 */
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}
/** 验证码接口返回的  数据 */
export interface CaptchaResponse {
  captchaId: string
  captchaImage: string
  expireTime: number
  captchaEnabled: boolean
}

/** 登录接口返回的 Token 数据 */
export interface TokenRefreshRequest {
  refreshToken: string
  tokenType: string
}
