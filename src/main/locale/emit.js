import {
  BrowserWindow
} from 'electron'


export default async function () {

  for (let win of BrowserWindow.getAllWindows()) {
    win.webContents.send('locale-update')
  }

}