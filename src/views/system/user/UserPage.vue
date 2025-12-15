<template>
  <el-card>
    <h2 class="page-title">
      用户管理
      <el-button type="primary" class="ml-2" @click="addDialogVisible = true">新增用户</el-button>
    </h2>
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
      <el-table-column prop="lastLoginTime" label="上次登录时间">
        <template #default="scope">
          <!-- 如果为空显示 '-'，否则格式化 -->
          {{
            scope.row.lastLoginTime
              ? dayjs(scope.row.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
              : '-'
          }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 可选：新增列：创建时间 -->
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>

      <!-- 可选：新增列：更新时间 -->
      <el-table-column prop="updateTime" label="更新时间">
        <template #default="scope">
          {{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>


      <!--  新增操作列 -->
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
    <!--  新增：新增用户弹窗 -->
    <!-- ✅ 调整部分：使用封装好的 AddDialog -->
    <AddDialog
      v-model="addDialogVisible"
      title="新增用户"
      :form="addForm"
      :rules="addRules"
      :onSubmit="submitAddUser"
    >
      <template #form-fields="{ form }">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input-number v-model="form.deptId" :min="1" :max="999999" controls-position="right" />
        </el-form-item>
        <el-form-item label="组织ID" prop="orgId">
          <el-input-number v-model="form.orgId" :min="1" :max="999999" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </AddDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { addUserApi, getUserPageListApi } from '@/api/modules/user/user.ts'
import { SysUserDTO, type SysUserVO } from '@/types/system/user.ts'
import type { PageQuery } from '@/types/common.ts'
import dayjs from 'dayjs'
import {ElMessage, ElMessageBox} from 'element-plus'
import AddDialog from '@/components/dialog/AddDialog.vue'

// 用户数据
const users = ref<SysUserVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

// 新增用户弹窗状态
const addDialogVisible = ref<boolean>(false)
// 查询条件
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  username: '',
  email: '',
  phone: ''
})
//新增用户表单模型
const addForm = reactive<SysUserDTO>({
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  status: 1
})
//  新增：表单校验规则（Element Plus）
const addRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度 3-20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 50, message: '长度至少 6 个字符', trigger: 'blur' }
  ],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  phone: [{ pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }]
}

/** 编辑用户 */
const handleEdit = (row: SysUserVO) => {
  // 打开编辑弹窗，并把当前行数据传进去
  console.log('编辑用户:', row)

}

/** 删除用户 */
const handleDelete = async (row: SysUserVO) => {
  try {
    await ElMessageBox.confirm(`确认删除用户 ${row.username} 吗？`, '提示', {
      type: 'warning'
    })
    // 调用删除接口
    // await deleteUserApi(row.id)
    ElMessage.success('删除成功')
    fetchUsers() // 刷新列表
  } catch {
    ElMessage.info('已取消删除')
  }
}
// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  const res = await getUserPageListApi({
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
//  新增：提交新增用户
const submitAddUser = async (form: SysUserDTO): Promise<void> => {
  try {
    await addUserApi(form)
    ElMessage.success('新增用户成功')
    addDialogVisible.value = false
    Object.assign(addForm, {
      username: '',
      password: '',
      nickname: '',
      email: '',
      phone: '',
      deptId: undefined,
      orgId: undefined,
      status: 1
    })
    fetchUsers()
  } catch (e: unknown) {
    const err = e as { message?: string }
    ElMessage.error(err?.message ?? '新增用户失败')
  }
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
.page-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ml-2 {
  margin-left: 8px;
}
</style>
