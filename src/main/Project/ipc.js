import {
  ipcMain,
  dialog
} from 'electron'

import path from 'path'
import fs from 'fs-extra'


export default function (win, onopened) {

  ipcMain.on('project-create', async (e, options) => {

    let src
    let dist
    let res

    src = options.template.path
    dist = path.join(options.directory, options.id)

    res = {
      success: true,
      dist
    }

    try {
      await fs.copy(src, dist)
    } catch (err) {
      res.success = false
      dialog.showErrorBox(err.message, err.stack)
      e.sender.send('project-create', res)
      return
    }

    e.sender.send('project-create', res)

  })

  ipcMain.on('project-open', async (e, project) => {

    onopened(project)

  })

}