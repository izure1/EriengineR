import {
  ipcRenderer
} from 'electron'


export default function (script) {

  let unrunables

  unrunables = ipcRenderer.sendSync('script-get-list-unrunable', this.data.directory, false)
  unrunables = unrunables.filter(t => t.id === script.id)

  return !!unrunables.length

}