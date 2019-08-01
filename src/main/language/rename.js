import fs from 'fs-extra'
import path from 'path'


export default function (origin, after) {

  let directory

  directory = path.posix.join(this.variables.project.directory, 'Languages')

  origin = path.posix.join(directory, `${origin}.json`)
  after = path.posix.join(directory, `${after}.json`)

  if (fs.existsSync(origin)) {
    try {
      fs.renameSync(origin, after)
    } catch (e) {}
  }

}