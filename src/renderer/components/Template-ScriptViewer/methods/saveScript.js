import {
  ipcRenderer
} from 'electron'


export default function (script) {

  script = this.getOriginScript(script.id)
  
  ipcRenderer.sendSync('script-write', script.path, script)
  ipcRenderer.sendSync('script-check-valid')

}