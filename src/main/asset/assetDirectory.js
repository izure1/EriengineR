import path from 'path'

export default function (source = false) {

  return source ?
    path.posix.join(this.variables.project.directory, 'AssetSources') :
    path.posix.join(this.variables.project.directory, 'Assets')

}