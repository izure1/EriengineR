import setSubDirectory from './setSubDirectory'


export default async function (e, dist) {

  let returnValue

  returnValue = await setSubDirectory(dist)

  e.sender.send('project-create-subdirectory', returnValue)
  e.returnValue = returnValue

}