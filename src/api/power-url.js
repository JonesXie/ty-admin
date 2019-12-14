import request from '@/utils/request'
// 菜单状态列表
export function getUrlState() {
  return request({
    url: '/pps/api-v1/url/getUrlState',
    method: 'get'
  })
}
// 菜单菜单类型
export function getMenuType() {
  return request({
    url: '/pps/api-v1/url/getMenuType',
    method: 'get'
  })
}
// 添加菜单
export function addUrl(data) {
  return request({
    url: '/pps/api-v1/url/addUrl',
    method: 'post',
    data
  })
}
// 更新菜单
export function updateUrl(data) {
  return request({
    url: '/pps/api-v1/url/updateUrl',
    method: 'post',
    data
  })
}
// 获取所有主菜单
export function getParentUrlList() {
  return request({
    url: '/pps/api-v1/url/getParentUrlList',
    method: 'get'
  })
}
// 启用菜单
export function openUrl(id) {
  return request({
    url: '/pps/api-v1/url/openUrl/' + id,
    method: 'post'
  })
}
// 停用菜单
export function closeUrl(id) {
  return request({
    url: '/pps/api-v1/url/closeUrl/' + id,
    method: 'post'
  })
}
// 分页获取所有的菜单（包括已经停用的）
export function getAllUrlList(data) {
  return request({
    url: '/pps/api-v1/url/getAllUrlList',
    method: 'post',
    data
  })
}
// 分页获取所有启用的菜单
export function getOpenUrlList(data) {
  return request({
    url: '/pps/api-v1/url/getOpenUrlList',
    method: 'post',
    data
  })
}
// 获取当前用户的菜单
export function getUserUrlList(data) {
  return request({
    url: '/pps/api-v1/url/getUserUrlList',
    method: 'post',
    data
  })
}
