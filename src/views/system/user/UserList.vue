<!--src/views/system/user/UserList.vue-->
<template>
  <el-card class="card">
    <h2>用户列表</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="goDetail(scope.row.id)"> 查看详情 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
]

function goDetail(id: number) {
  router.push(`/system/user/${id}`)
}
</script>
