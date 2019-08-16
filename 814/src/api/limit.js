import http from '../plugin/axios/http'
// IP限制
export function limitdata (queryUrl) {
  return http.get(`config/limit${queryUrl}`)
}
// 新增
export function addlimit (data) {
  return http.post(`config/limit/add/`, data)
}
// 编辑
export function editlimit (data) {
  return http.post(`/config/limit/edit`, data)
}
// 删除
export function dellimit (queryUrl) {
  return http.get(`/config/limit/del${queryUrl}`)
}
