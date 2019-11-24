import fs from 'fs-extra'
import path from 'path'
import sceneDirectoryMap from './sceneDirectoryMap'


export default async function (id) {

  let directory

  // Scripts
  directory = await sceneDirectoryMap.call(this, id, 0)
  await fs.ensureDir(directory)

  // Actors
  directory = await sceneDirectoryMap.call(this, id, 1)
  await fs.ensureDir(directory)

  return null

}