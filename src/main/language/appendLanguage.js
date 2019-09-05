import append from './append'
import createUID from '@common/js/createUID'


export default async function (e, language, text, uid = createUID()) {

  await append.call(this, language, text, uid)

  e.sender.send('language-append', uid)
  e.returnValue = uid

}