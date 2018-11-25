import process from 'process'
import electron from 'electron'

export default function (win) {
  process.on('uncaughtException', e => {
    win.webContents.send('send-error', e.toString())
  })

  electron.ipcMain.on('send-error', (e, msg) => {
    e.sender.send('send-error', msg)
  })

  electron.ipcMain.on('send-output', (e, msg) => {
    e.sender.send('send-output', msg)
  })
};