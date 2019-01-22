import {
  ipcRenderer
} from 'electron'

export default function (tab) {

  ipcRenderer.on('send-error', (e, msg) => {

    tab.count++
    tab.contents.push({
      timestamp: new Date().toLocaleString(),
      user: 'Main',
      message: msg.message,
      stack: msg.stack
    })

    ipcRenderer.send('send-error-beep')

  })

  window.addEventListener('error', e => {

    tab.count++
    tab.contents.push({
      timestamp: new Date().toLocaleString(),
      user: 'Renderer',
      message: e.error.message,
      stack: e.error.stack
    })

    ipcRenderer.send('send-error-beep')

  })

};