import Vue from 'vue'

import d2Container from './d2-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-quill', () => import('./d2-quill'))
Vue.component('m-table', () => import('./m-table'))
Vue.component('m-table-button', () => import('./m-table/m-table-button'))
Vue.component('m-edit-dialog', () => import('./m-table/m-edit-dialog'))
Vue.component('m-tabs', () => import('./m-tabs'))
Vue.component('m-permission', () => import('./m-permission'))
