import fs from 'fs-extra'
import path from 'path'


export default function (e, dataTransfer) {

  let before
  let after

  before = dataTransfer.getData('text/path')
  after = this.tree.path
  after = path.join(after, path.basename(before))

  fs.rename(before, after)

}