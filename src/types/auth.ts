/**
 * ================================
 * Auth 模块类型定义
 * ================================
 * 用于前端与后端接口交互时的参数和返回值约束。
 * 保证与后端 DTO (UserLoginReqDTO) 完全匹配。
 */

import type { UserInfo } from '@/types/system/user.ts'

/**
 * 登录表单参数
 * 对应后端 UserLoginReqDTO
 */
export interface LoginForm {
  /** 用户名 (必填) */
  username: string

  /** 密码 (必填) */
  password: string

  /** 验证码内容 (必填) */
  captchaCode: string

  /** 验证码唯一标识 (必填) */
  captchaId: string

  /** 是否记住我 (前端扩展字段，后端可选处理) */
  rememberMe?: boolean
}
/**
 * 客户端环境信息
 * 对应后端 ClientInfo / DeviceInfo
 */
export interface ClientInfo {
  /** 客户端设备唯一标识 (必填，前端生成并传递) */
  deviceId: string

  /**
   * 客户端类型 (必填，枚举值)
   * WEB: 浏览器端
   * APP: 移动应用
   * MINI: 小程序
   * H5: 移动 H5 页面
   * OTHER: 其他类型
   */
  clientType: 'WEB' | 'APP' | 'MINI' | 'H5' | 'OTHER'

  /** 客户端操作系统 (可选，如 Windows 11 / Android 14) */
  os?: string

  /** 浏览器信息 (可选，如 Chrome 121.0.0.0) */
  browser?: string
}
/**
 * 登录请求参数（最终传给后端）
 * = LoginForm + ClientInfo
 */
export interface LoginRequest extends LoginForm {
  clientInfo: ClientInfo
}
/**
 * 登录接口返回的 Token 数据
 * 对应后端 LoginResponse
 */
export interface LoginResponse {
  /** 访问令牌 (JWT 或其他格式) */
  accessToken: string

  /** 刷新令牌，用于获取新 Token */
  refreshToken: string

  /** Token 类型 (通常为 Bearer) */
  tokenType: string

  /** Token 有效期 (秒) */
  expiresIn: number
}

/**
 * 用户状态接口
 * 复用 TokenResponse 并扩展用户信息
 */
export interface UserState extends LoginResponse {
  /** 当前登录用户信息 (可为空) */
  userInfo: UserInfo | null
}

/**
 * 验证码接口返回的数据
 */
export interface CaptchaResponse {
  /** 验证码唯一标识 */
  captchaId: string

  /** 验证码图片 (Base64 或 URL) */
  captchaImage: string

  /** 验证码过期时间 (毫秒时间戳) */
  expireTime: number

  /** 是否启用验证码功能 */
  captchaEnabled: boolean
}

/**
 * Token 刷新请求参数
 */
export interface TokenRefreshRequest {
  /** 刷新令牌 */
  refreshToken: string

  /** Token 类型 (通常为 Bearer) */
  tokenType: string
}
