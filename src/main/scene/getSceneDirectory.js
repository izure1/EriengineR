import sceneDirectory from './sceneDirectory'


export default async function (e, v) {

  let returnValue

  returnValue = await sceneDirectory.call(this, v)

  e.sender.send('scene-get-directory', returnValue)
  e.returnValue = returnValue

}