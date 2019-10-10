import {
  ipcRenderer
} from 'electron'

export default function (tab) {

  ipcRenderer.on('send-output', (e, msg) => {

    tab.count++
    tab.contents.push({
      timestamp: new Date().toLocaleString(),
      user: 'Terminal',
      message: msg.message,
      stack: msg.stack
    })

  })

};