import path from 'path'
import electron from 'electron'

const win = electron.remote.getCurrentWindow()


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


let customElectronTitlebar
let customTitlebar


customElectronTitlebar = require('custom-electron-titlebar')

customTitlebar = new customElectronTitlebar.Titlebar({

  backgroundColor: customElectronTitlebar.Color.fromHex('#555'),
  icon: path.join(__static, 'assets/image/ico_eri_16.png').replace(/\\/g, '/')

})

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
import Vuetify from 'vuetify'
import store from './store/store'
import router from './router/index'

import App from './App'


Vue.config.productionTip = false
Vue.config.silent = true

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

  throw e

}


Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({

  components: {
    App
  },
  template: '<App/>',

  store,
  router,

  /*
   *  Vuetify Setting
   * 
   */
  vuetify: new Vuetify({
    theme: {
      dark: true
    }
  })

}).$mount('#app')