import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'https://www.markerhub.com/vueadmin-java',
  timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.headers.authorization) {
    store.commit('user/setToken', response.headers.authorization)
  }
  NProgress.done()
  const {
    data: {
      data,
      code,
      msg
    }
  } = response

  if (code === 200) {
    message.success(msg)
    return data
  } else {
    message.error(msg)
    return Promise.reject(msg)
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
