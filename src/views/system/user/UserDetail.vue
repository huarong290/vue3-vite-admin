<template>
  <el-card>
    <h2>用户详情</h2>
    <p>ID: {{ $route.params.id }}</p>
    <p>这里可以展示用户的详细信息。</p>
    <el-button type="primary" @click="$router.back()">返回列表</el-button>
  </el-card>
</template>

<script setup lang="ts"></script>
