import request from '@/utils/request'
// 快递公司添加接口
export function addExpressCompany(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/addExpressCompany',
    method: 'post',
    data
  })
}
// 获取快递公司
export function getExpressCompay(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/getExpressCompay',
    method: 'post',
    data
  })
}
// 修改快递公司状态
export function updateExpressEnable(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/updateExpressEnable',
    method: 'post',
    data
  })
}
// 删除快递公司
export function removeExPressCompany(id, userid) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/removeExPressCompany/' + id + '/' + userid,
    method: 'get'
  })
}
// 添加快递模板
export function expressModesAdd(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/expressModesAdd',
    method: 'post',
    data
  })
}
// 获取本人的快递模板
export function getExpressModels(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/getExpressModels',
    method: 'post',
    data
  })
}
// 修改本人的快递模板
export function updateExpressModels(data) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/updateExpressModels',
    method: 'post',
    data
  })
}
// 删除快递模板
export function removeExpress(userid, id) {
  return request({
    url: '/pps/api-v1/ExpressAdmin/removeExpress?userid=' + userid + '&id=' + id,
    method: 'post'
  })
}
//  获取产品价格附表记录
export function getAllProduct_price_typeinfo() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getAllProduct_price_typeinfo',
    method: 'get'
  })
}
//  35.删除产品价格附表记录
export function deleteProductPriceTypeInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/deleteProductPriceTypeInfo?id=' + data,
    method: 'get'
  })
}

//  34.修改产品价格附表系统类型记录
export function updateProductPriceTypeInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateProductPriceTypeInfo',
    method: 'post',
    data
  })
}

//  33.添加产品价格附表系统类型
export function addProductPriceTypeInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addProductPriceTypeInfo',
    method: 'post',
    data
  })
}

//  37.添加产品附表价格
export function addProductPrice_spe(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addProductPrice_spe',
    method: 'post',
    data
  })
}

//  38.修改产品附表价格记录
export function updateProductPrice_spe(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateProductPrice_spe',
    method: 'post',
    data
  })
}

//  39.删除产品附表价格记录
export function deleteProductPrice_spe(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/deleteProductPrice_spe?id=' + data,
    method: 'get'
  })
}
//  40.分页获取产品附表价格记录
export function getproduct_price_spe_byPages(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getproduct_price_spe_byPages',
    method: 'post',
    data
  })
}
//  41.获取附表价格状态
export function getPriceSys_state() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getPriceSys_state',
    method: 'get'
  })
}
//  42.获取附表系统类型
export function getPriceSys_SysType() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getPriceSys_SysType',
    method: 'get'
  })
}
//  43.获取附表对应的用户身份数据
export function getPriceSys_usertype() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getPriceSys_usertype',
    method: 'get'
  })
}
