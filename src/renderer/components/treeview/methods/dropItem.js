import fs from 'fs-extra'
import path from 'path'
import normalize from 'normalize-path'


export default function (e, dataTransfer) {

  let before
  let after

  before = dataTransfer.getData('text/path')
  after = this.tree.path
  after = normalize(path.join(after, path.basename(before)))

  fs.rename(before, after)

}