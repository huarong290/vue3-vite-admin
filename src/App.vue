<!--src/App.vue-->
<template>
  <!--  使用 v-slot 解构出 Component -->
  <router-view v-slot="{ Component }">
    <!--  过渡动画 -->
    <transition name="fade" mode="out-in">
      <!--  缓存功能（可选），只缓存指定页面 -->
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 这里通常不需要逻辑，App.vue 只是根容器
</script>

<style lang="scss">
// 引入全局样式
@use '@/styles/index.scss' as *;
</style>
