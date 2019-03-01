import path from 'path'

export default function (source = false) {

  return source ?
    path.join(this.variables.project.directory, 'AssetSources').replace(/\\/g, '/') :
    path.join(this.variables.project.directory, 'Assets').replace(/\\/g, '/')

}