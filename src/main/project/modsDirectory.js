import path from 'path'


export default async function (name = '') {

  return path.join(this.variables.project.directory, 'Mods', name)

}