import macroInformation from './macroInformation'


export default async function (e, id) {

  let returnValue

  returnValue = await macroInformation.call(this, id)

  e.sender.send('macro-get-information', returnValue)
  e.returnValue = returnValue

}