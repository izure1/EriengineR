import find from './find'

export default async function (e, uid) {

  let text

  text = await find.call(this, uid)

  e.sender.send('language-find', text)
  e.returnValue = text

}