import {
  ipcMain
} from 'electron'


export default function (data = {}) {

  ipcMain.on('var-get', function (e, msg) {

    let res

    res = msg ? data[msg] : data
    e.sender.send('var-get', res)

  })

  ipcMain.on('var-set', function (e, msg) {

    for (let k in msg) {
      data[k] = msg[k]
    }

    e.sender.send('var-set', data[k])

  })

}