import { login, getInfo, logout } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    permissions: [],
    name: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    Login ({ commit }, loginForm) {
      const username = loginForm.username.trim()
      const password = loginForm.password
      const code = loginForm.code
      const uuid = loginForm.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then((res) => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          const user = res.user
          const avatar = (user.avatar === '' || user.avatar === null)
            ? require('@/assets/images/profile.jpg')
            : process.env.VUE_APP_BASE_URL + user.avatar
          if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.name)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default user
