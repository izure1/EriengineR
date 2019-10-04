import getDefault from './getDefault'


export default async function (e) {

  let returnValue

  returnValue = await getDefault.call(this)

  e.sender.send('locale-get-default', returnValue)
  e.returnValue = returnValue

}