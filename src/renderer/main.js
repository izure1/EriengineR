import Vue from 'vue'
import store from './store/store'
import router from './router/index'

import App from './App'

Vue.config.productionTip = false
//Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  store,
  router
}).$mount('#app')