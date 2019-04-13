import path from 'path'

export default function () {

  return path.join(this.variables.project.directory, 'Designs').replace(/\\/g, '/')

}