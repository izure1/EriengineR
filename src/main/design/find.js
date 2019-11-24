import fs from 'fs-extra'
import fg from 'fast-glob'

import designDirectory from './designDirectory'

export default async function (id) {

  let filenames, filename
  let file

  filenames = await fg('**/*.esdesign', {
    cwd: designDirectory.call(this),
    onlyFiles: true,
    absolute: true
  })

  filename = null

  for (let t of filenames) {

    file = await fs.readJSON(t)

    if (file.id !== id) {
      continue
    }

    filename = t
    break

  }

  return filename

}