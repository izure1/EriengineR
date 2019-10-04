import fs from 'fs-extra'
import path from 'path'
import sceneDirectory from './sceneDirectory'


export default async function (id) {

  let directory

  directory = await sceneDirectory.call(this, 1)
  directory = path.join(directory, id)

  await fs.ensureDir(directory)

  return directory

}