import get from './get'


export default async function (e, id) {

  let returnValue

  returnValue = await get.call(this, id)

  e.sender.send('macro-get-value', returnValue)
  e.returnValue = returnValue

}