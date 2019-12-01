import path from 'path'
import normalize from 'normalize-path'


export default async function (v = 0) {

  let map

  map = [
    'Scenes',
    'ScenesMaps',
  ]

  return normalize(path.join(this.variables.project.directory, map[v]))

}