import path from 'path'

import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store/store'
import router from './router/index'

import App from './App'
import {
  ipcRenderer,
  remote
} from 'electron'


const {
  Menu,
  MenuItem
} = remote

const win = remote.getCurrentWindow()



Vue.config.productionTip = false
//Vue.config.silent = true

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
import MENU_BAR from '@/vars/MENUBAR'

let customTitlebar
let titlemenu

customTitlebar = require('custom-electron-titlebar')
customTitlebar = new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#555'),
  icon: path.join(__static, 'assets', 'image', 'ico_eri_16.png').replace(/\\/g, '/')
});



function menuEnable() {

  titlemenu = new Menu

  for (let item of MENU_BAR()) {
    titlemenu.append(new MenuItem(item))
  }

  customTitlebar.updateMenu(titlemenu)

}

function menuDisable() {

  titlemenu = new Menu
  customTitlebar.updateMenu(titlemenu)

}



win.on('menu-enable', menuEnable)
win.on('menu-disable', menuDisable)

win.emit('menu-disable')