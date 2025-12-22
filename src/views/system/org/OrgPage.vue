<!--src/views/system/org/OrgPage.vue-->
<template>
  <el-card>
    <h2 class="page-title">
      组织管理
      <el-button type="primary" class="ml-2" @click="openAddDialog">新增组织</el-button>
    </h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="组织编码">
        <el-input v-model="queryForm.orgCode" placeholder="请输入组织编码" />
      </el-form-item>
      <el-form-item label="组织名称">
        <el-input v-model="queryForm.orgName" placeholder="请输入组织名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 组织表格 -->
    <el-table :data="Orgs" v-loading="loading" border>
      <el-table-column prop="orgCode" label="组织编码" />
      <el-table-column prop="orgName" label="组织名称" />
      <el-table-column prop="orgStatus" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.orgStatus === 1 ? 'success' : 'danger'">
            {{ scope.row.orgStatus === 1 ? '启用' : '禁用' }}
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

    <!-- 新增组织弹窗 -->
    <FormDialog
      v-model="addDialogVisible"
      title="新增组织"
      :form="addForm"
      :rules="addRules"
      @submit="submitAddOrg"
    >
      <template #form-fields="{ form }">
        <el-form-item label="组织编码" prop="orgCode">
          <el-input v-model="form.orgCode" placeholder="请输入组织编码" />
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="form.orgName" placeholder="请输入组织名称" />
        </el-form-item>
        <el-form-item label="状态" prop="orgStatus">
          <el-radio-group v-model="form.orgStatus">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </FormDialog>

    <!-- 编辑组织弹窗 -->
    <FormDialog
      v-model="editDialogVisible"
      title="编辑组织"
      :form="editForm"
      :rules="editRules"
      @submit="submitEditOrg"
    >
      <template #form-fields="{ form }">
        <el-form-item label="组织编码" prop="orgCode">
          <el-input v-model="form.orgCode" disabled />
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="form.orgName" />
        </el-form-item>
        <el-form-item label="状态" prop="orgStatus">
          <el-select v-model="form.orgStatus">
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
import type { SysOrgDTO, SysOrgVO } from '@/types/system/org.ts'
import { addOrgApi, deleteOrgApi, getOrgPageListApi, updateOrgApi } from '@/api/modules/org/Org.ts'

const Orgs = ref<SysOrgVO[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(10)
const loading = ref<boolean>(false)

const queryForm = reactive<PageQuery>({
  page: 1,
  size: 10,
  orgCode: '',
  orgName: ''
})
// 新增权限弹窗状态
const addDialogVisible = ref<boolean>(false)
const openAddDialog = () => {
  Object.assign(addForm, {
    orgCode: '',
    orgName: '',
    orgStatus: 1
  })
  addDialogVisible.value = true
}

const addForm = reactive<SysOrgDTO>({
  orgCode: '',
  orgName: '',
  orgStatus: 1
})
const addRules = {
  orgCode: [{ required: true, message: '请输入组织编码', trigger: 'blur' }],
  orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }]
}

const editDialogVisible = ref(false)
const editForm = reactive<SysOrgDTO>({
  id: undefined,
  orgCode: '',
  orgName: '',
  orgStatus: 1
})
const editRules = addRules

const submitAddOrg = async (form: SysOrgDTO) => {
  await addOrgApi(form)
  ElMessage.success('新增组织成功')
  addDialogVisible.value = false
  await fetchOrgs()
}

const submitEditOrg = async (form: SysOrgDTO) => {
  await updateOrgApi(form)
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  await fetchOrgs()
}

const openEditDialog = (row: SysOrgVO) => {
  Object.assign(editForm, row)
  editDialogVisible.value = true
}

const handleDelete = async (row: SysOrgVO) => {
  await ElMessageBox.confirm(`确认删除组织 ${row.orgName} 吗？`, '提示', { type: 'warning' })
  await deleteOrgApi(row.id!)
  ElMessage.success('删除成功')
  await fetchOrgs()
}

const fetchOrgs = async () => {
  loading.value = true
  const res = await getOrgPageListApi({
    page: page.value,
    size: pageSize.value,
    orgCode: queryForm.orgCode,
    orgName: queryForm.orgName
  })
  Orgs.value = res.records
  total.value = res.total
  loading.value = false
}

const search = () => {
  page.value = 1
  fetchOrgs()
}
const reset = () => {
  queryForm.orgCode = ''
  queryForm.orgName = ''
  page.value = 1
  fetchOrgs()
}
const handlePageChange = (p: number) => {
  page.value = p
  fetchOrgs()
}
const handleSizeChange = (s: number) => {
  pageSize.value = s
  page.value = 1
  fetchOrgs()
}

onMounted(() => {
  fetchOrgs()
})
</script>

<style scoped lang="scss"></style>
