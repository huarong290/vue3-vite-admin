<template>
  <el-card>
    <h2 class="page-title">
      权限管理
      <el-button type="primary" class="ml-2" @click="openAddDialog">新增权限</el-button>
    </h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="权限编码">
        <el-input v-model="queryForm.permissionCode" placeholder="请输入权限编码" />
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input v-model="queryForm.permissionName" placeholder="请输入权限名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 权限表格 -->
    <el-table :data="permissions" v-loading="loading" border>
      <el-table-column prop="permissionCode" label="权限编码" />
      <el-table-column prop="permissionName" label="权限名称" />
      <el-table-column prop="permissionType" label="类型">
        <template #default="scope">
          <el-tag :type="scope.row.permissionType === 1 ? 'info' : 'warning'">
            {{ scope.row.permissionType === 1 ? '接口权限' : '数据权限' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permissionStatus" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.permissionStatus === 1 ? 'success' : 'danger'">
            {{ scope.row.permissionStatus === 1 ? '启用' : '禁用' }}
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

    <!-- 新增权限弹窗 -->
    <FormDialog
      v-model="addDialogVisible"
      title="新增权限"
      :form="addForm"
      :rules="addRules"
      @submit="submitAddPermission"
    >
      <template #form-fields="{ form }">
        <el-form-item label="权限编码" prop="permissionCode">
          <el-input v-model="form.permissionCode" placeholder="请输入权限编码" />
        </el-form-item>
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="form.permissionName" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="类型" prop="permissionType">
          <el-select v-model="form.permissionType" placeholder="请选择类型">
            <el-option label="接口权限" :value="1" />
            <el-option label="数据权限" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="permissionStatus">
          <el-radio-group v-model="form.permissionStatus">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </FormDialog>

    <!-- 编辑权限弹窗 -->
    <FormDialog
      v-model="editDialogVisible"
      title="编辑权限"
      :form="editForm"
      :rules="editRules"
      @submit="submitEditPermission"
    >
      <template #form-fields="{ form }">
        <el-form-item label="权限编码" prop="permissionCode">
          <el-input v-model="form.permissionCode" disabled />
        </el-form-item>
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="form.permissionName" />
        </el-form-item>
        <el-form-item label="类型" prop="permissionType">
          <el-select v-model="form.permissionType">
            <el-option label="接口权限" :value="1" />
            <el-option label="数据权限" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="permissionStatus">
          <el-select v-model="form.permissionStatus">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </template>
    </FormDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  addPermissionApi,
  deletePermissionApi,
  getPermissionPageListApi,
  updatePermissionApi
} from '@/api/modules/permission/permission.ts'
import { type SysPermissionDTO, type SysPermissionVO } from '@/types/system/permission.ts'
import type { PageQuery } from '@/types/common.ts'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import FormDialog from '@/components/dialog/FormDialog.vue'

// 权限数据
const permissions = ref<SysPermissionVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

// 查询条件
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  permissionCode: '',
  permissionName: ''
})

// 新增权限弹窗状态
const addDialogVisible = ref<boolean>(false)
const openAddDialog = () => {
  Object.assign(addForm, {
    permissionCode: '',
    permissionName: '',
    permissionType: 1,
    permissionStatus: 1
  })
  addDialogVisible.value = true
}
const addForm = reactive<SysPermissionDTO>({
  permissionCode: '',
  permissionName: '',
  permissionType: 1,
  permissionStatus: 1
})
const addRules = {
  permissionCode: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
  permissionName: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
}

// 编辑权限弹窗状态
const editDialogVisible = ref<boolean>(false)
const editForm = reactive<SysPermissionDTO>({
  id: undefined,
  permissionCode: '',
  permissionName: '',
  permissionType: 1,
  permissionStatus: 1
})
const editRules = {
  permissionCode: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
  permissionName: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
}

// 提交新增权限
const submitAddPermission = async (form: SysPermissionDTO) => {
  await addPermissionApi(form)
  ElMessage.success('新增权限成功')
  addDialogVisible.value = false
  Object.assign(addForm, {
    permissionCode: '',
    permissionName: '',
    permissionType: 1,
    permissionStatus: 1
  })
  await fetchPermissions()
}

// 提交编辑权限
const submitEditPermission = async (form: SysPermissionDTO) => {
  await updatePermissionApi(form)
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  await fetchPermissions()
}

// 打开编辑弹窗
const openEditDialog = (row: SysPermissionVO) => {
  Object.assign(editForm, {
    id: undefined,
    permissionCode: '',
    permissionName: '',
    permissionType: 1,
    permissionStatus: 1
  })
  Object.assign(editForm, row)
  editDialogVisible.value = true
}

// 删除权限
const handleDelete = async (row: SysPermissionVO) => {
  await ElMessageBox.confirm(`确认删除权限 ${row.permissionName} 吗？`, '提示', { type: 'warning' })
  await deletePermissionApi(row.id!)
  ElMessage.success('删除成功')
  await fetchPermissions()
}

// 获取权限列表
const fetchPermissions = async () => {
  loading.value = true
  const res = await getPermissionPageListApi({
    page: page.value,
    size: pageSize.value,
    permissionCode: queryForm.permissionCode,
    permissionName: queryForm.permissionName
  })
  permissions.value = res.records
  total.value = res.total
  loading.value = false
}

// 查询
const search = () => {
  page.value = 1
  fetchPermissions()
}

// 重置
const reset = () => {
  queryForm.permissionCode = ''
  queryForm.permissionName = ''
  page.value = 1
  fetchPermissions()
}

// 分页事件
const handlePageChange = (p: number) => {
  page.value = p
  fetchPermissions()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchPermissions()
}

// 页面加载时获取数据
onMounted(() => {
  fetchPermissions()
})
</script>

<style scoped></style>
