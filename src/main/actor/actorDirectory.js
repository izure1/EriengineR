import path from 'path'


export default function (id) {

  return path.join(this.variables.project.directory, 'ScenesMaps', id, 'Actors')

}