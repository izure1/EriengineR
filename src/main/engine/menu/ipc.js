import electron from 'electron'

import enableMenu from './enableMenu'
import disableMenu from './disableMenu'

// SETTING
import MAIN_MENUBAR from './vars/MENUBAR'
import CONTEXTBAR from './vars/CONTEXTBAR'

const Menu = electron.Menu

export default function ipc (win) {
  let menu

  electron.ipcMain.on('menu-enable', function () {
    menu = enableMenu(MAIN_MENUBAR())
    menu = Menu.buildFromTemplate(menu)
    menu = Menu.setApplicationMenu(menu)
  })

  electron.ipcMain.on('menu-disable', function () {
    menu = disableMenu(MAIN_MENUBAR())
    menu = Menu.buildFromTemplate(menu)
    menu = Menu.setApplicationMenu(menu)
  })
};
