import {
  Menu
} from 'electron'

import MAIN_MENUBAR from './vars/MENUBAR'


export default function enableMenu() {

  let menu

  menu = MAIN_MENUBAR()
  menu = Menu.buildFromTemplate(menu)

  this.setMenu(menu)

}