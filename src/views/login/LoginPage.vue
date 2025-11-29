<template>
  <div class="auth-page" :class="themeStore.mode" role="main">
    <div class="auth-card" aria-labelledby="login-title">
      <!-- 顶部品牌区 + 工具栏 -->
      <div class="brand-header">
        <div class="brand">
          <div class="logo" aria-hidden="true">⭑</div>
          <h1 id="login-title" class="brand-title">管理后台</h1>
          <p class="brand-sub">欢迎回来，请使用您的账号登录</p>
        </div>

        <!-- 右侧工具栏 -->
        <div class="theme-tools">
          <el-tooltip
            :content="themeStore.mode === 'light' ? '切换到暗黑模式' : '切换到明亮模式'"
            placement="bottom"
          >
            <el-button @click="toggleTheme" circle size="large">
              <el-icon>
                <component :is="themeStore.mode === 'light' ? Sunny : Moon" />
              </el-icon>
            </el-button>
          </el-tooltip>

          <el-color-picker
            v-model="themeStore.primaryColor"
            @change="themeStore.setPrimaryColor"
            size="large"
          />
        </div>
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-position="left"
        label-width="0"
        class="form"
        @submit.prevent
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名 / 邮箱"
            clearable
            :prefix-icon="User"
          />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
            clearable
            :prefix-icon="Lock"
            :suffix-icon="showPassword ? View : Hide"
            @suffix-click="toggleShowPassword"
          />
        </el-form-item>

        <!-- 验证码输入框 -->
        <el-form-item prop="captchaCode">
          <div class="captcha-row">
            <el-input
              v-model="loginForm.captchaCode"
              placeholder="请输入验证码"
              clearable
              style="flex: 1"
            />
            <!-- 验证码图片，点击刷新 -->
            <img :src="captchaImage" alt="验证码" class="captcha-img" @click="loadCaptcha" />
          </div>
        </el-form-item>

        <!-- 记住我和忘记密码 -->
        <div class="form-row">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <a class="forgot" @click.prevent="handleForgot">忘记密码？</a>
        </div>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" :loading="loading" class="btn-login" @click="handleLogin">
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>

        <!-- 分割线 -->
        <div class="divider"><span>或使用</span></div>

        <!-- 社交登录 -->
        <div class="socials">
          <el-button circle class="social-btn" @click="socialLogin('github')">
            <i class="fa fa-github" />
          </el-button>
          <el-button circle class="social-btn" @click="socialLogin('wechat')">
            <i class="fa fa-weixin" />
          </el-button>
          <el-button circle class="social-btn" @click="socialLogin('apple')">
            <i class="fa fa-apple" />
          </el-button>
        </div>

        <!-- 提示信息 -->
        <p class="note">本示例会调用后端接口进行登录和验证码校验。</p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useThemeStore } from '@/stores/modules/theme/theme'
import { Sunny, Moon, User, Lock, View, Hide } from '@element-plus/icons-vue'
import { getCaptchaApi, loginApi } from '@/api/auth/auth'

const router = useRouter()
const themeStore = useThemeStore()

const loginFormRef = ref()
const loading = ref(false)
const showPassword = ref(false)

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  remember: false,
  captchaId: '',
  captchaCode: ''
})

// 验证码图片
const captchaImage = ref('')

// 校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

// 页面加载时检查保存的登录信息并获取验证码
onMounted(() => {
  loadCaptcha()
  const saved = localStorage.getItem('lp_saved')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.username) loginForm.value.username = parsed.username
      if (parsed.password) loginForm.value.password = parsed.password
      loginForm.value.remember = true
    } catch (e) {
      console.warn('读取保存的账号失败', e)
    }
  }
})

// 加载验证码
async function loadCaptcha() {
  try {
    const res = await getCaptchaApi()
    loginForm.value.captchaId = res.captchaId
    captchaImage.value = 'data:image/png;base64,' + res.captchaImage
  } catch (e) {
    console.warn('读取保存的账号失败', e)
    ElMessage.error('获取验证码失败')
  }
}

// 切换密码显示/隐藏
function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

// 登录处理
async function handleLogin() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await loginApi({
        username: loginForm.value.username,
        password: loginForm.value.password,
        captchaId: loginForm.value.captchaId,
        captchaCode: loginForm.value.captchaCode,
        rememberMe: loginForm.value.remember
      })
      // 登录成功逻辑
      localStorage.setItem('token', res.accessToken)
      if (loginForm.value.remember) {
        localStorage.setItem('lp_saved', JSON.stringify(loginForm.value))
      } else {
        localStorage.removeItem('lp_saved')
      }
      ElMessage.success('登录成功')
      router.push('/')
    } catch (e) {
      ElMessage.error('登录失败，请检查账号或验证码')
      console.warn('登录失败，请检查账号或验证码', e)
      loadCaptcha() // 登录失败时刷新验证码
    } finally {
      loading.value = false
    }
  })
}

// 忘记密码处理
function handleForgot() {
  ElMessageBox.prompt('请输入注册邮箱，我们将发送重置说明', '找回密码', {
    confirmButtonText: '发送',
    cancelButtonText: '取消',
    inputPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    inputErrorMessage: '请输入有效邮箱'
  })
    .then(({ value }) => {
      ElMessage.success(`已向 ${value} 发送重置邮件`)
    })
    .catch(() => {})
}

// 社交登录处理
function socialLogin(provider: string) {
  ElMessage.info(`社交登录：${provider}（演示）`)
}

// 切换主题
function toggleTheme() {
  themeStore.setMode(themeStore.mode === 'light' ? 'dark' : 'light')
}
</script>

<style scoped lang="scss">
.captcha-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-img {
  width: 100px;
  height: 40px;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>
