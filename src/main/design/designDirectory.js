import path from 'path'
import normalize from 'normalize-path'


export default function () {

  return normalize(path.join(this.variables.project.directory, 'Designs'))

}