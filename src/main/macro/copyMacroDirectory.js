import fs from 'fs-extra'
import path from 'path'


export default async function () {

  let src, dist

  src = path.join(__static, 'assets', 'macro')
  dist = path.join(this.variables.project.directory, 'Mods', 'Macro')

  await fs.copy(src, dist)

}