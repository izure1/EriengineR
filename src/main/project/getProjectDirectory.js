import projectDirectory from './projectDirectory'


export default async function (e) {

  let returnValue

  returnValue = await projectDirectory.call(this)
  
  e.sender.send('project-get-directory', e)
  e.returnValue = returnValue

}