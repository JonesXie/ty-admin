import request from '@/utils/request'
//1.用户状态列表
export function getUserPowerState() {
    return request({
        url: '/pps/api-v1/userpower/getUserPowerState',
        method: 'get'
    })
}
//添加用户角色
export function addUserPower(data) {
    return request({
        url: '/pps/api-v1/userpower/addUserPower',
        method: 'post',
        data
    })
}
//删除用户角色
export function deleteUserPower(data) {
    return request({
        url: '/pps/api-v1/userpower/deleteUserPower',
        method: 'post',
        data
    })
}
//激活用户登录
export function openUserPower(data) {
    return request({
        url: '/pps/api-v1/userpower/openUserPower',
        method: 'post',
        data
    })
}
//4.禁止用户登录
export function stopUserPower(data) {
    return request({
        url: '/pps/api-v1/userpower/stopUserPower',
        method: 'post',
        data
    })
}
//修改用户角色
export function alterUserPower(data) {
    return request({
        url: '/pps/api-v1/userpower/alterUserPower',
        method: 'post',
        data
    })
}
//获取用户角色列表
export function getUserPowerList(data) {
    return request({
        url: '/pps/api-v1/userpower/getUserPowerList',
        method: 'post',
        data
    })
}
