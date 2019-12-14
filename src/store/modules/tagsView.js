const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: ['dashboard'],
    refreshTag: true
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (!state.cachedViews.some(v => v === view.name) && !view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      }))
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    },
    DEL_CACHEDVIEWS: (state, name) => {
      let n
      state.cachedViews.forEach((ele, inx) => {
        if (ele === name) n = inx
      })
      state.cachedViews.splice(n, 1)
    },
    SETREFRESHTAG: (state, opt) => {
      state.refreshTag = opt.type
      if (opt.type) state.cachedViews.push(opt.name)
    }
  },
  actions: {
    setRefreshTag({ commit }, opt) {
      commit('SETREFRESHTAG', opt)
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit }, name) {
      commit('DEL_CACHEDVIEWS', name)
    }
  }
}

export default tagsView
