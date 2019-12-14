import {
  getCardFw,
  getCardInfoState,
  getCardType
} from '@/api/youhuiquan.js'
import {
  getPriceSys_SysType,
  getPriceSys_usertype,
  getPriceSys_state
} from '@/api/setting.js'

// 时间转化
function add0(m) {
  return m < 10 ? '0' + m : m
}
export function changeTime(val) {
  const now = new Date(val)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hour) + ':' + add0(minute) + ':' + add0(second)
}

// 空值验证
export function notNull(val) {
  if ([undefined, null, ''].includes(val)) {
    return false
  } else if (JSON.stringify(val) === '{}') {
    return false
  } else {
    return true
  }
}

// 返回优惠券范围
export function returnCardFw(callback) {
  const returnData = {}
  getCardFw().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}
// 返回优惠券状态
export function returnCardInfoState(callback) {
  const returnData = {}
  getCardInfoState().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}
// 返回优惠券类型
export function returnCardType(callback) {
  const returnData = {}
  getCardType().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}

// 设置 -价格辅表
//  返回系统类型
export function returnSysType(callback) {
  const returnData = {}
  getPriceSys_SysType().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}
//  返回用户身份类型
export function returnUserType(callback) {
  const returnData = {}
  getPriceSys_usertype().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}

//  返回状态
export function returnSysState(callback) {
  const returnData = {}
  getPriceSys_state().then(({
    data
  }) => {
    Object.assign(returnData, data)
    if (typeof callback === 'function') {
      callback(returnData)
    }
  })
  return returnData
}
