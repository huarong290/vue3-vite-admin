<!--src/views/system/dept/DeptPage.vue-->
<template>
  <el-card>
    <h2 class="page-title">
      部门管理
      <el-button type="primary" class="ml-2" @click="openAddDialog">新增部门</el-button>
    </h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="部门编码">
        <el-input v-model="queryForm.deptCode" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="queryForm.deptName" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 部门表格 -->
    <el-table :data="Depts" v-loading="loading" border>
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptName" label="部门名称" />
      <el-table-column prop="leader" label="部门领导" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="deptStatus" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.deptStatus === 1 ? 'success' : 'danger'">
            {{ scope.row.deptStatus === 1 ? '启用' : '禁用' }}
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

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <!-- 新增部门弹窗 -->
    <FormDialog
      v-model="addDialogVisible"
      title="新增部门"
      :form="addForm"
      :rules="addRules"
      @submit="submitAddDept"
    >
      <template #form-fields="{ form }">
        <el-form-item label="父部门" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="deptTree"
            node-key="id"
            :props="{ label: 'deptName', children: 'children', value: 'id' }"
            placeholder="请选择父部门"
            check-strictly
            clearable
          />
        </el-form-item>
        <el-form-item label="部门编码" prop="deptCode">
          <el-input v-model="form.deptCode" placeholder="请输入部门编码" />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="form.leader" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="状态" prop="deptStatus">
          <el-radio-group v-model="form.deptStatus">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </FormDialog>

    <!-- 编辑部门弹窗 -->
    <FormDialog
      v-model="editDialogVisible"
      title="编辑部门"
      :form="editForm"
      :rules="editRules"
      @submit="submitEditDept"
    >
      <template #form-fields="{ form }">
        <el-form-item label="父部门" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="deptTree"
            node-key="id"
            :props="{ label: 'deptName', children: 'children', value: 'id' }"
            placeholder="请选择父部门"
            check-strictly
            clearable
          />
        </el-form-item>
        <el-form-item label="部门编码" prop="deptCode">
          <el-input v-model="form.deptCode" disabled />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="form.leader" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="状态" prop="deptStatus">
          <el-select v-model="form.deptStatus">
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

import type { PageQuery } from '@/types/common.ts'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import FormDialog from '@/components/dialog/FormDialog.vue'
import type { SysDeptDTO, SysDeptTreeVO, SysDeptVO } from '@/types/system/dept.ts'
import {
  addDeptApi,
  deleteDeptApi,
  getDeptPageListApi,
  getDeptTreeApi,
  updateDeptApi
} from '@/api/modules/dept/dept.ts'

const Depts = ref<SysDeptVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

const deptTree = ref<SysDeptTreeVO[]>([])
const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  deptCode: '',
  deptName: ''
})
// 获取部门树
const fetchDeptTree = async () => {
  const res = await getDeptTreeApi()
  // 在最外层加一个虚拟根节点
  deptTree.value = [
    {
      id: 0,
      deptCode: 'ROOT',
      deptName: '顶级部门',
      parentId: -1,
      deptStatus: 1,
      children: res,
      disabled: false
    }
  ]
}
// 新增权限弹窗状态
const addDialogVisible = ref<boolean>(false)
const openAddDialog = () => {
  Object.assign(addForm, {
    deptCode: '',
    deptName: '',
    deptStatus: 1
  })
  fetchDeptTree()
  addDialogVisible.value = true
}
const addForm = reactive<SysDeptDTO>({
  deptCode: '',
  deptName: '',
  deptStatus: 1
})
const addRules = {
  deptCode: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
  deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
}
const submitAddDept = async (form: SysDeptDTO) => {
  await addDeptApi(form)
  ElMessage.success('新增部门成功')
  addDialogVisible.value = false
  await fetchDepts()
}
const openEditDialog = (row: SysDeptVO) => {
  Object.assign(editForm, row)
  if (!editForm.parentId) {
    editForm.parentId = 0 // 没有父级时默认顶级
  }
  fetchDeptTree()
  editDialogVisible.value = true
}
const editDialogVisible = ref(false)
const editForm = reactive<SysDeptDTO>({
  id: undefined,
  deptCode: '',
  deptName: '',
  deptStatus: 1
})
const editRules = addRules

const submitEditDept = async (form: SysDeptDTO) => {
  await updateDeptApi(form)
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  await fetchDepts()
}

const handleDelete = async (row: SysDeptVO) => {
  await ElMessageBox.confirm(`确认删除部门 ${row.deptName} 吗？`, '提示', { type: 'warning' })
  await deleteDeptApi(row.id!)
  ElMessage.success('删除成功')
  await fetchDepts()
}

const fetchDepts = async () => {
  loading.value = true
  const res = await getDeptPageListApi({
    page: page.value,
    size: pageSize.value,
    deptCode: queryForm.deptCode,
    deptName: queryForm.deptName
  })
  Depts.value = res.records
  total.value = res.total
  loading.value = false
}

const search = () => {
  page.value = 1
  fetchDepts()
}
const reset = () => {
  queryForm.deptCode = ''
  queryForm.deptName = ''
  page.value = 1
  fetchDepts()
}
const handlePageChange = (p: number) => {
  page.value = p
  fetchDepts()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchDepts()
}

onMounted(() => {
  fetchDepts()
})
</script>

<style scoped lang="scss"></style>
