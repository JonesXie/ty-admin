import request from '@/utils/request'
//初始化API，添加接口后手动调用
export function initApi() {
    return request({
        url: '/pps/api-v1/UrlApi/initApi',
        method: 'get'
    })
}
//Api状态列表
export function getApiState() {
    return request({
        url: '/pps/api-v1/UrlApi/getApiState',
        method: 'get'
    })
}
//Api状态列表
export function getSysType() {
    return request({
        url: '/pps/api-v1/url/getSysType',
        method: 'get'
    })
}
//获取所有的controller
export function getAllController(data) {
    return request({
        url: '/pps/api-v1/UrlApi/getAllController',
        method: 'post',
        data
    })
}
//分页获取所有的api
export function getApiPageList(data) {
    return request({
        url: '/pps/api-v1/UrlApi/getApiPageList',
        method: 'post',
        data
    })
}
//添加Api
export function addApi(data) {
    return request({
        url: '/pps/api-v1/UrlApi/addApi',
        method: 'post',
        data
    })
}
//修改Api
export function alterApi(data) {
    return request({
        url: '/pps/api-v1/UrlApi/alterApi',
        method: 'post',
        data
    })
}
//停用Api
export function closeApi(data) {
    return request({
        url: '/pps/api-v1/UrlApi/closeApi',
        method: 'post',
        data
    })
}
//启用Api
export function openApi(data) {
    return request({
        url: '/pps/api-v1/UrlApi/openApi',
        method: 'post',
        data
    })
}
//分页获取所有启用的菜单和api
export function getAllUrlApiPageList(data) {
    return request({
        url: '/pps/api-v1/UrlApi/getAllUrlApiPageList',
        method: 'post',
        data
    })
}
//修改子菜单下面的api
export function alterUrlApi(data) {
    return request({
        url: '/pps/api-v1/UrlApi/alterUrlApi',
        method: 'post',
        data
    })
}
