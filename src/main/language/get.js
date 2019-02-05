import glob from 'glob'
import path from 'path'


export default function () {

  let directory
  let languages

  directory = path.join(this.variables.project.directory, 'Languages')
  languages = glob.sync(path.join(directory, '*.json'))

  languages = languages.map(item => path.parse(item).name)

  return languages

}