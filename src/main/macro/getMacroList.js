import macroList from './macroList'


export default async function getMacroList(e) {

  let returnValue

  returnValue = await macroList.call(this)

  e.sender.send('macro-get-list', returnValue)
  e.returnValue = returnValue

}