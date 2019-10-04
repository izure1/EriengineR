import add from './add'


export default async function (e, i) {

  let returnValue
  let {
    id,
    type,
    content,
    locale
  } = i

  returnValue = await add.call(this, id, type, content, locale)

  e.sender.send('macro-add-value', returnValue)
  e.returnValue = returnValue

}