import append from './append'
import createUUID from '@static/js/createUUID'


export default async function (e, text, uuid = createUUID()) {

  await append.call(this, text, uuid)

  e.sender.send('language-append', uuid)
  e.returnValue = uuid

}