import http from '../plugin/axios/http'
const order = {
  getOrder: (type, data) => {
    let url = 'order/' + type + '/'
    if (data) {
      if (data.time && data.time.length && data.time[0] && data.time[1]) {
        url += `${data.OrderState}/${data.page}/?maxcount=${data.maxcount}&membername=${data.MemberName}&area=${data.Area}&stime=${data.time[0]}&etime=${data.time[1]}`
      } else url += `${data.OrderState}/${data.page}/?maxcount=${data.maxcount}&membername=${data.MemberName}&area=${data.Area}`
      if (data.Searchtype && data.Searchkey) {
        url += `&searchtype=${data.Searchtype}&searchkey=${data.Searchkey}`
      }
    } else {
      url += 'all'
    }
    return http.get(url)
  },
  confirm: (id) => {
    return http.get('order/confirm/' + id)
  },
  edit_orderState: (id, body) => {
    return http.post('order/edit_orderstate/' + id, body)
  },
  save_clientinfo: (id, clientinfo) => {
    return http.post('order/edit_clientinfo/' + id, { clientinfo: clientinfo })
  },
  set_invalid: (id) => {
    return http.get('order/toinvalid/' + id)
  },
  set_normal: (id) => {
    return http.get('order/tovalid/' + id)
  },
  add_blackinfo: (params) => {
    return http.post('order/blacklist/add', params)
  },
  updateMessage: (order) => {
    return http.get('order/updateClentinfo/' + order.clientip + '/' + order.orderid)
  },
  batchUpdateMessage: (orderlist) => {
    return http.post('order/updateClentinfo', { orderids: orderlist })
  },
  update_expressinfo: (id) => {
    return http.get('order/refresh/' + id)
  },
  edit_expressinfo: function (id, expressinfo) {
    return http.post('order/edit_expressinfo' + id, { expressinfo: expressinfo })
  },
  get_goodsspec: (orderid) => {
    return http.get('order/get_goodsspec/' + orderid)
  },
  edit_goodsinfo: (id, orderprice, goodsinfo) => {
    let url = 'order/edit_goodsinfo/' + id
    return http.post(url, { orderprice: orderprice, goodsinfo: goodsinfo })
  },
  get_repeatorderlist: (state, info) => {
    if (info.page) {
      return http.get('order/get_repeatorder/' + state + '/' + info.orderid + '/' + info.repeatid + '/' + info.clientip + '/' + info.clientphone + '/' + info.page)
    } else {
      return http.get('order/get_repeatorder/' + state + '/' + info.orderid + '/' + info.repeatid + '/' + info.clientip + '/' + info.clientphone)
    }
  },
  getRank: () => {
    return http.get('order/rank')
  },
  get_blackList: (queryUrl) => {
    return http.get(`order/blacklist${queryUrl}`)
  },
  del_blackList: (queryUrl) => {
    return http.get(`order/blacklist/del${queryUrl}`)
  },
  add_blackList: (data) => {
    return http.post(`order/blacklist/add`, data)
  },
  edit_blackList: (data) => {
    return http.post(`order/blacklist/edit`, data)
  },
  get_whiteList: (queryUrl) => {
    return http.get(`order/whitelist${queryUrl}`)
  },
  del_whiteList: (queryUrl) => {
    return http.get(`order/whitelist/del${queryUrl}`)
  },
  add_whiteList: (data) => {
    return http.post(`order/whitelist/add`, data)
  },
  edit_whiteList: (data) => {
    return http.post(`order/whitelist/edit`, data)
  },
  get_moneyList: (queryUrl) => {
    return http.get(`order/money${queryUrl}`)
  },
  upload_orderMoney: (data) => {
    return http.post(`/order/money/add/`, data)
  },
  checkExportPass: (pass) => {
    return http.get('order/valid/checkexportpass/' + pass)
  },
  exportAllOrder: (data) => {
    let url = ''
    if (data.time && data.time.length) {
      url = `${data.OrderState}/?searchtype=${data.Searchtype}&searchkey=${data.Searchkey}&stime=${data.time[0]}&etime=${data.time[1]}&area=${data.Area}&membername=${data.MemberName}&export=true`
    } else {
      url = `${data.OrderState}/?searchtype=${data.Searchtype}&searchkey=${data.Searchkey}&area=${data.Area}&membername=${data.MemberName}&export=true`
    }
    return http.get('order/valid/' + url)
  },
  importOrderidState: (stateList, orderstate) => {
    return http.post('order/update_orderstate', { stateList: stateList, orderstate: orderstate })
  },
  getSMSTemplate: () => {
    return http.get('config/smsTemplate')
  },
  sendSMS: (data) => {
    return http.post('config/sendSMS', data)
  }
}
export default order
