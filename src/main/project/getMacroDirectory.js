import modsDirectory from './modsDirectory'


export default async function (e) {

  let returnValue

  returnValue = await modsDirectory.call(this, 'Macro')

  e.sender.send('project-get-directory-macro', returnValue)
  e.returnValue = returnValue

}