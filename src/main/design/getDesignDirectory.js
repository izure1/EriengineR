import designDirectory from './designDirectory'


export default async function (e) {

  let returnValue

  returnValue = await designDirectory.call(this)

  e.sender.send('design-get-directory', returnValue)
  e.returnValue = returnValue

}