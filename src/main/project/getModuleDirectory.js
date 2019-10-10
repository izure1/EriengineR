import modsDirectory from './modsDirectory'


export default async function (e) {

  let returnValue

  returnValue = await modsDirectory.call(this, 'Module')

  e.sender.send('project-get-directory-module', returnValue)
  e.returnValue = returnValue

}