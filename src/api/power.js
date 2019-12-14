import request from '@/utils/request'
//角色状态列表
export function getPowerState() {
    return request({
        url: '/pps/api-v1/PowerUrl/getPowerState',
        method: 'get'
    })
}
//添加角色
export function addPower(data) {
    return request({
        url: '/pps/api-v1/PowerUrl/addPower',
        method: 'post',
        data
    })
}
//修改角色说明
export function updatePower(data) {
    return request({
        url: '/pps/api-v1/PowerUrl/updatePower',
        method: 'post',
        data
    })
}
//起用角色
export function openPower(power) {
    return request({
        url: '/pps/api-v1/PowerUrl/openPower/' + power,
        method: 'post'
    })
}
//停用角色
export function closePower(power) {
    return request({
        url: '/pps/api-v1/PowerUrl/closePower/' + power,
        method: 'post'
    })
}
//获取所有角色（包括停用的）
export function getAllPowerList() {
    return request({
        url: '/pps/api-v1/PowerUrl/getAllPowerList',
        method: 'get'
    })
}
//获取所有启用的角色
export function getOpenPowerList() {
    return request({
        url: '/pps/api-v1/PowerUrl/getOpenPowerList',
        method: 'get'
    })
}
//分页获取所有角色所拥有的子菜单
export function getPowerUrlList(data) {
    return request({
        url: '/pps/api-v1/PowerUrl/getPowerUrlList',
        method: 'post',
        data
    })
}
//修改角色的菜单
export function alterPowerUrl(data) {
    return request({
        url: '/pps/api-v1/PowerUrl/alterPowerUrl',
        method: 'post',
        data
    })
}
