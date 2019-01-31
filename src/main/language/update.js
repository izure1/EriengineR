import fs from 'fs-extra'
import electron from 'electron'


export default function () {

  fs.writeJSONSync(this.variables.project.information_file, this.variables.project.information, {
    spaces: 2
  })

  for (let win of electron.BrowserWindow.getAllWindows()) {
    win.webContents.send('language-update')
  }

}