import sceneDirectoryMap from './sceneDirectoryMap'


export default async function (e, id) {

  let returnValue

  returnValue = await sceneDirectoryMap.call(this, id, 1)

  e.sender.send('scene-get-directory-actor', returnValue)
  e.returnValue = returnValue

}