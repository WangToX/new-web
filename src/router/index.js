import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

export const constantRoute = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '',
    component: Layout,
    // hidden: true,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes: constantRoute
})

// 解决（面包屑）重复点击相同路由报错问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
