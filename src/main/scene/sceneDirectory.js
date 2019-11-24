import path from 'path'


export default async function (v = 0) {

  let map

  map = [
    'Scenes',
    'ScenesMaps',
  ]

  return path.join(this.variables.project.directory, map[v])

}