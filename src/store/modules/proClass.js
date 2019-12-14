
const proClass = {
  state: {
    proClassOptions: ''
  },
  mutations: {
    SET_PROCLASSOPTIONS: (state, opt) => {
        state.proClassOptions = opt
    }
  },
  actions: {
    //获取状态更改
    proClassOptionsUp({ commit }, opt) {
        commit('SET_PROCLASSOPTIONS', opt);
    }
  }
}

export default proClass
