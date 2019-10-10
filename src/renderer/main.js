import {
  remote,
  ipcRenderer,
} from 'electron'

const win = remote.getCurrentWindow()


/**
 * 
 * Titlebar, Menubar 꾸미기
 * 
 * 네이티브 메뉴와 타이틀바를 비활성화 시키고, HTMLElement로 대체합니다.
 * 각 Titlebar, Menubar 은 BrowserWindow 각자 관리할 수 있습니다.
 * 
 * menu-enable, menu-disable 이벤트를 활용하여 메뉴를 활성화/비활성화 시킬 수 있습니다.
 * 초기값은 비활성화입니다.
 * 
 */

import menuEnable from './menu/menuEnable'
import menuDisable from './menu/menuDisable'
import menuDispose from './menu/menuDispose'
import customTitlebar from './plugins/customElectronTitlebar'

win.on('menu-enable', menuEnable.bind(customTitlebar))
win.on('menu-disable', menuDisable.bind(customTitlebar))
win.on('close', menuDispose.bind(customTitlebar))


/**
 * 
 *  Vue 설정
 * 
 *  오류가 발생할 시, send-error 이벤트를 발생시킵니다.
 *  기타 Vue 모듈 사용을 설정합니다. (Vuetify, store, router)
 * 
 */

import Vue from 'vue'
import store from './store/store'
import router from './router/index'
import vuetify from './plugins/vuetify'

import App from './App'


Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.runtimeCompiler = true

// Send error
Vue.config.errorHandler = function (e) {

  let {
    message,
    stack
  } = e

  ipcRenderer.send('send-error', {
    message,
    stack
  })

  throw e

}

/* eslint-disable no-new */
new Vue({

  components: {
    App
  },
  template: '<App/>',

  store,
  router,
  vuetify,

}).$mount('#app')