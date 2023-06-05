const app = {
  state: {
    sidebar: {
      // 默认侧边栏展开
      opened: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR (state) {
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }

  }
}

export default {
  namespaced: true, // 开启命名空间
  ...app
}
