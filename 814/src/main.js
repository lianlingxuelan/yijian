// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
import res from './res'
// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import VueClipboard from 'vue-clipboard2'
import D2Crud from '@d2-projects/d2-crud'
import VueNativeSock from 'vue-native-websocket'
// import VCharts from 'v-charts'
import Moment from 'moment'

// e-chart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(VueNativeSock, (process.env.NODE_ENV === 'development' ? 'ws://' : 'wss://') + '127.0.0.1:8989' + '/api/' + 'go5OwZ1vcTUlGPtlVpZJug_7gblHwN40', {
  format: 'json',
  reconnection: true
})
// 核心插件
Vue.prototype.$moment = Moment
Vue.prototype.$appversion = process.env.VUE_APP_VERSION
Vue.prototype.$Api_Url = ''
// Vue.prototype.$Api_Url = process.env.VUE_APP_API_URL //api和前端不同域名时候使用
// Vue.use(VCharts)
Vue.use(d2Admin)
Vue.use(D2Crud)
Vue.use(VueClipboard)
Vue.use(res)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
