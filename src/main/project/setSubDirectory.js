import fs from 'fs-extra'
import path from 'path'
import normalize from 'normalize-path'

import DIRECTORYS from './Vars/DIRECTORYS'


export default async function (dist) {

  let directory

  for (let dirname of DIRECTORYS) {

    directory = normalize(path.join(dist, dirname))
    await fs.ensureDir(directory)

  }

  return true

}