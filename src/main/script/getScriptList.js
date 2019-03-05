import scriptList from './scriptList'


export default async function (e, deep, directory) {

  let returnValue

  returnValue = await scriptList.call(this, deep, directory)

  e.sender.send('script-get-list', returnValue)
  e.returnValue = returnValue

}