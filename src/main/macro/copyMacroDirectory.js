import fs from 'fs-extra'
import path from 'path'
import normalize from 'normalize-path'


export default async function () {

  let src, dist

  src = normalize(path.join(__static, 'assets', 'macro'))
  dist = normalize(path.join(this.variables.project.directory, 'Mods', 'Macro'))

  await fs.copy(src, dist)

}