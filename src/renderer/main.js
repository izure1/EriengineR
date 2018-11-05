import Vue from 'vue'
import store from './store/store'

import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  store
}).$mount('#app')
