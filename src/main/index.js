import os from 'os'
import fs from 'fs-extra'
import url from 'url'
import path from 'path'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'


/* -------------------------------------------------------------------------------------- */


/**
 * 
 * 
 *  환경설정
 *  현재 환경이 development 일 경우에 전역변수에 devmode를 활성화시킵니다.
 *  아닐 경우, static 전역변수를 활성화시킵니다
 * 
 */


let mainWindow, mainURL
let variables

switch (process.env.NODE_ENV) {

  case 'development':
    global.__devmode = true
    break;

    /**
     * Set `__static` path to static files in production
     * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
     */
  default:
    global.__devmode = false
    global.__static = path.join(__dirname, 'static').replace(/\\/g, '\\\\')
    break;

}


mainURL = global.__devmode ?

  url.format({
    protocol: 'http',
    hostname: 'localhost',
    pathname: '/',
    port: 9080
  }) :

  url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'index.html')
  })


// Main/Renderer 에서 공용으로 사용될 변수입니다
// 이는 variables/ipc 을 이용하여 두 프로세스간 get/set 할 수 있습니다
variables = {

  project: {
    directory: null,
    information: {}
  },

  macro: null,
  script: null,

}



/* -------------------------------------------------------------------------------------- */


/**
 * 
 * 엔진 초기화 및 실행
 * 
 * 사용자의 정보(최근 프로젝트, 이메일)등을 저장하는 디렉토리를 생성합니다.
 * 기본적으로 생성되는 위치는 %appdata% 입니다.
 * 
 */


let HOME = os.homedir() // %appdata%


import initor from './init/initor'
import {
  watch
} from 'melanke-watchjs'

async function start() {

  variables.engine = await initor.init(HOME)
  variables.user = await initor.getUserData(variables.engine.user)


  // 사용자 정보가 변경되면 자동으로 이를 감지하여 user.json 파일에 갱신합니다
  watch(variables.user, () => {
    fs.writeJSONSync(variables.engine.user, variables.user, {
      spaces: 2
    })
  }, 0, true)


  await runEngine()

}


async function runEngine() {

  // 앱 실행
  createWindow()

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })

  return

}



import getResolvedURI from '@static/js/getResolvedURI'

async function createWindow() {

  mainWindow = new BrowserWindow({
    height: 670,
    width: 1000,
    resizable: false,
    icon: path.join(__dirname, '../assets/image/ico.ico'),
    webPreferences: {
      webSecurity: false
    }
  })

  mainURL = getResolvedURI(mainURL)
  mainWindow.loadURL(mainURL)
  mainWindow.setMenu(null)
  mainWindow.focus()


  // 메인 윈도우 프레임에 변수를 할당합니다
  mainWindow.variables = variables

  mainWindow.on('project-open', () => {
    ipcMain.emit('menu-enable')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  runIPC()

}




// Electron 에서 사용자의 Gesture를 입력받기전에 Audio가 재생되지 않는 WebPolicy 문제점을 해결하기 위한 임시방편
// Electron 에서 추후 이 기능을 지원한다면 아래 커맨드 라인은 삭제되어야 합니다
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
// 앱을 크롬 inspect 와 연결하여 디버깅합니다
app.commandLine.appendSwitch('inspect', '5858')

// 앱이 준비되면 실행합니다
app.on('ready', start)



/* -------------------------------------------------------------------------------------- */


/**
 * 
 *  Set EventListeners
 * 
 */


import ipc_createProject from './project/createProject'
import ipc_openProject from './project/openProject'

import ipc_delete from './modal/delete'
import ipc_deleteTrash from './modal/deleteTrash'
import ipc_openModal from './modal/openModal'

import ipc_getVariables from './variables/getVariables'
import ipc_setVariables from './variables/setVariables'

import ipc_catchError from './terminal/catchError'
import ipc_sendError from './terminal/sendError'
import ipc_sendOutput from './terminal/sendOutput'

import ipc_enableMenu from './menu/enableMenu'
import ipc_disableMenu from './menu/disableMenu'

import ipc_createMacro from './macro/createMacro'
import ipc_clearMacro from './macro/clearMacro'
import ipc_getMacro from './macro/getMacro'


function runIPC() {

  // Project
  ipcMain.on('project-create', ipc_createProject.bind(mainWindow))
  ipcMain.on('project-open', ipc_openProject.bind(mainWindow))

  // Modal
  ipcMain.on('modal-open-sync', ipc_openModal.bind(mainWindow))
  ipcMain.on('modal-delete', ipc_delete.bind(mainWindow))
  ipcMain.on('modal-delete-trash', ipc_deleteTrash.bind(mainWindow))

  // Variables
  ipcMain.on('var-get-sync', ipc_getVariables.bind(mainWindow))
  ipcMain.on('var-set-sync', ipc_setVariables.bind(mainWindow))

  // Terminal
  ipcMain.on('send-error', ipc_sendError.bind(mainWindow))
  ipcMain.on('send-output', ipc_sendOutput.bind(mainWindow))
  ipc_catchError.call(mainWindow)

  // Menu
  ipcMain.on('menu-enable', ipc_enableMenu.bind(mainWindow))
  ipcMain.on('menu-disable', ipc_disableMenu.bind(mainWindow))

  // Script
  ipcMain.on('macro-create', ipc_createMacro.bind(mainWindow))
  ipcMain.on('macro-clear', ipc_clearMacro.bind(mainWindow))
  ipcMain.on('macro-get', ipc_getMacro.bind(mainWindow))

}



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */