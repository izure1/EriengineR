import find from './find'


export default async function (e, id) {

  let returnValue

  returnValue = await find.call(this, id)

  e.sender.send('design-get-path', returnValue)
  e.returnValue = returnValue

}