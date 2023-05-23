import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from './auth'
import store from '@/store'

const isRelogin = { show: false }

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // notToken：请求时不用携带token
  const notToken = (config.headers || {}).notToken === true
  if (getToken() && !notToken) {
    // 与后端约定的请求头里的参数
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
}, error => {
  Message({
    message: error,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // console.log('123456:', res)
  const code = res.data.code
  const msg = res.data.msg
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true
      MessageBox.confirm('登录已过期，请重新登录！', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        isRelogin.show = false
        store.dispatch('Logout').then(() => {
          location.href = '/'
        })
      }).catch((err) => {
        isRelogin.show = false
        console.log(err)
      })
    }
    return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
  } else if (code === 500) {
    // 用了element UI里的Message
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    return Promise.reject(new Error(msg))
  } else {
    return res.data
  }
}, error => {
  let { message } = error
  console.log('@@@@@@@@@@@@@error:', message)
  if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failes with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常'
  }
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
