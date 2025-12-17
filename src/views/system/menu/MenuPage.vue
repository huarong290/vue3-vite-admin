<template>
  <el-card>
    <h2 class="page-title">
      菜单管理
      <el-button type="primary" class="ml-2" @click="openAddDialog()">新增菜单</el-button>
    </h2>

    <!-- 查询条件 -->
    <el-form :inline="true" :model="queryForm" class="mb-3">
      <el-form-item label="菜单名称">
        <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="queryForm.menuPath" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 树形表格 -->
    <el-table
      :data="menuData"
      row-key="id"
      border
      default-expand-all
      v-loading="loading"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuName" label="菜单名称" width="200" />
      <el-table-column prop="menuPath" label="路径" width="200" />
      <el-table-column prop="menuComponent" label="组件" width="200" />
      <el-table-column prop="menuPermission" label="权限标识" width="200" />
      <el-table-column prop="menuSort" label="排序" width="80" />
      <el-table-column prop="menuVisible" label="是否显示" width="100">
        <template #default="{ row }">
          <el-tag :type="row.menuVisible === 1 ? 'success' : 'info'">
            {{ row.menuVisible === 1 ? '显示' : '隐藏' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="menuStatus" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.menuStatus === 0 ? 'success' : 'danger'">
            {{ row.menuStatus === 0 ? '正常' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openEditDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
          <el-button size="small" @click="openAddDialog(row.id)">新增子菜单</el-button>
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

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="editVisible" :title="isEdit ? '编辑菜单' : '新增菜单'" width="500px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="父菜单">
          <el-tree-select
            v-model="editForm.menuParentId"
            :data="menuTreeOptions"
            :props="{ label: 'menuName', value: 'id', children: 'children' }"
            placeholder="请选择父菜单"
            clearable
          />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="editForm.menuName" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editForm.menuPath" />
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="editForm.menuComponent" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="editForm.menuPermission" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.menuSort" :min="1" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="editForm.menuVisible" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="editForm.menuStatus" :active-value="0" :inactive-value="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Menu, MenuForm } from '@/types/system/menu.ts'
import {
  addMenuApi,
  getMenuTreeApi,
  updateMenuApi,
  deleteMenuApi
} from '@/api/modules/menu/menu.ts'

// 数据
const menuData = ref<Menu[]>([])
const menuTreeOptions = ref<Menu[]>([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

// 查询条件
const queryForm = reactive({
  menuName: '',
  menuPath: ''
})

// 弹窗状态
const editVisible = ref(false)
const isEdit = ref(false)
const editForm = ref<MenuForm>({
  id: 0,
  menuName: '',
  menuPath: '',
  menuComponent: '',
  menuParentId: 0,
  menuType: 1,
  menuPermission: '',
  menuSort: 1,
  menuVisible: 1,
  menuStatus: 0
})

// 打开新增
function openAddDialog(parentId = 0) {
  isEdit.value = false
  editForm.value = {
    id: 0,
    menuName: '',
    menuPath: '',
    menuComponent: '',
    menuParentId: parentId,
    menuType: 1,
    menuPermission: '',
    menuSort: 1,
    menuVisible: 1,
    menuStatus: 0
  }
  editVisible.value = true
}

// 打开编辑
function openEditDialog(row: Menu) {
  isEdit.value = true
  editForm.value = { ...row }
  editVisible.value = true
}

// 保存
async function saveMenu() {
  if (isEdit.value) {
    await updateMenuApi(editForm.value)
    ElMessage.success('菜单更新成功')
  } else {
    await addMenuApi(editForm.value)
    ElMessage.success('菜单新增成功')
  }
  editVisible.value = false
  loadData()
}

// 删除
async function deleteRow(row: Menu) {
  await ElMessageBox.confirm(`确定要删除菜单 "${row.menuName}" 吗？`, '提示', { type: 'warning' })
  await deleteMenuApi(row.id)
  ElMessage.success('删除成功')
  loadData()
}

// 加载数据
async function loadData() {
  loading.value = true
  const res = await getMenuTreeApi()
  menuData.value = res
  menuTreeOptions.value = res
  total.value = res.length // 如果后端返回 total，可以替换这里
  loading.value = false
}

// 查询
function search() {
  page.value = 1
  loadData()
}

// 重置
function reset() {
  queryForm.menuName = ''
  queryForm.menuPath = ''
  page.value = 1
  loadData()
}

// 分页事件
function handlePageChange(p: number) {
  page.value = p
  loadData()
}
function handleSizeChange(s: number) {
  pageSize.value = s
  page.value = 1
  loadData()
}

onMounted(() => {
  loadData()
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
