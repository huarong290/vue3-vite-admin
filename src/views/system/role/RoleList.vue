<!--src/views/system/role/RoleList.vue-->
<template>
  <el-card>
    <h2>角色列表</h2>
    <el-table :data="roles" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="desc" label="描述" />
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

const roles = [
  { id: 1, name: '管理员', desc: '系统最高权限' },
  { id: 2, name: '普通用户', desc: '基本访问权限' }
]

function goDetail(id: number) {
  router.push(`/system/role/${id}`)
}
</script>
