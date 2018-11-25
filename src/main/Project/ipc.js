import {
  ipcMain,
  dialog
} from 'electron'

import path from 'path'
import fse from 'fs-extra'


export default function (win, oncreated) {

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
      await fse.copy(src, dist)
    } catch (err) {
      res.success = false
      dialog.showErrorBox(err.code, err.message)
      e.sender.send('project-create', res)
      return
    }

    e.sender.send('project-create', res)

  })

  ipcMain.on('project-create-done', async (e, project) => {

    let projectDirectory = path.join(project.directory, project.id)

    oncreated(projectDirectory)

  })

}