import electron from 'electron'
import MENU_BAR from './vars/MENUBAR'

export default function () {

  let menu

  menu = MENU_BAR()
  menu = electron.remote.Menu.buildFromTemplate(menu)

  return menu

}