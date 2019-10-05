import scriptPath from './scriptPath'


export default async function (e, id) {

  let returnValue

  returnValue = await scriptPath.call(this, id)

  e.sender.send('script-get-path', returnValue)
  e.returnValue = returnValue

}