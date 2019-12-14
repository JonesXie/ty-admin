import request from '@/utils/request'
// 产品单位添加
export function addUnite(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addUnite',
    method: 'post',
    data
  })
}
// 获取所有单位
export function getAllUnites() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getAllUnites',
    method: 'get'
  })
}
// 添加产品
export function addProduct(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addProduct',
    method: 'post',
    data
  })
}
// 根据id获取修改产品详情，用于显示待修改产品信息
export function getproductInfo(userid, id) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getproductInfo/' + userid + '/' + id,
    method: 'get'
  })
}
// 修改产品
export function updateProduct(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateProduct',
    method: 'post',
    data
  })
}
// 删除产品
export function deletePro(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/deletePro',
    method: 'post',
    data
  })
}
// 获取自己添加的产品集合
export function getProductAdminPages(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getProductAdminPages',
    method: 'post',
    data
  })
}
// 7.添加属性
export function addAttr(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addAttr',
    method: 'post',
    data
  })
}
// 删除属性
export function removeAtrr(id) {
  return request({
    url: '/pps/api-v1/ProductAdmin/removeAtrr/' + id,
    method: 'get'
  })
}
// 获取三级类目下的属性+公有属性
export function getAttrByProClass(proclas) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getAttrByProClass/' + proclas,
    method: 'get'
  })
}
// 添加属性值
export function addAttrbuteValue(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addAttrbuteValue',
    method: 'post',
    data
  })
}
// 删除属性值
export function removeAttributeValue(id) {
  return request({
    url: '/pps/api-v1/ProductAdmin/removeAttributeValue/' + id,
    method: 'get'
  })
}
// 获取属性值通过属性id
export function getArrributeValueByAttrId(id) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getArrributeValueByAttrId/' + id,
    method: 'get'
  })
}
// 批量添加属性，属性值
export function addAttrbuteAndValues(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addAttrbuteAndValues',
    method: 'post',
    data
  })
}
// 修改属性
export function updateAttr(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateAttr',
    method: 'post',
    data
  })
}
// 修改属性值
export function updateAttrValue(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateAttrValue',
    method: 'post',
    data
  })
}
// 获取一级分类
export function getFirstProClass() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getFirstProClass',
    method: 'get'
  })
}
// 通过一级分类proclassSort获取二级分类
export function getSecondProClass(proClass) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getSecondProClass/' + proClass,
    method: 'get'
  })
}
// 通过二级分类proclass_Sort获取三级分类
export function getThirdProClass(proClass) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getThirdProClass/' + proClass,
    method: 'get'
  })
}
// 通过三级分类获取属性和属性对应的集合
export function getAttrbuteAndAttrbuteValuesByProClass(proClassId) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getAttrbuteAndAttrbuteValuesByProClass/' + proClassId,
    method: 'get'
  })
}
// 上传图片
export function upload(data) {
  return request({
    // url: '/common/api-v1/image/user/upload',
    url: '/pps/api-v1/user/upload', // 测试服务器
    // url: '/api-v1/user/upload', // 郭浩接口
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
// 根据产品ID，获取
export function getProductDetailby(id) {
  return request({
    url: '/pps/api-v1/product/getProductDetailby/' + id,
    method: 'get'
  })
}
// 根据地址编码获取地区
export function fullname(regionCode) {
  return request({
    url: '/servhall/pubapi-v1/region/fullname/' + regionCode,
    method: 'get'
  })
}

// 添加产品分类接口
export function addProClass(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addProClass',
    method: 'post',
    data
  })
}

// 修改产品分类接口
export function updateProClass(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateProClass',
    method: 'post',
    data
  })
}

// 44.删除商品分类
export function removeProClass(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/removeProClass?id=' + data,
    method: 'get'
  })
}
