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
      <el-table-column prop="menuIcon" label="图标" width="100">
        <template #default="{ row }">
          <MenuIcon :icon="row.menuIcon" :size="24" />
        </template>
      </el-table-column>

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
          <el-tag :type="row.menuStatus === 1 ? 'success' : 'danger'">
            {{ row.menuStatus === 1 ? '正常' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-space size="small">
            <el-button size="small" type="primary" @click="openEditDialog(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
            <el-button size="small" type="warning" @click="openAddDialog(row.id)"
              >新增子菜单</el-button
            >
          </el-space>
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
    <el-dialog
      v-model="editVisible"
      :title="isEdit ? '编辑菜单' : '新增菜单'"
      width="500px"
      draggable
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="父菜单">
          <el-tree-select
            v-model="editForm.menuParentId"
            :data="menuTreeOptions"
            :props="treeSelectProps"
            placeholder="请选择父菜单"
            clearable
            check-strictly
            :default-expanded-keys="defaultExpandedKeys"
            :check-on-click-node="true"
            highlight-current
          />
        </el-form-item>

        <el-form-item label="菜单名称">
          <el-input v-model="editForm.menuName" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <IconPickerGrid v-model="editForm.menuIcon" />
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
          <el-switch v-model="editForm.menuStatus" :active-value="1" :inactive-value="0" />
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
import type { Menu, MenuForm, MenuNode } from '@/types/system/menu.ts'
import {
  addMenuApi,
  getMenuTreeApi,
  updateMenuApi,
  deleteMenuApi
} from '@/api/modules/menu/menu.ts'

// 表格数据
const menuData = ref<Menu[]>([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

// 树形选择器数据
const menuTreeOptions = ref<MenuNode[]>([])
// 默认展开的节点（用于新增子菜单或编辑时展开父节点）
const defaultExpandedKeys = ref<number[]>([])

// 树形选择器配置
const treeSelectProps = {
  label: 'menuName',
  value: 'id',
  children: 'children'
}

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
  menuIcon: '',
  menuSort: 1,
  menuVisible: 1,
  menuStatus: 0
})

/**
 * 构建树形数据，添加顶级菜单和禁用状态
 * @param nodes 后端返回的菜单树
 * @param editingId 当前正在编辑的菜单ID（用于禁用自己）
 */
function buildMenuTree(nodes: MenuNode[], editingId?: number): MenuNode[] {
  const processTree = (list: MenuNode[]): MenuNode[] => {
    return list.map((node) => {
      const newNode: MenuNode = {
        ...node,
        label: node.menuName, // 显示名称
        value: node.id // 绑定值
      }

      // 禁用当前正在编辑的节点
      if (editingId && newNode.id === editingId) {
        newNode.disabled = true
      }

      // 禁用停用状态的节点
      if (newNode.menuStatus === 1) {
        newNode.disabled = true
      }

      // 递归处理子节点
      if (newNode.children && newNode.children.length > 0) {
        newNode.children = processTree(newNode.children)
      }
      return newNode
    })
  }

  return [
    {
      id: 0,
      menuName: '顶级菜单',
      label: '顶级菜单',
      value: 0,
      menuPath: '',
      menuComponent: '',
      menuParentId: 0,
      menuType: 0,
      menuPermission: '',
      menuIcon: '',
      menuSort: 0,
      menuVisible: 1,
      menuStatus: 0,
      disabled: false,
      children: processTree(nodes)
    }
  ]
}

// 打开新增菜单弹窗
async function openAddDialog(parentId = 0) {
  isEdit.value = false
  editForm.value = {
    id: 0,
    menuName: '',
    menuPath: '',
    menuComponent: '',
    menuParentId: parentId,
    menuType: 1,
    menuPermission: '',
    menuIcon: '',
    menuSort: 1,
    menuVisible: 1,
    menuStatus: 0
  }

  const res = await getMenuTreeApi()
  menuTreeOptions.value = buildMenuTree(res)

  // 新增子菜单时，展开并高亮父节点
  defaultExpandedKeys.value = parentId ? [parentId] : []

  editVisible.value = true
}
function formatIconName(name: string) {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}
// 打开编辑菜单弹窗
async function openEditDialog(row: Menu) {
  isEdit.value = true
  editForm.value = {
    ...row,
    menuParentId: Number(row.menuParentId) || 0,
    menuIcon: formatIconName(row.menuIcon) // 转换成 PascalCase
  }

  const res = await getMenuTreeApi()
  menuTreeOptions.value = buildMenuTree(res, editForm.value.id)
  // 编辑时，展开并高亮父节点
  defaultExpandedKeys.value = editForm.value.menuParentId ? [editForm.value.menuParentId] : []

  editVisible.value = true
}

// 保存菜单（新增或编辑）
async function saveMenu() {
  // 基础校验
  if (!editForm.value.menuName) {
    ElMessage.warning('请输入菜单名称')
    return
  }

  if (isEdit.value) {
    // 编辑时，不能将自己设为自己的父菜单
    if (editForm.value.menuParentId === editForm.value.id) {
      ElMessage.warning('不能将自己设为父菜单')
      return
    }
    await updateMenuApi(editForm.value)
    ElMessage.success('菜单更新成功')
  } else {
    await addMenuApi(editForm.value)
    ElMessage.success('菜单新增成功')
  }
  editVisible.value = false
  loadData()
}

// 删除菜单
async function deleteRow(row: Menu) {
  await ElMessageBox.confirm(`确定要删除菜单 "${row.menuName}" 吗？删除后无法恢复！`, '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await deleteMenuApi(row.id)
  ElMessage.success('删除成功')
  loadData()
}

// 加载表格和树形数据
async function loadData() {
  loading.value = true
  const res = await getMenuTreeApi()
  menuData.value = res
  menuTreeOptions.value = buildMenuTree(res)
  total.value = res.length

  loading.value = false
}

// 查询
function search() {
  page.value = 1
  loadData()
}

// 重置查询条件
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

// 页面挂载时加载数据
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
  margin-bottom: 20px;
}
.ml-2 {
  margin-left: 8px;
}

/* 树形选择器样式优化 */
:deep(.el-tree-select) {
  width: 100%;
}

:deep(.el-tree-node__content) {
  height: 36px;
}

/* 表格操作按钮间距 */
.el-space {
  flex-wrap: wrap;
}
</style>
