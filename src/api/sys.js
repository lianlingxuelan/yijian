import http from '../plugin/axios/http'

export function getSMS (queryUrl) {
  return http.get(`/config/smsTemplate${queryUrl}`)
}
export function saveSMS (data) {
  return http.post(`/config/smsTemplate/save`, data)
}
export function delSMS (queryUrl) {
  return http.get(`/config/smsTemplate/del${queryUrl}`)
}
export function getNotice () {
  return http.get(`config/notice`)
}
export function saveNotice (data) {
  return http.post(`config/notice/edit`, data)
}
export function delNotice (queryUrl) {
  return http.get(`config/notice/del/${queryUrl}`)
}
// export function e (data) {
//   return request({
//     url: `/goods/home/edit`,
//     method: 'post',
//     data
//   })
// }

export const getConfig = () => {
  return http.get('config/basic')
}
export function getlanguagedata (queryUrl) {
  return http.get(`/config/lang${queryUrl}`)
}
// 删除
export function dellanguagedata (data) {
  return http.get(`/config/lang/del${data}`)
}
// 添加
export function addlanguagedata (data) {
  return http.post(`/config/lang/add`, data)
}
// 修改
export function editlanguagedata (data) {
  return http.post(`/config/lang/all`, data)
}
export const saveConfig = (type, data) => {
  return http.post(`config/basic/${type}`, data)
}
export default {
  // 商品分类管理
  addType: (data) => {
    return http.post('/config/goodstype/add', { config: data })
  },
  editType: (data) => {
    return http.post('/config/goodstype/edit', { config: data })
  },
  delType: (data) => {
    return http.post('/config/goodstype/del', { config: data })
  },
  getTypeList: function (config) {
    return http.post('/config/goodstype/getchilds/', config)
  },
  //    电话规则管理
  getRules: function () {
    return http.get('/config/tel_rules')
  },
  saveRule: function (config) {
    return http.post('/config/tel_rules', { rules: config })
  }

}

export const getTelRules = () => {
  return http.get('config/tel_rules')
}
