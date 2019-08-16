import http from '../plugin/axios/http'
const service = {
  ptconfig: () => {
    let url = 'baseinfo/ptconfig'
    return http.get(url)
  },
  get_userinfo: () => {
    return http.get('baseinfo/userinfo')
  }
}
export default service
