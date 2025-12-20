<!--src/components/icon/IconPicker.vue-->

<template>
  <el-select
    v-model="selectedIcon"
    @change="handleChange"
    filterable
    placeholder="请选择图标"
    style="width: 240px"
  >
    <el-option v-for="icon in iconList" :key="icon" :label="icon" :value="icon">
      <MenuIcon :icon="icon" :size="18" style="margin-right: 8px" />
      {{ icon }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MenuIcon from './MenuIcon.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedIcon = ref(props.modelValue)

// 获取所有图标名称
const iconList = Object.keys(ElementPlusIconsVue)

function handleChange(val: string) {
  emit('update:modelValue', val)
}
</script>
<style scoped lang="scss"></style>
