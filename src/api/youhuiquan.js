import request from '@/utils/request'
import qs from 'qs'

// 添加优惠券
export function addCardInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/addCardInfo',
    method: 'post',
    data
  })
}
// 获取优惠券范围
export function getCardFw() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getCardFw',
    method: 'get'
  })
}
// 获取优惠券状态
export function getCardInfoState() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getCardInfoState',
    method: 'get'
  })
}
// 获取优惠券类型
export function getCardType() {
  return request({
    url: '/pps/api-v1/ProductAdmin/getCardType',
    method: 'get'
  })
}
// 获取优惠券列表
export function getCardList(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getCard_InfoPage',
    method: 'post',
    data
  })
}
// 删除购物券
export function deleteCardInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/deleteCardInfo',
    method: 'post',
    data
  })
}
// 修改购物券
export function updateCardInfo(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/updateCardInfo',
    method: 'post',
    data
  })
}
// 获取单个优惠券
export function getInfoSingle(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getInfoSingle',
    method: 'post',
    data
  })
}
// 获取领取的购物券记录
export function getUserCard(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getUserCard',
    method: 'post',
    data
  })
}
// 获取某购物券领取数量信息
export function getCardCountInfos(data) {
  return request({
    url: '/pps/api-v1/ProductAdmin/getCardCountInfos',
    method: 'post',
    data
  })
}

// 根据商品produtid数组获取商品信息
export function GetProductByIds(data) {
  return request({
    url: '/pps/api-v1/product/GetProductByIds',
    method: 'post',
    data
  })
}

// 通过第三级proClassSort数组集合，获取这个proClassSort对应的三级的集合
export function getProClassThree(data) {
  return request({
    url: '/pps/api-v1/product/getProClassThree',
    method: 'post',
    data
  })
}

