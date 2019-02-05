import path from 'path'
import fs from 'fs-extra'

import {
  dialog,
  app
} from 'electron'

import getResolvedURI from '@static/js/getResolvedURI'


export default function openProject(e, esproject) {

  let winURL

  try {

    this.variables.project.directory = path.dirname(esproject)
    this.variables.project.information_file = esproject
    this.variables.project.information.set(fs.readJSONSync(esproject))

  } catch (e) {

    dialog.showErrorBox(e.message, e.stack)
    app.exit(1)

  }

  winURL = getResolvedURI(this.webContents.getURL(), '/engine')

  this.setResizable(true)
  this.loadURL(winURL)
  this.maximize()

  this.webContents.once('did-finish-load', () => {

    this.emit('project-open')
    e.returnValue = undefined

  })

}