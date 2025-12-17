//src/composables/business/useFormDialog.ts
import { ref, reactive, computed, toRaw, type Ref, type WritableComputedRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

/**
 * 表单对话框配置选项
 * 泛型 T 表示表单数据的类型，例如 SysUserDTO 或 SysRoleDTO
 */
export interface UseFormDialogOptions<T extends Record<string, unknown>> {
  /** 默认表单数据 */
  defaultForm: T
  /** 表单验证规则 */
  rules?: FormRules
  /** 提交前的数据处理函数 */
  beforeSubmit?: (form: T) => T | Promise<T>
  /** 提交成功后的回调函数 */
  afterSubmit?: () => void | Promise<void>
  /** 成功消息 */
  successMessage?: string
  /** 错误消息（可选，默认使用错误对象中的消息） */
  errorMessage?: string
  /** 是否在提交后自动关闭对话框 */
  autoClose?: boolean
  /** 是否在提交后重置表单 */
  autoReset?: boolean
}

/**
 * 表单对话框返回对象
 */
export interface UseFormDialogReturn<T extends Record<string, unknown>> {
  /** 对话框显示状态（计算属性，可直接用于 v-model） */
  visible: WritableComputedRef<boolean>
  /** 加载状态 */
  loading: Ref<boolean>
  /** 表单数据（响应式对象） */
  form: T
  /** 表单引用 */
  formRef: Ref<FormInstance | undefined>
  /** 表单验证规则 */
  rules: FormRules
  /** 打开对话框 */
  open: (initialData?: Partial<T>) => void
  /** 关闭对话框 */
  close: () => void
  /** 重置表单 */
  reset: () => void
  /** 验证表单 */
  validate: () => Promise<T | null>
  /** 提交表单 */
  submit: (
    apiFunction: (data: T) => Promise<unknown>,
    customOptions?: {
      successMessage?: string
      errorMessage?: string
      onSuccess?: () => void
      onError?: (error: unknown) => void
    }
  ) => Promise<void>
}

/**
 * 表单对话框组合式函数
 * @param options 配置选项
 * @returns 表单对话框的相关状态和方法
 */
export function useFormDialog<T extends Record<string, unknown>>(
  options: UseFormDialogOptions<T>
): UseFormDialogReturn<T> {
  const {
    defaultForm,
    rules = {},
    beforeSubmit,
    afterSubmit,
    successMessage = '操作成功',
    errorMessage = '',
    autoClose = true,
    autoReset = true
  } = options

  // 内部状态
  const _visible = ref(false) // 内部控制对话框显示
  const loading = ref(false) // 提交加载状态
  const formRef = ref<FormInstance>() // 表单引用
  const form = reactive<T>({ ...defaultForm }) as T // 响应式表单数据

  // 计算属性，用于在模板中自动解包，支持 v-model
  const visible = computed<boolean>({
    get: () => _visible.value,
    set: (val: boolean) => {
      _visible.value = val
      if (!val) {
        // 对话框关闭时，如果是非成功关闭（如点击取消），重置表单
        if (!loading.value && autoReset) {
          reset()
        }
      }
    }
  }) as WritableComputedRef<boolean> // 强制标注为 WritableComputedRef<boolean>

  /**
   * 打开对话框
   * @param initialData 初始数据
   */
  const open = (initialData?: Partial<T>) => {
    reset()
    if (initialData) {
      Object.assign(form, initialData)
    }
    _visible.value = true
  }

  /** 关闭对话框 */
  const close = () => {
    _visible.value = false
    loading.value = false
  }

  /** 重置表单 */
  const reset = () => {
    Object.assign(form, defaultForm)
  }

  /** 验证表单 */
  const validate = async (): Promise<T | null> => {
    if (!formRef.value) {
      console.warn('表单引用不存在')
      return null
    }
    try {
      await formRef.value.validate()
      return toRaw(form) as T
    } catch (error) {
      console.warn('表单验证失败:', error)
      return null
    }
  }

  /** 提交表单 */
  const submit = async (
    apiFunction: (data: T) => Promise<unknown>,
    customOptions?: {
      successMessage?: string
      errorMessage?: string
      onSuccess?: () => void
      onError?: (error: unknown) => void
    }
  ): Promise<void> => {
    loading.value = true
    try {
      const validatedData = await validate()
      if (!validatedData) throw new Error('表单验证失败')

      let finalData = validatedData
      if (beforeSubmit) {
        finalData = await beforeSubmit(validatedData)
      }

      await apiFunction(finalData)

      const finalSuccessMessage = customOptions?.successMessage || successMessage
      ElMessage.success(finalSuccessMessage)

      if (autoClose) close()
      if (autoReset) reset()

      if (customOptions?.onSuccess) customOptions.onSuccess()
      if (afterSubmit) await afterSubmit()
    } catch (error: unknown) {
      console.error('表单提交失败:', error)
      const errorMsg = customOptions?.errorMessage || errorMessage ||(error instanceof Error ? error.message : '操作失败')
      ElMessage.error(errorMsg)
      if (customOptions?.onError) customOptions.onError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    visible,
    loading,
    form,
    formRef,
    rules,
    open,
    close,
    reset,
    validate,
    submit
  }
}

/**
 * 快速创建表单对话框的简化版本
 * @param defaultForm 默认表单数据
 * @returns 表单对话框的简化版本（不包含 rules）
 */
export function useSimpleFormDialog<T extends Record<string, unknown>>(
    defaultForm: T
): Omit<UseFormDialogReturn<T>, 'rules'> {
    const result = useFormDialog<T>({
        defaultForm,
        rules: {},
        successMessage: '操作成功'
    })
    // 用对象展开再返回，避免解构未使用变量
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rules: _rules, ...rest } = result
    return rest
}

