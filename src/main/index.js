import os from 'os'
import fs from 'fs-extra'
import url from 'url'
import path from 'path'

import {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} from 'electron'


let mainWindow
let winURL
let variables

app.on('ready', start)


/**
 * 
 * 엔진 초기화 및 실행
 * 
 * 사용자의 정보(최근 프로젝트, 이메일)등을 저장하는 디렉토리를 생성합니다.
 * 기본적으로 생성되는 위치는 %appdata% 입니다.
 * 
 */

const HOME = os.homedir() // %appdata%

import initor from './engine/init/initor'
import {
  watch
} from 'melanke-watchjs'

async function start() {

  variables.engine = await initor.init(HOME)
  variables.user = await initor.getUserData(variables.engine.user)


  // 사용자 정보가 변경되면 자동으로 이를 감지하여 user.json 파일에 갱신합니다
  watch(variables.user, () => {
    fs.writeJSONSync(variables.engine.user, variables.user)
  }, 0, true)


  await runEngine()

}



/**
 * 
 * Start Eriengine
 * 
 */

import ipcMenu from './engine/Menu/ipc'
import ipcModal from './modal/ipc'
import ipcProject from './project/ipc'
import ipcTerminal from './terminal/ipc'
import ipcVar from './variables/ipc'

import electronDevtoolsInstaller from 'electron-devtools-installer';


async function runEngine() {

  // Electron 에서 사용자의 Gesture를 입력받기전에 Audio가 재생되지 않는 WebPolicy 문제점을 해결하기 위한 임시방편
  // Electron 에서 추후 이 기능을 지원한다면 아래 커맨드 라인은 삭제되어야 합니다
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

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

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

winURL = process.env.NODE_ENV === 'development' ?

  url.format({
    protocol: 'http',
    hostname: 'localhost',
    pathname: '/',
    port: 9080,
    hash: '/'
  }) :

  url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'index.html'),
    hash: '/'
  })

variables = {
  project: {
    directory: null,
    information: {}
  }
}


function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    width: 1000,
    resizable: false,
    icon: path.join(__dirname, '../assets/image/ico.ico'),
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null)
  mainWindow.focus()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcModal(mainWindow)
  ipcProject(mainWindow, openProject)
  ipcVar(variables)

}


function openProject(projectDirectory) {

  try {
    variables.project.directory = path.dirname(projectDirectory)
    variables.project.information = fs.readJSONSync(projectDirectory)
  } catch (e) {
    dialog.showErrorBox(e.message, e.stack)
    app.exit(1)
  }

  winURL = url.resolve(winURL, '#/engine')

  mainWindow.setResizable(true)
  mainWindow.loadURL(winURL)
  mainWindow.maximize()

  ipcMenu(mainWindow)
  ipcTerminal(mainWindow)

  ipcMain.emit('menu-enable')

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