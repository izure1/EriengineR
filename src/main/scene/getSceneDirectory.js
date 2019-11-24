import sceneDirectory from './sceneDirectory'


export default async function (e) {

  let returnValue

  returnValue = await sceneDirectory.call(this, 0)

  e.sender.send('scene-get-directory', returnValue)
  e.returnValue = returnValue

}