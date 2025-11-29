// // src/stores/modules/user/user.ts
// import { defineStore } from 'pinia'
// import type { TokenResponse } from '@/types/auth'
// import type { UserInfo } from '@/types/user'
//
// /**
//  * 用户状态管理（对象式写法）
//  * - state: 定义所有状态字段，都是普通类型（string/number/object）
//  * - actions: 定义修改状态的方法
//  * - persist: 配置持久化存储（需要 pinia-plugin-persistedstate）
//  */
// export const useUserStore = defineStore('user', {
//   /** -------------------- 状态定义 -------------------- */
//   state: () => ({
//     accessToken: '',          // 访问令牌（string，不是 ref）
//     refreshToken: '',         // 刷新令牌
//     tokenType: 'Bearer',      // 令牌类型
//     expiresIn: 0,             // 过期时间（秒）
//     userInfo: null as UserInfo | null // 用户信息对象
//   }),
//
//   /** -------------------- 方法（Actions） -------------------- */
//   actions: {
//     /**
//      * 保存登录返回的 Token 信息
//      * @param tokenRes 登录接口返回的 TokenResponse
//      */
//     setToken(tokenRes: TokenResponse) {
//       this.accessToken = tokenRes.accessToken
//       this.refreshToken = tokenRes.refreshToken
//       this.tokenType = tokenRes.tokenType
//       this.expiresIn = tokenRes.expiresIn
//     },
//
//     /** 清除 Token 信息 */
//     clearToken() {
//       this.accessToken = ''
//       this.refreshToken = ''
//       this.tokenType = 'Bearer'
//       this.expiresIn = 0
//     },
//
//     /** 保存用户信息 */
//     setUserInfo(info: UserInfo) {
//       this.userInfo = info
//     },
//
//     /** 清除用户信息 */
//     clearUserInfo() {
//       this.userInfo = null
//     },
//
//     /** 完整登出逻辑：清除 Token + 用户信息 */
//     logout() {
//       this.clearToken()
//       this.clearUserInfo()
//     }
//   },
//
//   /** -------------------- 持久化配置 -------------------- */
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'user',
//         storage: localStorage, // 或 sessionStorage
//         paths: ['accessToken', 'refreshToken', 'tokenType', 'expiresIn', 'userInfo']
//       }
//     ]
//   }
// })
