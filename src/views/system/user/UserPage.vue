<template>
  <el-card>
    <h2 class="page-title">
      用户管理
      <el-button type="primary" class="ml-2" @click="openAddDialog">新增用户</el-button>
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
      <el-table-column prop="orgId" label="组织ID" />
      <el-table-column prop="lastLoginTime" label="上次登录时间">
        <template #default="scope">
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
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template #default="scope">
          {{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="warning" size="small" @click="openAssignRoleDialog(scope.row)"
            >分配角色</el-button
          >
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

    <!-- 新增用户弹窗 -->
    <FormDialog
      v-model="addDialogVisible"
      title="新增用户"
      :form="addForm"
      :rules="addRules"
      @submit="submitAddUser"
    >
      <template #form-fields="{ form }">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
          />
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
    </FormDialog>

    <!-- 编辑用户弹窗 -->
    <FormDialog
      v-model="editDialogVisible"
      title="编辑用户"
      :form="editForm"
      :rules="editRules"
      @submit="submitEditUser"
    >
      <template #form-fields="{ form }">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </template>
    </FormDialog>
    <FormDialog
      v-model="assignRoleDialogVisible"
      title="分配角色"
      :form="assignRoleForm"
      :rules="assignRoleRules"
      @submit="submitAssignRoles"
    >
      <template #form-fields="{ form }">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>

        <el-form-item label="角色" prop="roleIds">
          <!-- 当角色数量少于10时用复选框，否则用下拉 -->
          <template v-if="roles.length <= 10">
            <el-checkbox-group v-model="form.roleIds">
              <el-checkbox v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <template v-else>
            <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
              <el-option
                v-for="role in roles"
                :key="role.id"
                :label="role.roleName"
                :value="role.id"
              />
            </el-select>
          </template>
        </el-form-item>
      </template>
    </FormDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  addUserApi,
  deleteUserApi,
  getUserPageListApi,
  updateUserApi
} from '@/api/modules/user/user.ts'
import { type SysUserDTO, type SysUserVO } from '@/types/system/user.ts'
import type { PageQuery } from '@/types/common.ts'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox, type FormRules } from 'element-plus'
import FormDialog from '@/components/dialog/FormDialog.vue'
import type { SysRoleVO } from '@/types/system/role.ts'
import { getRoleListApi } from '@/api/modules/role/role.ts'
import { bindUserRolesApi, getRolesByUserIdApi } from '@/api/modules/userrole/userrole.ts'

// 用户数据
const users = ref<SysUserVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

const assignRoleDialogVisible = ref(false)
const roles = ref<SysRoleVO[]>([])

// 查询条件
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  username: '',
  email: '',
  phone: ''
})

// 新增用户弹窗状态
const addDialogVisible = ref<boolean>(false)
const openAddDialog = () => {
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
  addDialogVisible.value = true
}
const addForm = reactive<SysUserDTO>({
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  deptId: undefined,
  orgId: undefined,
  status: 1
})
const addRules: FormRules = {
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
/** 提交新增用户 */
const submitAddUser = async (form: SysUserDTO) => {
  await addUserApi(form) // 这里调用新增接口
  ElMessage.success('新增用户成功')
  addDialogVisible.value = false
  // 重置表单
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
  await fetchUsers() // 刷新列表
}
// 编辑用户弹窗状态
const editDialogVisible = ref(false)
const editForm = reactive<SysUserDTO>({
  id: undefined,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  deptId: undefined,
  orgId: undefined,
  status: 1
})
const editRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度 3-20 个字符', trigger: 'blur' }
  ],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  phone: [{ pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }]
}

/** 提交编辑用户 */
const submitEditUser = async (form: SysUserDTO) => {
  await updateUserApi(form)
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  await fetchUsers()
}

/** 打开编辑弹窗 */
const openEditDialog = (row: SysUserVO) => {
  Object.assign(editForm, row)
  editDialogVisible.value = true
}

/** 删除用户 */
const handleDelete = async (row: SysUserVO) => {
  await ElMessageBox.confirm(`确认删除用户 ${row.username} 吗？`, '提示', {
    type: 'warning'
  })
  await deleteUserApi(row.id!)
  ElMessage.success('删除成功')
  await fetchUsers()
}

/** 获取用户列表 */
const fetchUsers = async () => {
  loading.value = true
  const res = await getUserPageListApi({
    page: page.value,
    size: pageSize.value,
    username: queryForm.username,
    email: queryForm.email,
    phone: queryForm.phone
  })
  users.value = res.records
  total.value = res.total
  loading.value = false
}

const assignRoleForm = reactive({
  userId: undefined as number | undefined,
  username: '',
  roleIds: [] as number[]
})
const assignRoleRules: FormRules = {
  roleIds: [{ required: true, message: '请选择至少一个角色', trigger: 'change' }]
}
/** 打开分配角色弹窗 */
const openAssignRoleDialog = async (row: SysUserVO) => {
  assignRoleForm.userId = row.id
  assignRoleForm.username = row.username ?? ''
  // 获取所有角色
  roles.value = await getRoleListApi()
  // 获取用户已有角色
  const userRoles = await getRolesByUserIdApi(row.id!)
  assignRoleForm.roleIds = userRoles.map((r) => r.roleId)
  assignRoleDialogVisible.value = true
}
/** 提交分配角色 */
const submitAssignRoles = async (form: typeof assignRoleForm) => {
  const result = await bindUserRolesApi(form.userId!, form.roleIds)
  ElMessage.success(`角色分配成功，新增 ${result.addedCount} 条，删除 ${result.removedCount} 条`)
  assignRoleDialogVisible.value = false
}

/** 查询 */
const search = () => {
  page.value = 1
  fetchUsers()
}

/** 重置 */
const reset = () => {
  queryForm.username = ''
  queryForm.email = ''
  queryForm.phone = ''
  page.value = 1
  fetchUsers()
}

/** 分页事件 */
const handlePageChange = (p: number) => {
  page.value = p
  fetchUsers()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchUsers()
}

/** 页面加载时获取数据 */
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped></style>
