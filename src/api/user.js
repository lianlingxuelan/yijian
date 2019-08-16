import http from '@/plugin/axios/http'

export default {
  getLData: (page) => {
    return http.get('user/role/' + page)
  },
  addData: (fr) => {
    return http.post('user/role/save/', fr)
  },
  removeData: (id) => {
    return http.get('user/role/del/' + id)
  }
}
