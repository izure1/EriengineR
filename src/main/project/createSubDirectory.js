import subDirectory from './subDirectory'


export default async function (e, dist) {

  let returnValue

  returnValue = await subDirectory(dist)

  e.sender.send('project-create-subdirectory', returnValue)
  e.returnValue = returnValue

}