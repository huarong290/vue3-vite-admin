<template>
  <el-card>
    <h2>用户管理</h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="用户名">
        <el-input v-model="queryForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户表格 -->
    <el-table :data="users" v-loading="loading" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="deptId" label="部门ID" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getUserPageList } from '@/api/modules/user/user.ts'
import type { SysUserVO } from '@/types/system/user.ts'
import type { PageQuery } from '@/types/common.ts'

// 用户数据
const users = ref<SysUserVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)
// 查询条件
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  username: '',
  email: '',
  phone: ''
})

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  const res = await getUserPageList({
    page: page.value,
    size: pageSize.value,
    username: queryForm.username,
    email: queryForm.email,
    phone: queryForm.phone
  })
  console.log(res)
  users.value = res.records
  total.value = res.total
  loading.value = false
}

// 查询
const search = () => {
  page.value = 1 // 查询时重置到第一页
  fetchUsers()
}

// 重置
const reset = () => {
  queryForm.username = ''
  queryForm.email = ''
  queryForm.phone = ''
  page.value = 1
  fetchUsers()
}

// 分页事件
const handlePageChange = (p: number) => {
  page.value = p
  fetchUsers()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchUsers()
}

// 页面加载时获取数据
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
