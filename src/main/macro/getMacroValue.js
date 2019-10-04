import macroText from './macroText'


export default async function (e, id) {

  let returnValue

  returnValue = await macroText.call(this, id)

  e.sender.send('macro-get-value', returnValue)
  e.returnValue = returnValue

}