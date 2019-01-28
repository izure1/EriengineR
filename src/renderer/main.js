import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store/store'
import router from './router/index'

import App from './App'
import electron from 'electron'

Vue.config.productionTip = false
//Vue.config.silent = true

// Send error
Vue.config.errorHandler = function (e) {

  let {
    message,
    stack
  } = e

  electron.ipcRenderer.send('send-error', {
    message,
    stack
  })

}

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  template: '<App/>',
  store,
  router
}).$mount('#app')