// 路由拦截
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const whiteList = ['/login'] // 白名单，不需要登录就可以访问
// 前置守卫
router.beforeEach((to, from, next) => {
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$roles:', store.getters.roles)
  if (getToken()) { // 如果能拿到token，说明登录成功
    if (to.path === '/login') { // 要去登录页则直接跳到,'/'
      next({ path: '/' }) // 路由跳转，走beforeEach，再次判断
    } else {
      // 如果要去除login以外的其他页面，再次进行判断,是否获取到用户的相关信息
      if (store.getters.roles.length === 0) {
        console.log('没有用户信息')
        // 虽然登陆了，但是没有用户信息，则重新获取用户信息
        store.dispatch('GetInfo').then((res) => {
          console.log('GetInfo:', res)
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            console.log('???????????????????????accessRoutes:', accessRoutes)
            accessRoutes.forEach(route => {
              router.addRoute(route) // 动态添加可访问路由表
            })
            next()
          })
        }).catch((err) => {
          Message.error(err)
        })
      } else { // 登陆成功，且有用户的相关信息，则说明动态路由已加载好了，直接往下走
        next()
      }
    }
    next()
  } else {
    // ①如果没有token，在刷新页面时，首先会进行一次路由跳转：在当前页面再次跳转本页面；
    // ②判断是否在免登录白名单内，不是则跳转到登录页；
    // ③然后时第二次路由跳转：从刷新的页面跳到登录页；
    // ④判断是否在白名单内（登录页在），若在则可直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单内可直接进入
      next()
    } else {
      // 免登录白名单中没有，则重定向到登录页
      next(`/login?redirect=${to.fullPath}`)
    }
    // 如果拿不到token，则跳转到登录页面，如果只写下面这一行代码，会报错，多次递归，每次路由跳转都会判断token；
    // 若用白名单，则可直接进入白名单中有的页面。
    // next(`/login?redirect=${to.fullPath}`)
  }
})
