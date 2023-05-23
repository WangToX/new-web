import { getRouters } from '@/api/menu'
import { constantRoute } from '@/router/index'
import Layout from '@/layout/index.vue'
const permissions = {
  state: {
    sidebarRouters: []
  },
  mutations: {
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    }
  },
  actions: {
    GenerateRoutes ({ commit }) {
      return new Promise((resolve, reject) => {
        getRouters().then((res) => {
          // 深拷贝：假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，如果B没变，那就是深拷贝。
          const rdata = JSON.parse(JSON.stringify(res.data))
          const sdata = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata)
          commit('SET_SIDEBAR_ROUTERS', constantRoute.concat(sidebarRoutes))
          resolve(rewriteRoutes)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

function filterAsyncRouter (asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

function loadView (view) {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permissions
