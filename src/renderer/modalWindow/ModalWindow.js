import path from 'path'
import electron from 'electron'
import getResolvedURI from '@static/js/getResolvedURI'


export default class ModalWindow {

  /**
   * 
   * @param {Object} windowOption  새로운 모달창의 BrowserWindow option 입니다.
   */
  constructor(windowOption = {}) {

    this.win = null
    this.component = null
    this.data = null
    this.windowOption = ModalWindow.setDefaultOption(windowOption)
    this.callbacks = []

    return this

  }


  get parent() {
    return this.windowOption.parent || electron.remote.BrowserWindow.getAllWindows()[0]
  }

  static setDefaultOption(windowOpt) {

    const defaultOpt = {
      width: 1024,
      height: 600,
      modal: true,
      darkTheme: true,
      frame: false,
      webPreferences: {
        webSecurity: false
      }
    }

    return Object.assign({}, defaultOpt, windowOpt)

  }

  /**
   * 
   * @param {String} component  컴퍼넌트 모듈의 경로를 받습니다. 웹팩 alias 경로를 받아야 합니다.
   * @param {Object} data  컴퍼넌트에 넘길 데이터값을 받습니다
   */
  createWindow(component, data = {}) {

    this.component = component
    this.data = data

    this.setComponent(component)
    this.setData(data)

    this.win = new electron.remote.BrowserWindow(this.windowOption)

    //this.win.setMenu(null)
    this.win.loadURL(getResolvedURI(this.parent.webContents.getURL(), '/modal'))
    //this.win.webContents.openDevTools()

    this.win.on('modal-ready', this.__attachBody.bind(this))

    this.win.on('modal-close', this.close.bind(this))
    this.win.on('modal-return', this.__runCallbacks.bind(this))

    return this

  }

  /**
   * 
   * @param {String} component  컴퍼넌트 모듈의 경로를 받습니다
   */
  setComponent(component) {

    this.component = component
    this.__attachBody()

    return this

  }

  /**
   * 
   * @param {Object} data  컴퍼넌트에 넘길 데이터값을 받습니다
   */
  setData(data) {

    this.data = data
    this.__attachBody()

    return this

  }

  __attachBody() {

    if (!this.win) {
      return
    }

    this.win.emit('modal-set-data', this.component, this.data)
    return this

  }


  __runCallbacks(returnValue) {

    this.callbacks.forEach(callback => callback(returnValue))
    this.close()

  }

  done(callback) {
    this.callbacks.push(callback)
  }

  close() {
    this.win.close()
  }

}