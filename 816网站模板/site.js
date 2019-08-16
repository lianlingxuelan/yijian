import http from "../plugin/axios/http";


//获取网站商城模板
export function getShopTheme (queryUrl) {
    return http.get(`/site/theme${queryUrl}`)
}
//编辑或新增网站商城模板
export function editShopTheme (data) {
    return http.post(`/site/theme/save`, data)
}
//上架网站商城模板
export function inShopTheme (queryUrl) {
    return http.post(`/site/theme/on${queryUrl}`)
}
//下架网站商城模板
export function outShopTheme (queryUrl) {
    return http.post(`/site/theme/off${queryUrl}`)
}
//检查网站模板名称是否重复
export function checkTheme (queryUrl) {
    return http.get(`/site/theme/check_themename/${queryUrl}`)
}
//删除网站模板
export function deleteTheme (queryUrl) {
    return http.post(`/site/theme/del${queryUrl}`)
}
//上架网站模板
export function getTheme (queryUrl) {
    return http.post(`/site/theme/on/:${queryUrl}`)
}