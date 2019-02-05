import fs from 'fs-extra'
import path from 'path'


export default async function (language) {

  let directory
  let file


  directory = path.join(this.variables.project.directory, 'Languages')
  file = path.join(directory, `${language}.json`)


  if (!fs.existsSync(file)) {

    fs.writeJSONSync(file, {})

  }

  return await fs.readJSON(file)

}