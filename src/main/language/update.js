import fs from 'fs-extra'
import electron from 'electron'


export default function () {

  let {
    information,
    information_file
  } = this.variables.project


  fs.writeJSONSync(information_file, information, {
    spaces: 2
  })

  for (let win of electron.BrowserWindow.getAllWindows()) {
    win.webContents.send('language-update')
  }

}