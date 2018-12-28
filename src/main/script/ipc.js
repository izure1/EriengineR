import {
  ipcMain
} from 'electron'

import path from 'path'
import fs from 'fs-extra'


let script

export default function (win) {

  ipcMain.on('script-open', async (e, scriptpath) => {

    script = await fs.readJSON(scriptpath)

  })


  ipcMain.on('script-modify', (e, script) => {

    

  })

}