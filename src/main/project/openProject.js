import path from 'path'
import normalize from 'normalize-path'
import fs from 'fs-extra'

import {
  dialog,
  app
} from 'electron'

import getResolvedURI from '@common/js/getResolvedURI'
import setSubDirectory from './setSubDirectory'
import copyMacroDirectory from '../macro/copyMacroDirectory'
import setDatabase from './setDatabase'

export default async function openProject(e, esproject) {

  let winURL

  try {

    this.variables.project.directory = normalize(path.dirname(esproject))
    this.variables.project.information_file = esproject
    this.variables.project.information.set(fs.readJSONSync(esproject))

    await setSubDirectory.call(this, this.variables.project.directory)
    await copyMacroDirectory.call(this)
    await setDatabase.call(this)

  } catch (e) {

    dialog.showErrorBox(e.message, e.stack)
    app.exit(1)

  }

  winURL = getResolvedURI(this.webContents.getURL(), '/engine')

  this.loadURL(winURL)
  this.maximize()

}