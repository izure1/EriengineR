import fs from 'fs-extra'
import path from 'path'


export default async function (language, scenario) {

  let directory, file
  let writOption


  writOption = {
    spaces: 2
  }


  directory = path.posix.join(this.variables.project.directory, 'Languages')
  file = path.posix.join(directory, `${language}.json`)

  await fs.writeJSON(file, scenario, writOption)

}