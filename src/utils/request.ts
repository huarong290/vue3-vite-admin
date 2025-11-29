// src/utils/request.ts
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user/user'
import type { ApiResponse } from '@/types/common'

/**
 * 扩展请求配置
 */
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  silent?: boolean
  isUpload?: boolean
  noToken?: boolean
}

/**
 * 创建 Axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: CustomRequestConfig) => {
    const userStore = useUserStore()

    // GET 请求加时间戳防缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = { ...config.params, _t: Date.now() }
    }

    // 对象式 store：直接访问 string，不需要 .value
    if (userStore.accessToken && !config.noToken) {
      config.headers?.set('Authorization', `${userStore.tokenType} ${userStore.accessToken}`)
    }

    // 上传文件时修改 Content-Type
    if (config.isUpload) {
      config.headers?.set('Content-Type', 'multipart/form-data')
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * 响应拦截器
 *  返回业务数据，调用时直接拿到结果
 */
service.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    const res = response.data
    if ([0, 200, '0', '200'].includes(res.code)) {
      return res.data as T
    }
    const config = response.config as CustomRequestConfig
    if (!config.silent) {
      ElMessage.error(res.message || '请求失败')
    }
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  (error) => {
    const config = error.config as CustomRequestConfig
    let message = '请求失败'
    if (error.response) {
      const status = error.response.status
      const responseData = error.response.data as ApiResponse
      message = responseData?.message || `请求错误：${status}`
    } else if (error.request) {
      message = '服务器无响应，请检查网络连接'
    } else {
      message = error.message || '未知错误'
    }
    if (!config?.silent) {
      ElMessage.error(message)
    }
    return Promise.reject(new Error(message))
  }
)

/**
 * 封装统一的请求方法
 *  泛型 <T> 保证调用时类型安全
 */
const request = {
  get<T>(url: string, config?: CustomRequestConfig): Promise<T> {
    return service.get<ApiResponse<T>>(url, config) as unknown as Promise<T>
  },
  post<T>(url: string, data?: unknown, config?: CustomRequestConfig): Promise<T> {
    return service.post<ApiResponse<T>>(url, data, config) as unknown as Promise<T>
  },
  put<T>(url: string, data?: unknown, config?: CustomRequestConfig): Promise<T> {
    return service.put<ApiResponse<T>>(url, data, config) as unknown as Promise<T>
  },
  delete<T>(url: string, config?: CustomRequestConfig): Promise<T> {
    return service.delete<ApiResponse<T>>(url, config) as unknown as Promise<T>
  }
}

export default request
