import path from 'path'
import normalize from 'normalize-path'


export default function (id) {

  return normalize(path.join(this.variables.project.directory, 'ScenesMaps', id, 'Actors'))

}