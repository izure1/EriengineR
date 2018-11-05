import {
  BrowserWindow
} from 'electron'

class ModalWindow {
  constructor (parent, url, width = 500, height = 300, maxWidth = 500, maxHeight = 300) {
    this.window = new BrowserWindow({
      parent,
      width,
      height,
      maxWidth,
      maxHeight,
      show: false
    })

    this.window.loadURL(url)
    this.window.once('ready-to-show', () => {
      this.show()
    })
    this.window.once('closed', () => {
      this.window = null
    })
  }

  show () {
    this.window.show = true
    return this
  }

  hide () {
    this.window.show = false
    return this
  }
}

export default ModalWindow
