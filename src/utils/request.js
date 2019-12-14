import axios from 'axios'
import router from '../router'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  getUser,
  removeToken
} from '@/utils/auth'
import {
  config
} from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 15000 // request timeout
})
// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    if (error.response && error.response.status === 401) {
      if (config.env === 'development') return
      MessageBox.confirm('您的账号登陆过期，请重新登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        removeToken()
        router.push('/login')
        location.reload()
      }).catch(() => {})
      return Promise.reject(error)
    } else if (error.response && error.response.status === 403) {
      if (config.env === 'development') return
      MessageBox.alert('权限不足', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        window.location.href = '/'
      }).catch(() => {})
      return Promise.reject(error)
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  })

export default service
