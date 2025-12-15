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
    <template #header>
      <div class="dialog-header">
        <span>{{ title }}</span>
        <div class="dialog-actions">
          <!-- 全屏按钮 -->
          <el-icon class="icon-btn" @click="toggleFullscreen">
            <component :is="isFullscreen ? CopyDocument : FullScreen" />
          </el-icon>
          <!-- 自定义关闭按钮 -->
          <el-icon class="icon-btn" @click="updateVisible(false)">
            <Close />
          </el-icon>
        </div>

      </div>
    </template>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <slot name="form-fields" :form="form"></slot>
    </el-form>

    <template #footer>
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import {FullScreen, Close, CopyDocument} from '@element-plus/icons-vue'

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

const internalVisible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const updateVisible = (val: boolean) => {
  emit('update:modelValue', val)
}

const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    await props.onSubmit(props.form)
    updateVisible(false)
  })
}
</script>
