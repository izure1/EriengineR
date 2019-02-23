import modify from './modify'


export default async function (e, origin, after) {

  let returnValue

  returnValue = await modify.call(this, origin, after)

  e.sender.send('language-modify', returnValue)
  e.returnValue = returnValue

}