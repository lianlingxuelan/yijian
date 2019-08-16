import http from '../plugin/axios/http'
export default {
  getHomeData: () => {
    return http.get('home/index')
  },
  get_ordercount: (data) => {
    return http.get('home/get_ordercount/' + data)
  },
  get_goodsrank: (data) => {
    return http.get('home/get_goodsrank/' + data)
  },
  get_orderrank: (data) => {
    return http.get('home/get_orderrank/' + data)
  }
}
