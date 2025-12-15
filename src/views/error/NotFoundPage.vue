<template>
  <div class="not-found">
    <el-empty description="页面未找到">
      <template #default>
        <el-button type="primary" @click="$router.push('/')"> 返回首页 </el-button>
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
// 这里不需要额外逻辑，Element Plus 的 Empty 组件即可
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
