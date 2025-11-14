//src/shims-role.d.ts

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 使用 object 和 unknown 替代 {} 和 any
  const component: DefineComponent<object, object, unknown>
  export default component
}

// 如果还是无法识别 @，可以尝试添加以下声明
// declare module '@/*' {
//     const value: unknown
//     export default value
// }
