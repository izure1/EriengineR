import add from './add'


export default async function (e, language) {

  await add.call(this, language)

  e.sender.send('language-add')
  e.returnValue = null

}