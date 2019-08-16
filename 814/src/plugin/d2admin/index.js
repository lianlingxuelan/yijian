// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 组件
import '@/components'
// bus
import Vue from 'vue'

// 功能插件
import pluginError from '@/plugin/error'
import pluginLog from '@/plugin/log'
import pluginOpen from '@/plugin/open'

const Bus = new Vue()
export default {
  async install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    // bus
    Vue.prototype.$bus = Bus
    // Element
    Vue.use(ElementUI)
    // 插件
    Vue.use(pluginError)
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
  }
}
