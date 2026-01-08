<template>
  <el-card>
    <h2 class="page-title">
      角色管理
      <el-button type="primary" class="ml-2" @click="openAddDialog">新增角色</el-button>
    </h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="角色名称">
        <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="queryForm.roleCode" placeholder="请输入角色编码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色表格 -->
    <el-table :data="roles" v-loading="loading" border>
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="roleDescription" label="角色描述" />
      <el-table-column prop="roleStatus" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.roleStatus === 1 ? 'success' : 'danger'">
            {{ scope.row.roleStatus === 1 ? '启用' : '禁用' }}
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

      <!-- 操作列 -->
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="success" size="small" @click="openAssignMenuDialog(scope.row)"
            >分配菜单</el-button
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

    <!-- 新增角色弹窗 -->
    <FormDialog
      v-model="addDialogVisible"
      title="新增角色"
      :form="addForm"
      :rules="addRules"
      @submit="submitAddRole"
    >
      <template #form-fields="{ form }">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="form.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescription">
          <el-input v-model="form.roleDescription" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item label="状态" prop="roleStatus">
          <el-radio-group v-model="form.roleStatus">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </FormDialog>

    <!-- 编辑角色弹窗 -->
    <FormDialog
      v-model="editDialogVisible"
      title="编辑角色"
      :form="editForm"
      :rules="editRules"
      @submit="submitEditRole"
    >
      <template #form-fields="{ form }">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="form.roleCode" disabled />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescription">
          <el-input v-model="form.roleDescription" />
        </el-form-item>
        <el-form-item label="状态" prop="roleStatus">
          <el-select v-model="form.roleStatus" placeholder="请选择状态">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </template>
    </FormDialog>
    <!-- 分配菜单弹窗 -->
    <FormDialog
      v-model="assignMenuDialogVisible"
      title="分配菜单"
      :form="assignMenuForm"
      :rules="assignMenuRules"
      submit-text="保存"
      :loading="assignLoading"
      @submit="submitAssignMenus"
    >
      <template #form-fields>
        <el-form-item label="菜单" prop="menuIds">
          <el-tree
            ref="menuTreeRef"
            :data="menuTree"
            show-checkbox
            node-key="id"
            :props="{ label: 'menuName', children: 'children' }"
            :default-expanded-keys="menuTree.map((item) => item.id)"
          />
        </el-form-item>
      </template>
    </FormDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import {
  addRoleApi,
  deleteRoleApi,
  getRolePageListApi,
  updateRoleApi
} from '@/api/modules/role/role.ts'
import { type SysRoleDTO, type SysRoleVO } from '@/types/system/role.ts'
import type { PageQuery } from '@/types/common.ts'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import FormDialog from '@/components/dialog/FormDialog.vue'
import { bindRoleMenusApi, getMenusByRoleIdApi } from '@/api/modules/rolemenu/rolemenu.ts'
import { getMenuTreeApi } from '@/api/modules/menu/menu.ts'
import type { Menu } from '@/types/system/menu.ts'

// 角色数据
const roles = ref<SysRoleVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

// 查询条件
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  roleName: '',
  roleCode: ''
})

// 新增角色弹窗状态
const addDialogVisible = ref<boolean>(false)
const openAddDialog = () => {
  Object.assign(addForm, {
    roleName: '',
    roleCode: '',
    roleDescription: '',
    roleStatus: 1
  })
  addDialogVisible.value = true
}
const addForm = reactive<SysRoleDTO>({
  roleName: '',
  roleCode: '',
  roleDescription: '',
  roleStatus: 1
})
const addRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

// 编辑角色弹窗状态
const editDialogVisible = ref<boolean>(false)
const editForm = reactive<SysRoleDTO>({
  id: undefined,
  roleName: '',
  roleCode: '',
  roleDescription: '',
  roleStatus: 1
})
const editRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

// 提交新增角色
const submitAddRole = async (form: SysRoleDTO) => {
  console.log(form)
  await addRoleApi(form)
  ElMessage.success('新增角色成功')
  addDialogVisible.value = false
  Object.assign(addForm, { roleName: '', roleCode: '', roleDescription: '', roleStatus: 1 })
  await fetchRoles()
}

// 提交编辑角色
const submitEditRole = async (form: SysRoleDTO) => {
  await updateRoleApi(form)
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  await fetchRoles()
}

// 打开编辑弹窗
const openEditDialog = (row: SysRoleVO) => {
  Object.assign(editForm, {
    id: undefined,
    roleName: '',
    roleCode: '',
    roleDescription: '',
    roleStatus: 1
  })
  // 再覆盖成选中行的数据
  Object.assign(editForm, row)
  editDialogVisible.value = true
}

// 删除角色
const handleDelete = async (row: SysRoleVO) => {
  await ElMessageBox.confirm(`确认删除角色 ${row.roleName} 吗？`, '提示', { type: 'warning' })
  await deleteRoleApi(row.id!)
  ElMessage.success('删除成功')
  await fetchRoles()
}

// 获取角色列表
const fetchRoles = async () => {
  loading.value = true
  const res = await getRolePageListApi({
    page: page.value,
    size: pageSize.value,
    roleName: queryForm.roleName,
    roleCode: queryForm.roleCode
  })
  roles.value = res.records
  total.value = res.total
  loading.value = false
}

// 分配菜单相关状态
const assignMenuDialogVisible = ref(false)
const assignMenuForm = reactive({
  roleId: 0,
  menuIds: [] as number[]
})
const assignMenuRules = {
  menuIds: [{ required: true, message: '请选择菜单', trigger: 'change' }]
}
const menuTree = ref<Menu[]>([])
const menuTreeRef = ref()
const assignLoading = ref(false)

// 打开分配菜单弹窗
const openAssignMenuDialog = async (row: SysRoleVO) => {
  assignMenuForm.roleId = row.id!
  // 获取菜单树
  menuTree.value = await getMenuTreeApi()
  // 获取角色已绑定的菜单
  const roleMenus = await getMenusByRoleIdApi(row.id!)
  assignMenuForm.menuIds = roleMenus.map((m) => m.menuId)
  // 打开弹窗
  assignMenuDialogVisible.value = true
}

// 监听弹窗打开，确保树渲染完成后再设置选中
watch(assignMenuDialogVisible, async (visible) => {
  if (visible) {
    await nextTick()
    menuTreeRef.value?.setCheckedKeys(assignMenuForm.menuIds)
  }
})

// 提交分配菜单
const submitAssignMenus = async (form: typeof assignMenuForm) => {
  assignLoading.value = true
  try {
    const checkedKeys = menuTreeRef.value?.getCheckedKeys() || []
    const halfCheckedKeys = menuTreeRef.value?.getHalfCheckedKeys() || []
    await bindRoleMenusApi(form.roleId, [...checkedKeys, ...halfCheckedKeys])
    ElMessage.success('菜单分配成功')
    assignMenuDialogVisible.value = false
  } finally {
    assignLoading.value = false
  }
}

// 查询
const search = () => {
  page.value = 1
  fetchRoles()
}

// 重置
const reset = () => {
  queryForm.roleName = ''
  queryForm.roleCode = ''
  page.value = 1
  fetchRoles()
}

// 分页事件
const handlePageChange = (p: number) => {
  page.value = p
  fetchRoles()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchRoles()
}

// 页面加载时获取数据
onMounted(() => {
  fetchRoles()
})
</script>

<style scoped></style>
