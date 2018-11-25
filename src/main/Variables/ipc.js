import {
  ipcMain
} from 'electron'


export default function (data = {}) {

  ipcMain.on('var-get-sync', (e, msg) => {

    let res

    res = msg ? data[msg] : data
    e.returnValue = res

  })

  ipcMain.on('var-set-sync', (e, msg) => {

    for (let k in msg) {
      data[k] = msg[k]
    }

    e.returnValue = data[k]

  })

}