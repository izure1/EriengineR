import fs from 'fs-extra'


export default function () {

  if (!fs.existsSync(this.path)) return

  this.watcher = fs.watch(this.path, this.onFileUpdate)

}