import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import addr from './modules/address'
import api from './modules/api'
import proClass from './modules/proClass'
import stateType from './modules/stateType'

Vue.use(Vuex)

const state = {
  editorData: null
}
const mutations = {
  SET_EDITORDATA: (state, val) => {
    state.editorData = val
  }

}
const actions = {
  ChangeEditorData: ({
    commit
  }, val) => {
    commit('SET_EDITORDATA', val)
  }
}
const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    addr,
    stateType,
    api,
    proClass
  },
  getters,
  state,
  mutations,
  actions
})

export default store
