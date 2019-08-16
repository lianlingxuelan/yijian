import http from '../plugin/axios/http'

export const addApi = {
  getAddList: async (id) => { // 主要信息
    let url = `goods/add`
    if (id !== 'new') {
      url += `/` + id
    }
    return http.get(url)
  },
  add_linkspec: async (linkspec, type) => { // 抓取规格
    let url = `goods/get_specinfo?url=` + linkspec + `&type=` + type
    return http.get(url)
  },
  getDomainList: async () => { // 抓取规格
    let url = `my/domain/all/spa`
    return http.get(url)
  },
  getReclassify: async (data) => { // 获取子级分类
    let url = `config/goodstype/getchilds`
    return http.post(url, data)
  },
  getThemeList: async () => {
    let url = `goods/theme/json`
    return http.get(url)
  },
  getADcode: async (type) => {
    let url = `my/code/getall/` + type
    return http.get(url)
  },
  getServiceList: async (type) => {
    let url = `my/kf/all/` + type
    return http.get(url)
  },
  getDefaultService: async () => {
    let url = `user/option/`
    return http.get(url)
  },
  getPalpayList: async () => {
    let url = `config/paypal/all`
    return http.get(url)
  },
  getOnlineList: async () => {
    let url = `my/zxkf/all`
    return http.get(url)
  },
  getGoodsList: async (type) => {
    let url = `goods/my/json/` + (type || '默认分类')
    return http.get(url)
  },
  getImgTabs: async () => {
    let url = `goods/image/info`
    return http.get(url)
  },
  getImgList: async (tab, page) => {
    let url = `goods/image/json/` + tab + '/?page=' + (page || 1)
    return http.get(url)
  },
  edit_Goods: (goods) => {
    return http.post('goods/edit', { goods: goods })
  },
  add_Goods: (goods) => {
    return http.post('goods/add', { goods: goods })
  }
}
