<!--src/components/layout/AppHeader.vue-->
<template>
  <div class="header">
    <!--  按钮图标根据折叠状态切换 -->
    <el-button
        class="menu-toggle"
        :icon="isCollapse ? 'Expand' : 'Fold'"
        circle
        @click="$emit('toggle-menu')"
    />
    <div class="header-right">
      <span>欢迎使用系统</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>()
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
  color: #fff;

  .menu-toggle {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .menu-toggle {
      // 移动端显示菜单按钮
      display: inline-flex;
    }
  }
}
</style>

