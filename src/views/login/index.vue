<template>
  <div class="login">
    <a-row :gutter="20" >
      <a-col :span="8">
        <h2>欢迎来到VueAdmin管理系统</h2>
        <img
          src="https://www.markerhub.com/vueadmin/img/MarkerHub.c059bf19.jpg"
          alt=""
        />
        <p> 公众号 MarkerHub </p>
        <p> 扫码二维码，回复【 VueAdmin 】获取登录密码 </p>
      </a-col>
      <a-col :span="16" id="login-container">
        <a-form
          :label-col="{ span: 4 }"
          :model="formState"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
          name="basic"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            :rules="[{ required: true, message: '请输入用户名!' }]"
            label="用户名"
            name="username"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            :rules="[{ required: true, message: '请输入密码!' }]"
            label="密    码"
            name="password"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <a-form-item
            :rules="[{ required: true, message: '请输入验证码!' }]"
            class="code_box"
            label="验证码"
            name="code"
          >
            <a-input
              v-model:value="formState.code"
              class="codeImg"
              style="width: 200px"
            />
            <img :src="captchaImg" alt="" @click="getCodeUrl" />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 11, span: 13 }">
            <a-button
              html-type="submit"
              type="primary"
              @keydown.enter="onFinish"
              >登录</a-button
            >
            <a-button>获取验证码</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiLogin, getCaptcha } from '@/api/login'
import { useRouter } from 'vue-router'

const formState = reactive({
  username: 'test',
  password: '1234567',
  code: null,
  token: null
})
const router = useRouter()
const captchaImg = ref('')
const getCodeUrl = async () => {
  const res = await getCaptcha()
  console.log(res)
  captchaImg.value = res.captchaImg
  formState.token = res.token
}
getCodeUrl()
const onFinish = async () => {
  try {
    console.log(formState)
    await apiLogin(formState)
    await router.push('/')
  } catch (error) {}
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>
<style lang="scss" scoped>
.login{
  padding-left: 230px;
  padding-top: 80px;
}
#login-container {
  width: 520px;
  height: 300px;
  margin-top: 100px;
  padding-right: 100px;
}
.ant-form-item{
  width: 500px;
}
.ant-btn-primary{
  margin-right: 10px;
}
.codeImg {
  margin-right: 10px;
}
</style>
