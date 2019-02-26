import find from './find'

export default async function (e, uuid) {

  let text

  text = await find.call(this, uuid)

  e.sender.send('language-find', text)
  e.returnValue = text

}