import { getApiState, getSysType } from '@/api/power-apiUrl'
import { getPowerState, getOpenPowerList } from '@/api/power'
import { getUrlState, getMenuType } from '@/api/power-url'
import { getUserPowerState } from '@/api/power-user'
import { getOrderType, getOrderState } from '@/api/orderManage'
import { getUnderlineOrderState, getPurchaseState, getTaxRecordState } from '@/api/checkManage'
const stateType = {
  state: {
    UnderlineOrderState: '', // 审核状态
    PurchaseState: '', // 退货状态
    TaxRecordState: '', // 开票状态
    ApiState: '', // 接口状态
    PowerState: '', // 角色状态
    UrlState: '', // 菜单状态
    MenuType: '', // 菜单类型
    SysType: '', // 系统类型
    UserPowerState: '', // 用户状态
    OpenPowerList: '', // 获取所有启用角色
    OrderType: '', // 订单来源
    OrderState: '' // 订单状态
  },
  mutations: {
    SETORDERSTATE: (state, val) => {
      state.OrderState = val
    },
    SETORDERTYPE: (state, val) => {
      state.OrderType = val
    },
    SETUNDERLINEORDERSTATE: (state, val) => {
      state.UnderlineOrderState = val
    },
    SETPURCHASESTATE: (state, val) => {
      state.PurchaseState = val
    },
    SETTAXRECORDSTATE: (state, val) => {
      state.TaxRecordState = val
    },
    SETAPISTATE: (state, val) => {
      state.ApiState = val
    },
    SETPOWERSTATE: (state, val) => {
      state.PowerState = val
    },
    SETURLSTATE: (state, val) => {
      state.UrlState = val
    },
    SETMENUTYPE: (state, val) => {
      state.MenuType = val
    },
    SETSYSTYPE: (state, val) => {
      state.SysType = val
    },
    SETUSERPOWERSTATE: (state, val) => {
      state.UserPowerState = val
    },
    SETOPENPOWERLIST: (state, val) => {
      state.OpenPowerList = val
    }
  },
  actions: {
    // 获取订单状态
    GETOrderState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.OrderState) return resolve(state.OrderState)
        getOrderState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETORDERSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取订单来源
    GETOrderType({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.OrderType) return resolve(state.OrderType)
        getOrderType().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETORDERTYPE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取所有启用角色
    GETOpenPowerList({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.OpenPowerList) return resolve(state.OpenPowerList)
        getOpenPowerList().then((res) => {
          const dataArry = []
          res.data.forEach(element => {
            dataArry.push({
              value: element.power,
              label: element.info
            })
          })
          commit('SETOPENPOWERLIST', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取用户状态
    GETUserPowerState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.UserPowerState) return resolve(state.UserPowerState)
        getUserPowerState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETUSERPOWERSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    GETSysType({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.SysType) return resolve(state.SysType)
        getSysType().then((res) => {
          let dataArry = []
          for (const key in res.data) {
            dataArry.push(res.data[key])
          }
          dataArry = Array.from(new Set(dataArry))
          commit('SETSYSTYPE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取菜单状态
    GETMenuType({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.MenuType) return resolve(state.MenuType)
        getMenuType().then((res) => {
          const dataArry = []
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETMENUTYPE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取菜单状态
    GETUrlState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.UrlState) return resolve(state.UrlState)
        getUrlState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETURLSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取角色状态
    GETPowerState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.PowerState) return resolve(state.PowerState)
        getPowerState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETPOWERSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取接口状态
    GETApiState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.ApiState) return resolve(state.ApiState)
        getApiState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETAPISTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取审核状态
    GETUnderlineOrderState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.UnderlineOrderState) return resolve(state.UnderlineOrderState)
        getUnderlineOrderState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETUNDERLINEORDERSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取退货状态
    GETPurchaseState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.PurchaseState) return resolve(state.PurchaseState)
        getPurchaseState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETPURCHASESTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    },
    // 获取开票状态
    getTaxRecordState({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.TaxRecordState) return resolve(state.TaxRecordState)
        getTaxRecordState().then((res) => {
          const dataArry = [{
            value: '',
            label: '全部'
          }]
          for (const key in res.data) {
            dataArry.push({
              value: parseInt(key),
              label: res.data[key]
            })
          }
          commit('SETTAXRECORDSTATE', dataArry)
          resolve(dataArry)
        }).catch((res) => { reject(res) })
      })
    }
  }
}

export default stateType
