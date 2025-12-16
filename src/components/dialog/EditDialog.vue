<template>
  <el-dialog
      v-model="internalVisible"
      :title="title"
      width="600px"
      destroy-on-close
      draggable
      :fullscreen="isFullscreen"
      :show-close="false"
  class="dialog-lg"
  >
  <!-- 自定义标题栏 -->
  <template #header>
    <div class="dialog-header">
      <span class="dialog-title">{{ title }}</span>
      <div class="dialog-actions">
        <!-- 全屏按钮 -->
        <el-icon class="icon-btn" @click="toggleFullscreen">
          <component :is="isFullscreen ? FullScreenExit : FullScreen" />
        </el-icon>
        <!-- 自定义关闭按钮 -->
        <el-icon class="icon-btn" @click="updateVisible(false)">
          <Close />
        </el-icon>
      </div>
    </div>
  </template>

  <!-- 表单内容插槽 -->
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <slot name="form-fields" :form="form"></slot>
  </el-form>

  <!-- 底部按钮 -->
  <template #footer>
    <el-button @click="updateVisible(false)">取消</el-button>
    <el-button type="primary" @click="handleSubmit">保存</el-button>
  </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { FullScreen, Close, CopyDocument } from '@element-plus/icons-vue'

/** 用 CopyDocument 作为退出全屏图标 */
const FullScreenExit = CopyDocument

const props = defineProps<{
  modelValue: boolean
  title: string
  form: Record<string, unknown>
  rules?: Record<string, unknown>
  onSubmit: (form: Record<string, unknown>) => void | Promise<void>
}>()

const emit = defineEmits(['update:modelValue'])

const formRef = ref<FormInstance>()
const isFullscreen = ref(false)

/** 内部计算属性，绑定到 el-dialog 的 v-model */
const internalVisible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

/** 切换全屏状态 */
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

/** 更新弹窗显示状态 */
const updateVisible = (val: boolean) => {
  emit('update:modelValue', val)
}

/** 提交表单 */
const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    await props.onSubmit(props.form)
    updateVisible(false)
  })
}
</script>
