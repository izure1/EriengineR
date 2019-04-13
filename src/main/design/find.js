import fs from 'fs-extra'
import fg from 'fast-glob'

import designDirectory from './designDirectory'

export default async function (id) {

  let filenames, filename
  let file

  filenames = await fg(['**/*.esdesign_actor', '**/*.esdesign_interface', '**/*.esdesign_background'], {
    cwd: designDirectory.call(this),
    onlyFiles: true,
    absolute: true
  })

  filename = null

  for (let t of filenames) {

    file = await fs.readJSON(t)

    if (file.__id !== id) {
      continue
    }

    filename = t
    break

  }

  return filename

}