import request from '@/utils/request'
// 根据地址编码获取地区
export function fullname(regionCode) {
  return request({
    url: '/servhall/pubapi-v1/region/fullname/' + regionCode,
    method: 'get'
  })
}
// 获取省
export function regionProvinces() {
  return request({
    url: '/servhall/pubapi-v1/region/provinces',
    method: 'get'
  })
}
// 获取市
export function regionCities(provinceCode) {
  return request({
    url: '/servhall/pubapi-v1/region/province-' + provinceCode + '/cities',
    method: 'get'
  })
}
// 获取区
export function regionAreas(cityCode) {
  return request({
    url: '/servhall/pubapi-v1/region/city-' + cityCode + '/areas',
    method: 'get'
  })
}
// 根据地址编码获取地区
export function fullnames(data) {
  return request({
    url: '/servhall/pubapi-v1/region/fullnames',
    method: 'post',
    data
  })
}
