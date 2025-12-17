<!-- src/components/dialog/FormDialog.vue -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    destroy-on-close
    draggable
    :fullscreen="isFullscreen"
    :show-close="false"
    class="form-dialog"
  >
    <!-- 自定义标题栏 -->
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <div class="dialog-actions">
          <!-- 全屏按钮 -->
          <el-icon class="icon-btn" @click="toggleFullscreen">
            <component :is="isFullscreen ? CopyDocument : FullScreen" />
          </el-icon>
          <!-- 自定义关闭按钮 -->
          <el-icon class="icon-btn" @click="closeDialog">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>

    <!-- 表单内容 -->
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
      :disabled="loading || disabled"
      @submit.prevent="handleSubmit"
    >
      <!-- 插槽：页面传入具体表单项 -->
      <slot name="form-fields" :form="form"></slot>
    </el-form>

    <!-- 底部按钮 -->
    <template #footer>
      <el-button @click="closeDialog" :disabled="loading">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="disabled">
        {{ submitText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { FullScreen, Close, CopyDocument } from '@element-plus/icons-vue'

interface Props<T> {
  modelValue: boolean
  title: string
  form: T
  rules?: FormRules
  width?: string
  labelWidth?: string
  submitText?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props<T>>(), {
  width: '600px',
  labelWidth: '100px',
  submitText: '提交',
  loading: false,
  disabled: false,
  rules: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', form: T): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()
const isFullscreen = ref(false)

/** 对话框显示状态，支持 v-model */
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
    if (!val) {
      emit('close')
    } else {
      nextTick(() => {
        const firstInput = formRef.value?.$el?.querySelector('input, select, textarea')
        if (firstInput) {
          ;(firstInput as HTMLElement).focus()
        }
      })
      emit('open')
    }
  }
})

/** 切换全屏 */
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

/** 关闭对话框 */
const closeDialog = () => {
  dialogVisible.value = false
  emit('cancel')
}

/** 提交表单 */
const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    const valid = await formRef.value.validate()
    if (!valid) return
    // 只触发一次 submit 事件
    emit('submit', props.form)
  } catch (error) {
    console.warn('表单提交失败:', error)
  }
}
</script>

<style scoped>
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.dialog-title {
  font-weight: bold;
  font-size: 16px;
}
.dialog-actions {
  display: flex;
  gap: 8px;
}
.icon-btn {
  cursor: pointer;
  font-size: 18px;
  transition: color 0.2s;
}
.icon-btn:hover {
  color: var(--el-color-primary);
}
.form-dialog {
  max-width: 90vw;
}
</style>
