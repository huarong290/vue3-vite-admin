/**
 * src/utils/clientInfoUtil.ts
 * ================================
 * 客户端信息构造工具
 * ================================
 *
 * 统一生成客户端环境信息，
 * 保证所有接口的 deviceId / OS / Browser 规则一致。
 */

import type { ClientInfo } from '@/types/auth'

/**
 * 获取或生成设备唯一标识
 * - 优先使用 localStorage 中已存在的 deviceId
 * - 不存在则生成新的 UUID
 */
export function getDeviceId(): string {
  const key = 'DEVICE_ID'
  let deviceId = localStorage.getItem(key)
  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem(key, deviceId)
  }
  return deviceId
}

/**
 * 获取客户端操作系统信息
 */
export function getOS(): string {
  const ua = navigator.userAgent
  if (/Windows/.test(ua)) return 'Windows'
  if (/Macintosh/.test(ua)) return 'macOS'
  if (/Android/.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  return 'Unknown'
}

/**
 * 获取浏览器信息
 */
export function getBrowser(): string {
  const ua = navigator.userAgent
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
  return 'Unknown'
}

/**
 * 构造完整的客户端环境信息
 */
export function buildClientInfo(): ClientInfo {
  return {
    deviceId: getDeviceId(),
    clientType: 'WEB',
    os: getOS(),
    browser: getBrowser(),
  }
}
