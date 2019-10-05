import scriptDirectory from './scriptDirectory'


export default async function (e) {

  let returnValue

  returnValue = await scriptDirectory.call(this)

  e.sender.send('script-get-directory', returnValue)
  e.returnValue = returnValue

}