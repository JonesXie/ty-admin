import request from '@/utils/request'
//登陆
export function login(data, Token) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + Token
    },
    data
  })
}
//拉去验证码
export function captcha(data) {
  return request({
    url: '/login/get-captcha',
    method: 'post',
    data
  })
}
//verify
export function verify(data, Token) {
  return request({
    url: '/login/verify-captcha',
    method: 'post',
    transformRequest:[function(data) {
       data = JSON.stringify(data)
       return data
    }],
    headers: {
      'Authorization': "Bearer " + Token,
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getInfo(name) {
  //获取用户公开的信息，默认返回data顺序为userId、用户昵称、手机号、VIP、归属营业厅地区码
  return request({
    url: '/servhall/api-v1/userName:'+ name +'/public-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
