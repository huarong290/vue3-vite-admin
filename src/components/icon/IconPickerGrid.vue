<template>
  <div>
    <!-- 触发按钮，显示当前选中的图标 -->
    <el-button type="primary" @click="dialogVisible = true">
      <MenuIcon v-if="selectedIcon" :icon="selectedIcon" :size="18" class="mr-1" />
      {{ selectedIcon || '选择图标' }}
    </el-button>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" title="选择图标" width="700px">
      <!-- 搜索框 -->
      <el-input v-model="searchKeyword" placeholder="搜索图标名称" clearable class="mb-3" />

      <!-- 图标网格 -->
      <div class="icon-grid">
        <div
          v-for="icon in filteredIcons"
          :key="icon"
          class="icon-item"
          :class="{ active: icon === selectedIcon }"
          @click="selectIcon(icon)"
        >
          <MenuIcon :icon="icon" :size="24" />
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MenuIcon from './MenuIcon.vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const dialogVisible = ref(false)
const selectedIcon = ref(props.modelValue)
const searchKeyword = ref('')

// 获取所有图标名称
const iconList = Object.keys(ElementPlusIconsVue)

// 过滤后的图标列表
const filteredIcons = computed(() => {
  if (!searchKeyword.value) return iconList
  return iconList.filter((icon) => icon.toLowerCase().includes(searchKeyword.value.toLowerCase()))
})

// 监听外部传入的值，保证编辑时能显示原来的图标
watch(
  () => props.modelValue,
  (val) => {
    selectedIcon.value = val
  },
  { immediate: true }
)

function selectIcon(icon: string) {
  selectedIcon.value = icon
  emit('update:modelValue', icon)
  dialogVisible.value = false
}
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  border: 2px solid transparent;
}

.icon-item:hover {
  background-color: #f5f7fa;
}

.icon-item.active {
  border-color: #409eff; /* Element Plus 主色 */
  background-color: #ecf5ff;
}

.icon-name {
  margin-top: 4px;
  font-size: 12px;
  color: #606266;
  text-align: center;
}
</style>
