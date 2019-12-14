
const addr = {
  state: {
    addrOptions: ''
  },
  mutations: {
    SET_ADDROPTIONS: (state, addrOptions) => {
      state.addrOptions = addrOptions
    }
  },
  actions: {
    // 获取状态更改
    AddrOptionsUp({ commit }, opt) {
      commit('SET_ADDROPTIONS', opt)
    }
  }
}

export default addr
