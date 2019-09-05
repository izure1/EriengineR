import fs from 'fs-extra'
import path from 'path'


export default function (origin, after) {

  let directory

  directory = path.join(this.variables.project.directory, 'Languages')

  origin = path.join(directory, `${origin}.json`)
  after = path.join(directory, `${after}.json`)

  if (fs.existsSync(origin)) {
    try {
      fs.renameSync(origin, after)
    } catch (e) {}
  }

}