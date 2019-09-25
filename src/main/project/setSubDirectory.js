import fs from 'fs-extra'
import path from 'path'

import DIRECTORYS from './Vars/DIRECTORYS'


export default async function () {

  let directory
  let dist

  dist = this.variables.project.directory

  for (let dirname of DIRECTORYS) {

    directory = path.join(dist, dirname)
    await fs.ensureDir(directory)

  }

  return true

}