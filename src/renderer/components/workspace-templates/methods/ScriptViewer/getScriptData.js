import {
  ipcRenderer
} from 'electron'



function setHiddenContext(property, value) {

  Object.defineProperty(this, property, {
    value,
    enumerable: false
  })

  return this

}

export default function () {

  let scripts


  scripts = ipcRenderer.sendSync('script-get-list', this.data.directory, false)
  scripts = scripts.map(script => setHiddenContext.call(script, 'path', script.path))

  return scripts

}