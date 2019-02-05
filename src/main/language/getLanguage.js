import get from './get'


export default function (e, msg) {

  let languages

  languages = get.call(this)

  e.sender.send('language-get', languages)
  e.returnValue = languages

}