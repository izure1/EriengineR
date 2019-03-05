import validScript from './validScript'


export default async function (e) {

  let returnValue

  returnValue = await validScript.call(this)

  e.sender.send('script-check-valid', returnValue)
  e.returnValue = returnValue

}