import path from 'path'

export default function () {

  return path.posix.join(this.variables.project.directory, 'Designs')

}