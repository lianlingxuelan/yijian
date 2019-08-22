import http from '../plugin/axios/http'

export function getHome (queryUrl) {
  return http.get(`goods/homelist${queryUrl}`)
}
export function editHome (id) {
  return http.get(`goods/home/seetingParams/${id}`)
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
// 添加单页模板下架
export function offTheme (queryUrl) {
  return http.post(`goods/theme/off/${queryUrl}?sid`)
}
// 添加单页模板上架
export function onTheme (queryUrl) {
  return http.post(`goods/theme/on/${queryUrl}?sid`)
}
// 添加单页模板编辑与新增
export function editTheme (data) {
  return http.post(`goods/theme/save`, data)
}
// 添加单页模板检查重复
export function checkTheme (queryUrl) {
  return http.get(`goods/theme/check_themename/${queryUrl}?sid=`)
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
// 商品首页
export function getGoodsHome (id) {
  if (id !== 'new') {
    return http.get(`goods/home/${id}`)
  } else {
    return http.get(`goods/home`)
  }
}
export function saveHome (data) {
  return http.post(`goods/home/save`, { homeinfo: data })
}
export function requireDomain () {
  return http.get('my/domain')
}
