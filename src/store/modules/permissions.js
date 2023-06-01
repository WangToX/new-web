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
          console.log(res.data)
          // 深拷贝JSON.parse(JSON.stringify())：假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，如果B没变，那就是深拷贝。
          // JSON.stringify() - 是把js对象转换为JSON字符串 （序列化）
          // JSON.parse() - 是把JSON字符串转换成js对象（反序列化）
          const rdata = JSON.parse(JSON.stringify(res.data))
          const sdata = JSON.parse(JSON.stringify(res.data))
          // 把从接口拿到的数据，处理成前端用的路由格式
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

// 转换路由格式
function filterAsyncRouter (asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // 如果是一级菜单路由
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        // 将后端传来的不完整的数据补充完整，导入文件，符合路由component格式
        route.component = loadView(route.component)
      }
    }
    // 如果当前路由有子路由
    if (route.children !== null && route.children && route.children.length) {
      // 子路由继续递归调用filterAsyncRouter方法
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}
// 导入views文件夹下的文件，转化成路由component的格式
function loadView (view) {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permissions
