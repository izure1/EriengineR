import fs from 'fs-extra'
import dirTree from '../dirTree'


export default function () {

  if (this.top !== this) {
    return
  }

  this.tree = dirTree(this.path, this.filter)
  this.watcher = fs.watch(this.path, {
    recursive: true
  }, () => {
    this.tree = dirTree(this.path, this.filter)
  })

}