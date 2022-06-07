import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/plugins/i18n'

// axios
import api from './api'
Vue.prototype.$api = new api()

// utils
import util from './utils/utils'
Vue.use(util)
import champions from './utils/champions'
Vue.use(champions)

// 전역 사용자 정의 디렉티브 v-click-outside 등록
import clickOutside from 'vue-click-outside'
Vue.directive("clickOutside", clickOutside)


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

Vue.config.productionTip = false
