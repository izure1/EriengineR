import process from 'process'
import electron from 'electron'

export default function (win) {
  process.on('uncaughtException', function (e) {
    win.webContents.send('send-error', e.toString())
  })

  electron.ipcMain.on('send-error', function (e, msg) {
    e.sender.send('send-error', msg)
  })

  electron.ipcMain.on('send-output', function (e, msg) {
    e.sender.send('send-output', msg)
  })
};
