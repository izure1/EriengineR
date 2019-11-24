import path from 'path'
import sceneDirectory from './sceneDirectory'


export default async function (id, v = 0) {

  let map
  let directory

  map = [
    'Scripts',
    'Actors',
  ]
  
  directory = await sceneDirectory.call(this, 1)
  directory = path.join(directory, id, map[v])

  return directory

}