// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//修改build目录下的webpack.base.conf.js
import Vuex from 'vuex'
import 'style/reset.css'
import 'style/border.css'
import 'style/iconfont.css'
import App from './App'
import router from './router'
import store from './store'

//Swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
