import addDirectory from './addDirectory'


export default async function (e, id) {

  let returnValue

  await addDirectory.call(this, id)

  e.sender.send('scene-add-directory', returnValue)
  e.returnValue = returnValue

}