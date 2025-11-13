<!--src/components/layout/AppSidebar.vue-->
<template>
  <el-menu
      router
      :default-active="$route.path"
      class="sidebar-menu"
      background-color="var(--color-bg-container)"
      text-color="var(--color-text-primary)"
      active-text-color="var(--color-primary)"
  >
    <el-menu-item index="/">
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <span>关于</span>
    </el-menu-item>
  </el-menu>
</template>



<script setup lang="ts">

</script>



<style scoped lang="scss">
.sidebar-menu {
  border: none;
  height: 100%;

  :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    margin: 0;

    &.is-active {
      background-color: var(--color-hover);
    }

    &:hover {
      background-color: var(--color-hover);
    }
  }
}
</style>