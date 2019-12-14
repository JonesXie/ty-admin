import request from '@/utils/request'
//获取线下审核状态
export function getUnderlineOrderState() {
    return request({
      url: '/pps/api-v1/Underlineorder/getUnderlineOrderState',
      method: 'get'
    })
}
//获取订单线下一审要审核的记录
export function getfirstChekcUnderLineOrders(data) {
    return request({
      url: '/pps/api-v1/Underlineorder/getfirstChekcUnderLineOrders',
      method: 'post',
      data
    })
}
//订单线下审核一审
export function doCheckFirst(data) {
    return request({
      url: '/pps/api-v1/Underlineorder/doCheckFirst',
      method: 'post',
      data
    })
}
//获取订单线下二审要审核的记录
export function getSecondChekcUnderLineOrders(data) {
    return request({
      url: '/pps/api-v1/Underlineorder/getSecondChekcUnderLineOrders',
      method: 'post',
      data
    })
}
//订单线下审核二审
export function doCheckSecond(data) {
    return request({
      url: '/pps/api-v1/Underlineorder/doCheckSecond',
      method: 'post',
      data
    })
}
//根据状态获取线下审核的记录
export function getUnderLineOrdersByState(data) {
  return request({
    url: '/pps/api-v1/Underlineorder/getUnderLineOrdersByState',
    method: 'post',
    data
  })
}
// ------------------------------------------------------------------
//获取退货记录状态
export function getPurchaseState() {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/getPurchaseState',
    method: 'get'
  })
}
//获取退货给公司的记录，一审
export function getReturnRecordsFromCompanyFistCheck(data) {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/getReturnRecordsFromCompanyFistCheck',
    method: 'post',
    data
  })
}
//一审action 用于一审的api
export function updatePurchaseReturnGoodsState(id, userid, ispass) {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/updatePurchaseReturnGoodsState/'+ id +'/' + userid + '/'+ ispass,
    method: 'get'
  })
}
//获取退货给公司的记录，二审
export function getReturnRecordsFromCompanySecondCheck(data) {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/getReturnRecordsFromCompanySecondCheck',
    method: 'post',
    data
  })
}
//二审action 用于二审的api
export function updatePurchaseReturnGoodsStateSecondCheck(id, userid, ispass) {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/updatePurchaseReturnGoodsStateSecondCheck/'+ id +'/' + userid + '/'+ ispass,
    method: 'get'
  })
}
//获取所有状态的退货的记录
export function getReturnRecordsFromCompanyAll(data) {
  return request({
    url: '/pps/api-v1/PurchaseReturnAdmin/getReturnRecordsFromCompanyAll',
    method: 'post',
    data
  })
}
// --------------------------------------------------------------
//获取开票记录的状态
export function getTaxRecordState() {
  return request({
    url: '/pps/api-v1/TaxAdmin/getTaxRecordState',
    method: 'get'
  })
}
//获取开票记录
export function getTaxRecords(data) {
  return request({
    url: '/pps/api-v1/TaxAdmin/getTaxRecords',
    method: 'post',
    data
  })
}
//开票审核
export function CheckTaxtRecordAction(data) {
  return request({
    url: '/pps/api-v1/TaxAdmin/CheckTaxtRecordAction',
    method: 'post',
    data
  })
}
//开票快递单号录入，即开票
export function DoingTaxtRecordAction(data) {
  return request({
    url: '/pps/api-v1/TaxAdmin/DoingTaxtRecordAction',
    method: 'post',
    data
  })
}
