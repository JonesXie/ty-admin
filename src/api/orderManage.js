import request from '@/utils/request'
// 获取待发货订单
export function getOrderPending(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getOrderPending',
    method: 'post',
    data
  })
}
// 订单发货
export function SendGoodsAction(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/SendGoodsAction',
    method: 'post',
    data
  })
}
// 已发货的订单
export function getOrderShipped(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getOrderShipped',
    method: 'post',
    data
  })
}
// 已收货的订单
export function getAcceptedOrder(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getAcceptedOrder',
    method: 'post',
    data
  })
}
// 订单来源状态
export function getOrderType() {
  return request({
    url: '/pps/api-v1/Order/getOrderType',
    method: 'get'
  })
}
// 订单state
export function getOrderState() {
  return request({
    url: '/pps/api-v1/Order/getOrderState',
    method: 'get'
  })
}
// 获取公司要发货的区县服务中心订单-admin
export function getCompanyOrders(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getCompanyOrders',
    method: 'post',
    data
  })
}
// 公司发货给区县中心，或者个人
export function CompanyOrderSend(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/CompanyOrderSend',
    method: 'post',
    data
  })
}
// 获取公司要修改的订单物流信息
export function getCompanySerchModifyOrderExpressInfos(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getCompanySerchModifyOrderExpressInfos',
    method: 'post',
    data
  })
}
// 获取公司修改物流信息的记录
export function getCompanyUpdateOrderExpressLogs(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getCompanyUpdateOrderExpressLogs',
    method: 'post',
    data
  })
}

// 获取公司修改物流信息的记录
export function updateOrderExpress(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/updateOrderExpress',
    method: 'post',
    data
  })
}

// 修改订单实时地址
export function updateOrderActualAddress(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/updateOrderActualAddress',
    method: 'post',
    data
  })
}

// 获取公司的修改订单实时地址的日志记录
export function getCompanyUpdateOrderAddressLogs(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getCompanyUpdateOrderAddressLogs',
    method: 'post',
    data
  })
}

// 获取退货记录
export function getCompanyRefundOrderRecords(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/getCompanyRefundOrderRecords',
    method: 'post',
    data
  })
}
// 退货第一步
export function checkIsRefundOrJJ(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/checkIsRefundOrJJ',
    method: 'post',
    data
  })
}
// 退货第二步
export function companyIsGetGooods(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/companyIsGetGooods',
    method: 'post',
    data
  })
}
// 退货第三步
export function lookRefundEvidence(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/lookRefundEvidence',
    method: 'post',
    data
  })
}
// 退货第四步
export function finishRefundOrders(data) {
  return request({
    url: '/pps/api-v1/OrderAdmin/finishRefundOrders',
    method: 'post',
    data
  })
}
