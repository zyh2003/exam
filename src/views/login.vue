<template>
  <div class="login">
    <div class="loginForm">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFromRules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" size="large" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" size="large" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="loginForm.code"
            style="width: 130px"
            size="large"
          />
          <img :src="data.codeUrl" @click="getCode" />
        </el-form-item>
        <el-button type="primary" @click="handelLogin">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getCaptcha, login } from '../api/user'
const loginForm = reactive({
  username: 'test',
  password: '',
  code: ''
})

const loginFromRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
})

const data = reactive({
  codeUrl: '',
  token: ''
})
// 获取图片校验码
async function getCode () {
  const res = await getCaptcha()
  data.codeUrl = res.data.data.captchaImg
  data.token = res.data.data.token
}
getCode()

// 登录
const loginFormRef = ref()
async function handelLogin () {
  console.log(loginFormRef)
  const res = await login({
    username: loginForm.username,
    password: loginForm.password,
    code: loginForm.code,
    token: data.token
  })
  if (res.data.code === 200) {
    alert(111)
  } else {
    getCode()
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: #fafafa;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .loginForm {
    width: 380px;
    img {
      border-radius: 5px;
      width: 120px;
      height: 100%;
      margin-left: 10px;
    }
  }
}
</style>
