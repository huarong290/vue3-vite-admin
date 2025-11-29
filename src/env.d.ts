//src/env.d.ts
/// <reference types="vite/client" />

import 'pinia'

declare module 'pinia' {
  /**
   * 扩展 Pinia 的 DefineStoreOptionsBase，支持 persist 配置
   * 让 TS 能识别 pinia-plugin-persistedstate 提供的持久化选项
   */
  export interface DefineStoreOptionsBase {
    /**
     * 持久化配置
     */
    persist?:
      | boolean
      | {
          /**
           * 是否启用持久化
           */
          enabled?: boolean
          /**
           * 持久化策略数组
           * 可以指定 key、存储方式（localStorage / sessionStorage）、需要持久化的字段 paths
           */
          strategies?: Array<{
            key?: string
            storage?: Storage
            paths?: string[]
          }>
        }
  }
}
