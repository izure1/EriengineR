import fs from 'fs-extra'
import path from 'path'


export default function (e) {

  let before
  let after

  before = e.dataTransfer.getData('filePath')
  after = this.tree.path
  after = path.join(after, path.basename(before))

  fs.rename(before, after)

}