import {
  ipcRenderer
} from 'electron'
import path from 'path'


export default function (eternally) {

  if (this.isTop) {
    return
  }

  if (eternally) ipcRenderer.send('tree-delete', {
    name: path.basename(this.tree.path),
    path: this.tree.path
  })

  else ipcRenderer.send('modal-delete-trash', {
    name: path.basename(this.tree.path),
    path: this.tree.path
  })

}