import fs from 'fs-extra'
import path from 'path'


export default function (e, before) {

  let name
  let after

  name = e.currentTarget.value
  after = path.join(path.dirname(before), name)

  if (!this.modifyMode) {
    return
  }

  if (!name) {
    this.modifyNameCancel(e)
    return
  }

  if (path.parse(before).ext !== path.parse(after).ext) {
    after = path.format({
      dir: path.dirname(after),
      name: path.parse(after).name,
      ext: path.extname(before)
    })
  }

  fs.renameSync(before, after)
  this.modifyMode = false

}