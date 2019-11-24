import sceneDirectoryMap from './sceneDirectoryMap'


export default async function (e, id) {

  let returnValue

  returnValue = await sceneDirectoryMap.call(this, id, 0)

  e.sender.send('scene-get-directory-script', returnValue)
  e.returnValue = returnValue

}