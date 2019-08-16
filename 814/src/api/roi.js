import http from '../plugin/axios/http'
export default {
  getRoi: (data) => {
    return http.get('order/roi/' + data.Month + '?maxcount=12&membername=' + data.MemberName + '&money=' + data.Money)
  },
  save_params: (RoiParams) => {
    return http.post('order/roi/save_params', { RoiParams: RoiParams })
  },
  save_auth: (auth) => {
    return http.post('order/roi/save_auth', { auth: auth })
  },
  save_roiinfo: (data) => {
    return http.post('order/roi', { roiinfo: data })
  },
  get_orderamount: (username, date, money) => {
    return http.get('order/roi/orderamount?money=' + money + '&membername=' + username + '&date=' + date)
  },
  getDayReport: (data) => {
    return http.get('order/roi/yesterday/' + data.Month + '/?maxcount=12&membername=' + data.MemberName + '&money=' + data.Money)
  },
  getMonthReport: (data) => {
    return http.get('order/roi/month/' + data.Month + '/?maxcount=12&membername=' + data.MemberName + '&money=' + data.Money)
  },
  getAccountSpend: (data) => {
    return http.get('order/roi/month_report/' + data.Month + '/?maxcount=12&membername=' + data.MemberName + '&money=' + data.Money)
  }
}
