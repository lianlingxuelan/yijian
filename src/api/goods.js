import http from '../plugin/axios/http'

export function getHome (queryUrl) {
  return http.get(`goods/homelist${queryUrl}`)
}
export function editHome (data) {
  return http.post(`goods/home/edit`, data)
}
export function outHome (queryUrl) {
  return http.get(`goods/home/off${queryUrl}`)
}
export function inHome (queryUrl) {
  return http.get(`goods/home/on${queryUrl}`)
}
export function getReport (queryUrl) {
  return http.get(`goods/report${queryUrl}`)
}
export function getGoodsList (queryUrl) {
  return http.get(`goods/manager/${queryUrl}`)
}
export function getStats (queryUrl) {
  return http.get(`goods/stats${queryUrl}`)
}
export function getTheme (queryUrl) {
  return http.get(`goods/theme${queryUrl}`)
}
export function copyGoods (id) {
  return http.get(`/goods/copy/${id}`)
}
export function delGoods (id) {
  return http.get(`/goods/del/${id}`)
}
export function onGoods (id) {
  return http.get(`/goods/on/${id}`)
}
export function offGoods (id) {
  return http.get(`/goods/off/${id}`)
}
export function getComment (id) {
  return http.get(`/goods/comment/${id}`)
}
export function addComment (comment) {
  return http.post(`/goods/comment`, comment)
}
export function delComment (id) {
  return http.get(`/goods/comment/del/${id}`)
}
export function editComment (comment) {
  return http.post(`/goods/comment/edit`, comment)
}
