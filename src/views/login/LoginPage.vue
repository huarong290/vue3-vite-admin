<template>
  <div class="login-container">
    <el-card class="card login-card">
      <h2 class="card-title login-title">系统登录</h2>

      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
          class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
          />
        </el-form-item>

        <!-- 记住密码 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 表单数据
const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loginFormRef = ref()
const loading = ref(false)

// 页面加载时，检查是否有保存的账号信息
onMounted(() => {
  const savedUser = localStorage.getItem('saved-username')
  const savedPass = localStorage.getItem('saved-password')
  if (savedUser && savedPass) {
    loginForm.value.username = savedUser
    loginForm.value.password = savedPass
    loginForm.value.remember = true
  }
})

// 登录逻辑
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (!valid) return

    loading.value = true
    setTimeout(() => {
      loading.value = false

      // 模拟校验成功
      if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
        // 保存 token
        localStorage.setItem('token', 'mock-token')

        // 如果勾选了记住密码，就保存账号信息
        if (loginForm.value.remember) {
          localStorage.setItem('saved-username', loginForm.value.username)
          localStorage.setItem('saved-password', loginForm.value.password)
        } else {
          localStorage.removeItem('saved-username')
          localStorage.removeItem('saved-password')
        }

        ElMessage.success('登录成功')
        router.push('/') // 跳转到首页
      } else {
        ElMessage.error('用户名或密码错误')
      }
    }, 1000)
  })
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-bg-body);
}

.login-card {
  width: 360px;
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
}

.login-title {
  text-align: center;
  margin-bottom: var(--spacing-6);
  color: var(--color-text-primary);
}

.login-form {
  margin-top: var(--spacing-4);
}
</style>
