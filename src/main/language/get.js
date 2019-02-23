import glob from 'glob'
import path from 'path'

import read from './read'


export default async function () {

  let directory
  let languages, name
  let returnValue


  directory = path.join(this.variables.project.directory, 'Languages')
  languages = glob.sync(path.join(directory, '*.json'))

  returnValue = []


  for (let language of languages) {
    
    name = path.parse(language).name
    language = await read.call(this, name)

    returnValue.push({
      id: language.id,
      name
    })

  }

  return returnValue

}