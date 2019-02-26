import append from './append'
import createUUID from '@static/js/createUUID'


export default async function (e, language, text, uuid = createUUID()) {

  await append.call(this, language, text, uuid)

  e.sender.send('language-append', uuid)
  e.returnValue = uuid

}