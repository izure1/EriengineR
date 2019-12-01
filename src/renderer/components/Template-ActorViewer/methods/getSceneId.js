import {
  ipcRenderer
} from 'electron'
import path from 'path'
import normalize from 'normalize-path'


export default function () {

  let projectDirectory = ipcRenderer.sendSync('project-get-directory')
  let currentDirectory = this.path

  projectDirectory = projectDirectory
  currentDirectory = currentDirectory


  let relative = currentDirectory.replace(normalize(path.join(projectDirectory, 'ScenesMaps'), ''))

  relative = relative.split('/').filter(t => !!t)
  relative = relative.shift()

  return relative

}