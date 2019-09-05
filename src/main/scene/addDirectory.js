import fs from 'fs-extra'
import path from 'path'


export default async function (id) {

  let directory
  let sceneDir

  sceneDir = 'ScenesOrigin'

  directory = path.join(this.variables.project.directory, sceneDir, id)

  await fs.ensureDir(directory)

  return directory

}