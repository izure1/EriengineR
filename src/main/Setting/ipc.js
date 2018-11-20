import {
  ipcMain
} from 'electron'


export default function (data = {}) {

  ipcMain.on('setting-get', function (e, msg) {

    let res

    res = msg ? data[msg] : data
    e.sender.send('setting-get', res)

  })

  ipcMain.on('setting-set', function (e, msg) {

    for (let k in msg) {
      data[k] = msg[k]
    }

    e.sender.send('setting-set', data[k])

  })

}