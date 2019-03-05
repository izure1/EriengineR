import electron from 'electron'


export default function (script) {

  script = this.getOriginScript(script.id)
  
  electron.ipcRenderer.sendSync('script-write', script.path, script)
  electron.ipcRenderer.sendSync('script-check-valid')

}