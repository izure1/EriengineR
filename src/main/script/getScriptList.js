import scriptList from './scriptList'


export default async function (e, directory, deep) {

  let returnValue

  returnValue = await scriptList.call(this, directory, deep)

  e.sender.send('script-get-list', returnValue)
  e.returnValue = returnValue

}