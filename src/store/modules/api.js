
const api = {
    state: {
      menuApiRole: '',
      roleMenu: ''
    },
    mutations: {
      SET_MENUAPIROLE: (state, val) => {
          state.menuApiRole = val
      },
      SET_ROLEMENT: (state, val) => {
        state.roleMenu = val
      }
    },
    actions: {
      //当前修改的菜单
      SetMenuApiRole({ commit }, opt) {
          commit('SET_MENUAPIROLE', opt);
      },
      //当前修改的角色菜单
      SetRoleMenu({ commit }, opt) {
          commit('SET_ROLEMENT', opt);
      }
    }
  }
  export default api
