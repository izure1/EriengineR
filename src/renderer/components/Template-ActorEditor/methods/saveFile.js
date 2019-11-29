import {
  ipcRenderer
} from 'electron'


export default function () {
  
  this.updating = true
  
  ipcRenderer.send('actor-create', this.path, this.actor)
  ipcRenderer.once('actor-create', () => {
    this.updating = false
  })

}