import path from 'path'
import normalize from 'normalize-path'


export default async function (name = '') {

  return normalize(path.join(this.variables.project.directory, 'Mods', name))

}