import get from './get'


export default async function (e, msg) {

  let languages

  languages = await get.call(this)

  e.sender.send('language-get', languages)
  e.returnValue = languages

}