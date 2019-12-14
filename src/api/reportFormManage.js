import request from '@/utils/request'
//获取库存信息报表
export function getInventoryInventExCell(data) {
  return request({
    url: '/pps/api-v1/ExcellReport/getInventoryInventExCell',
    method: 'post',
    data
  })
}
//库存信息报表导出
export function exportProInventBook() {
  return '/pps/api-v1/ExcellReport/exportProInventBook'
}
//获取订单报表
export function getOrderReportExcellAdminByTime(data) {
  return request({
    url: '/pps/api-v1/ExcellReport/getOrderReportExcellAdminByTime',
    method: 'post',
    data
  })
}
//获取订单报表，这里的报表都是根据检索条件的所有记录
export function exportOrderBook() {
  return '/pps/api-v1/ExcellReport/exportOrderBook'
}

// 分时获取产品销售数量
export function getOrderSalesByTime(data) {
  return request({
    url: '/pps/api-v1/ExcellReport/getOrderSalesByTime',
    method: 'post',
    data
  })
}
