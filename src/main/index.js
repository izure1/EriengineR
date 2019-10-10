import os from 'os'
import fs from 'fs-extra'
import url from 'url'
import path from 'path'

import {
  app,
  dialog,
  BrowserWindow,
  ipcMain,
  Menu
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
let pkg

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


pkg = require('find-package-json')
pkg = pkg(__dirname).next()



import Information from './project/Vars/Information'


/*
 *  Main/Renderer 에서 공용으로 사용될 변수입니다
 *
 *  이는 variables/ipc 을 이용하여 두 프로세스간 get/set 할 수 있습니다
 *  var-set-sync, var-get-sync IPC를 참고하세요
 *
 */
variables = {

  // package.json 정보가 담겨 있습니다
  package: pkg.value,

  // 엔진 정보가 담깁니다
  engine: null,

  // 사용자 정보가 담깁니다
  user: null,

  // 해당 프로젝트의 정보를 담습니다.
  // directory 속성은 현재 프로젝트의 루트 디렉토리의 경로가 담깁니다
  // information_file 속성은 project.esscript 의 경로가 담깁니다
  // information 속성은 project.esscript 의 내용이 담깁니다
  project: {
    directory: null,
    information_file: null,
    information: new Information,
    locale: {
      database: null,
      path: 'locales/locale.db',
    }
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

async function start() {

  variables.engine = await initor.init(HOME)
  variables.user = await initor.getUserData(variables.engine.user)

  await runEngine()

}


async function runEngine() {

  // 앱 실행
  createWindow()

  app.on('window-all-closed', () => {
    app.quit()
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })

}



import getResolvedURI from '@common/js/getResolvedURI'

async function createWindow() {

  mainWindow = new BrowserWindow({
    height: 670,
    width: 1000,
    icon: path.join(__static, 'assets/image/ico_eri_64.png'),
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  mainURL = getResolvedURI(mainURL)

  Menu.setApplicationMenu(Menu.buildFromTemplate([]))

  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(mainURL)
  mainWindow.focus()

  // 메인 윈도우 프레임에 변수를 할당합니다
  mainWindow.variables = variables

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  runIPC()
  runVariablesWatcher()

}




// Electron 에서 사용자의 Gesture를 입력받기전에 Audio가 재생되지 않는 WebPolicy 문제점을 해결하기 위한 임시방편
// Electron 에서 추후 이 기능을 지원한다면 아래 커맨드 라인은 삭제되어야 합니다
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
// 앱을 크롬 inspect 와 연결하여 디버깅합니다
app.commandLine.appendSwitch('inspect', '5189')

// 앱이 준비되면 실행합니다
app.on('ready', start)



/* -------------------------------------------------------------------------------------- */


/**
 * 
 *  Set EventListeners
 * 
 */


import ipc_showItemInFolder from './shell/showItemInFolder'

import ipc_createProject from './project/createProject'
import ipc_openProject from './project/openProject'
import ipc_createSubDirectory from './project/createSubDirectory'
import ipc_getProjectDirectory from './project/getProjectDirectory'
import ipc_getMacroDirectory from './project/getMacroDirectory'
import ipc_getModuleDirectory from './project/getModuleDirectory'
import ipc_getLibraryDirectory from './project/getLibraryDirectory'

import ipc_delete from './modal/delete'
import ipc_deleteTrash from './modal/deleteTrash'
import ipc_openModal from './modal/openModal'

import ipc_getVariables from './variables/getVariables'
import ipc_setVariables from './variables/setVariables'

import ipc_catchError from './terminal/catchError'
import ipc_sendError from './terminal/sendError'
import ipc_sendErrorBeep from './terminal/sendErrorBeep'
import ipc_sendOutput from './terminal/sendOutput'

import ipc_getScriptDirectory from './script/getScriptDirectory'
import ipc_getScriptList from './script/getScriptList'
import ipc_getUnrunableList from './script/getUnrunableList'
import ipc_getScriptPath from './script/getScriptPath'
import ipc_checkValidScript from './script/checkValidScript'
import ipc_writeScript from './script/writeScript'

import ipc_getMacroList from './macro/getMacroList'
import ipc_getMacroInformation from './macro/getMacroInformation'
import ipc_getMacroValue from './macro/getMacroValue'
import ipc_addMacroValue from './macro/addMacroValue'

import ipc_addLocale from './locale/addLocale'
import ipc_getLocale from './locale/getLocale'
import ipc_removeLocale from './locale/removeLocale'
import ipc_renameLocale from './locale/renameLocale'
import ipc_getAllLocale from './locale/getAllLocale'
import ipc_getDefaultLocale from './locale/getDefaultLocale'
import ipc_setDefaultLocale from './locale/setDefaultLocale'

import ipc_getAssetDirectory from './asset/getAssetDirectory'
import ipc_getAssetList from './asset/getAssetList'
import ipc_getAssetPath from './asset/getAssetPath'
import ipc_getAssetPathFull from './asset/getAssetPathFull'

import ipc_getDesignDirectory from './design/getDesignDirectory'
import ipc_getDesignPath from './design/getDesignPath'

import ipc_addSceneDirectory from './scene/addSceneDirectory'
import ipc_getSceneDirectory from './scene/getSceneDirectory'


function runIPC() {

  // Shell
  ipcMain.on('shell-show-item-in-folder', ipc_showItemInFolder.bind(mainWindow)) // 디렉토리에 있는 파일을 가르킵니다. 이는 Renderer 에서 사용 시 창 앞으로 나오지 않는 오류를 위한 방편입니다

  // Project
  ipcMain.on('project-create', ipc_createProject.bind(mainWindow)) // 프로젝트를 생성하는데 사용합니다
  ipcMain.on('project-open', ipc_openProject.bind(mainWindow)) // 프로젝트를 여는데 사용합니다
  ipcMain.on('project-create-subdirectory', ipc_createSubDirectory.bind(mainWindow)) // 프로젝트 운용에 필요한 서브 디렉토리를 생성하는데 사용합니다
  ipcMain.on('project-get-directory', ipc_getProjectDirectory.bind(mainWindow)) // 프로젝트 디렉토리 경로를 반환합니다
  ipcMain.on('project-get-directory-macro', ipc_getMacroDirectory.bind(mainWindow)) // 프로젝트의 매크로 디렉토리 경로를 반환합니다
  ipcMain.on('project-get-directory-module', ipc_getModuleDirectory.bind(mainWindow)) // 프로젝트의 모듈 디렉토리 경로를 반환합니다
  ipcMain.on('project-get-directory-library', ipc_getLibraryDirectory.bind(mainWindow)) // 프로젝트의 라이브러리 디렉토리 경로를 반환합니다

  // Modal
  ipcMain.on('modal-open', ipc_openModal.bind(mainWindow)) // 새로운 모달창을 띄웁니다
  ipcMain.on('modal-delete', ipc_delete.bind(mainWindow)) // 파일 영구 삭제 모달창을 띄웁니다. 휴지통에서 복구할 수 없습니다
  ipcMain.on('modal-delete-trash', ipc_deleteTrash.bind(mainWindow)) // 파일 삭제 모달창을 띄웁니다. 휴지통에서 복구가 가능합니다

  // Variables
  ipcMain.on('var-get-sync', ipc_getVariables.bind(mainWindow)) // Renderer 프로세스에서 Main 프로세스에 있는 variables 변수 내부 값을 참조할 수 있습니다
  ipcMain.on('var-set-sync', ipc_setVariables.bind(mainWindow)) // Renderer 프로세스에서 Main 프로세스에 있는 variables 변수 내부 값을 수정할 수 있습니다

  // Terminal
  ipcMain.on('send-error', ipc_sendError.bind(mainWindow)) // 에러 메세지를 출력시킵니다. 이는 에리엔진 터미널에 출력됩니다
  ipcMain.on('send-error-beep', ipc_sendErrorBeep.bind(mainWindow)) // 에러음을 발생시킵니다
  ipcMain.on('send-output', ipc_sendOutput.bind(mainWindow)) // 메세지를 출력시킵니다. 이는 에리엔진 터미널에 출력됩니다
  ipc_catchError.call(mainWindow)

  // Script
  ipcMain.on('script-get-directory', ipc_getScriptDirectory.bind(mainWindow)) // 해당 프로젝트의 스크립트 루트 디렉토리 경로를 반환합니다
  ipcMain.on('script-get-list', ipc_getScriptList.bind(mainWindow)) // 매개변수로 넘어온 경로에 있는 스크립트 파일 목록을 배열에 담아 반환합니다
  ipcMain.on('script-get-list-unrunable', ipc_getUnrunableList.bind(mainWindow)) // 인게임에서 실행되지 않을 스크립트 파일 목록을 배열에 담아 반환합니다
  ipcMain.on('script-write', ipc_writeScript.bind(mainWindow)) // 스크립트 파일을 생성하거나 수정합니다
  ipcMain.on('script-check-valid', ipc_checkValidScript.bind(mainWindow)) // 모든 스크립트 파일의 유효성을 검사하고 수정합니다
  ipcMain.on('script-get-path', ipc_getScriptPath.bind(mainWindow)) // 스크립트 id로부터 스크립트 파일의 경로를 검색해 반환합니다

  // Macro
  ipcMain.on('macro-get-list', ipc_getMacroList.bind(mainWindow)) // static\assets\macro 내부에 있는 모든 매크로 파일을 배열에 담아 반환합니다
  ipcMain.on('macro-get-information', ipc_getMacroInformation.bind(mainWindow)) // id 값으로부터 매크로의 원본을 반환합니다
  ipcMain.on('macro-get-value', ipc_getMacroValue.bind(mainWindow)) // 매크로에서 사용한 입력 변수의 정보를 가져옵니다
  ipcMain.on('macro-add-value', ipc_addMacroValue.bind(mainWindow)) // 매크로의 입력 변수 정보를 저장합니다

  // 로케일, 다국어 관련
  ipcMain.on('locale-add', ipc_addLocale.bind(mainWindow)) // 새로운 언어를 추가할 수 있습니다
  ipcMain.on('locale-get', ipc_getLocale.bind(mainWindow)) // 특정 언어의 정보를 조회해 반환합니다
  ipcMain.on('locale-remove', ipc_removeLocale.bind(mainWindow)) // 특정 언어를 제거합니다
  ipcMain.on('locale-rename', ipc_renameLocale.bind(mainWindow)) //특정 언어의 이름을 변경합니다
  ipcMain.on('locale-get-all', ipc_getAllLocale.bind(mainWindow)) // 모든 다국어를 배열로 반환합니다
  ipcMain.on('locale-get-default', ipc_getDefaultLocale.bind(mainWindow)) // 기본 언어로 설정된 언어를 반환합니다
  ipcMain.on('locale-set-default', ipc_setDefaultLocale.bind(mainWindow)) // 특정 언어를 기본 언어로 설정하고 반환합니다

  // Assets
  ipcMain.on('asset-get-directory', ipc_getAssetDirectory.bind(mainWindow)) // 현재 프로젝트의 에셋 디렉토리 경로를 반환합니다
  ipcMain.on('asset-get-list', ipc_getAssetList.bind(mainWindow)) // 현재 프로젝트의 에셋 파일들의 경로를 배열에 담아 반환합니다
  ipcMain.on('asset-get-path', ipc_getAssetPath.bind(mainWindow)) // 에셋 경로를 상대경로로 만들어 반환합니다
  ipcMain.on('asset-get-path-full', ipc_getAssetPathFull.bind(mainWindow)) // 에셋 경로를 절대경로로 만들어 반환합니다

  // Design
  ipcMain.on('design-get-directory', ipc_getDesignDirectory.bind(mainWindow)) // 현재 프로젝트의 디자인 디렉토리 경로를 반환합니다
  ipcMain.on('design-get-path', ipc_getDesignPath.bind(mainWindow)) // 디자인 id로부터 디자인 파일의 경로를 검색해 반환합니다

  // Scene
  ipcMain.on('scene-add-directory', ipc_addSceneDirectory.bind(mainWindow)) // 현재 프로젝트의 ScenesMaps 디렉토리에 특정 씬 전용 디렉토리를 만듭니다
  ipcMain.on('scene-get-directory', ipc_getSceneDirectory.bind(mainWindow)) // 현재 프로젝트의 씬 디렉토리 경로를 반환합니다. 0 이면 일반 씬 디렉토리, 1 이면 maps 디렉토리입니다

}




import {
  watch
} from 'melanke-watchjs'

function runVariablesWatcher() {

  // 사용자 정보가 변경되면 자동으로 이를 감지하여 user.json 파일에 갱신합니다
  watch(variables, 'user', () => {

    fs.writeJSONSync(variables.engine.user, variables.user, {
      spaces: 2
    })

  })

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