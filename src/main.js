import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization

import '@/styles/index.scss' // global css
import '@/utils/directive'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import config from '@/config'
// if (process.env.NODE_ENV === 'development')
// require('./mock/index')

Vue.use(Element, {
  // size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
Vue.use(config.install)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
