import http from '../plugin/axios/http'
// 用户权限
export function getYH (queryUrl) {
  return http.get(`/user/users${queryUrl}`)
}
// 编辑
export function editYH (data) {
  return http.post(`/user/edit`, data)
}
// 新增
export function addYH (data) {
  return http.post(`/user/add`, data)
}
// 客服指派
export function getKfList (params) {
  let url = `/user/kf/all/${params.Page}?maxcount=${params.MaxCount}&state=${params.State}`
  return http.get(url)
}
export function saveKf (config) {
  return http.post('/user/kf/save', config)
}
// 采購指派
export function getCgList (params) {
  let url = `/user/cg/all/${params.Page}?maxcount=${params.MaxCount}&state=${params.State}`
  return http.get(url)
}
export function saveCg (config) {
  return http.post('/user/cg/save', config)
}
