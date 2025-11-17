<template>
  <el-card class="card">
    <div class="card-header">
      <h2 class="card-title">用户详情</h2>
    </div>
    <div class="card-body">
    <p>ID: {{ $route.params.id }}</p>
    <p>这里可以展示用户的详细信息。</p>
    </div>
    <el-button type="primary" @click="$router.back()">返回列表</el-button>
  </el-card>
</template>

<script setup lang="ts">
</script>
