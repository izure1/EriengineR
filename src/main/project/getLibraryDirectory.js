import modsDirectory from './modsDirectory'


export default async function (e) {

  let returnValue

  returnValue = await modsDirectory.call(this, 'Lib')

  e.sender.send('project-get-directory-library', returnValue)
  e.returnValue = returnValue

}