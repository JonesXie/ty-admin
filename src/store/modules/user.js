import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, getUser, setUser, removeToken } from '@/utils/auth'
import { config } from '@/config'
const user = {
  state: {
    token: getToken(),
    user: getUser() ? JSON.parse(getUser()) : config.user,
    userInfo: '',
    userUrl: ''
  },
  mutations: {
    SET_USERURL: (state, userUrl) => {
      state.userUrl = userUrl
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 用户菜单
    UserUrl({ commit }, data) {
      commit('SET_USERURL', data)
    },
    // 拉取验证码
    Login({ commit }, options) {
      return new Promise((resolve, reject) => {
        login(options.data, options.Token).then(response => {
          const data = response.data
          if (data.errno > 0) {
            const time = options.rememberMe ? 30 : 0.01
              setToken(data.msg, time)
            commit('SET_TOKEN', data.msg)
            setUser(options.user, time)
              commit('SET_USER', options.user)
              resolve(data)
          } else {
            reject(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.user.userName).then(response => {
          commit('SET_USERINFO', response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USER', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
