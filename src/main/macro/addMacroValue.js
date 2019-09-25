import add from './add'


export default async function (e, id, type, content, locale) {

  let returnValue

  returnValue = await add.call(this, id, type, content, locale)

  e.sender.send('macro-add-value', returnValue)
  e.returnValue = returnValue

}